// The hotel film, scrubbed by scroll. The frame for a film time is drawn on a canvas sized to the screen's own pixels
// (devicePixelRatio), cropped like object-fit: cover around a focus point. Nothing plays by itself.
//
// Built to stay at 60 fps on a phone:
// - Frames are small AVIF files (few per second). Between two frames the picture is a blend of both, weighted by the
//   exact film time, so scrubbing glides instead of stepping.
// - Frames are fetched as compressed blobs and decoded in a Web Worker (createImageBitmap, transferred back) only in a
//   ring of 6 each side of the reader, and decoded bitmaps further away are closed. The compressed blobs are kept (the
//   whole set is a few MB), so scrolling back never downloads a frame twice. The film's first 40 frames are fetched
//   before the reader reaches it, then chunks of 20 in the scroll direction, then those within 60 frames, then the rest.
// - The picture follows the scroll closely: it eases, but never trails it by more than one frame.
// Landscape frames for wide screens, portrait frames for tall ones; a screen only ever loads its own set. Loading starts
// once the visitor has scrolled and the section is within a screen. If the first frame cannot load or the canvas is
// unavailable, the MP4 takes over, its currentTime bound to the scroll.
export interface FilmSet {
  /** folder under base: desktop or mobile */
  dir: string;
  frames: number;
  fps: number;
  size: number[];
  /** where the cover crop sits across the frame: 0 left, 0.5 centre, 1 right */
  focus: number;
  /** file extension of the frames */
  ext: string;
}

export interface Film {
  base: string;
  duration: number;
  desk: FilmSet;
  phone: FilmSet;
}

/** Tall screens (narrower than 9:10) get the portrait set */
export const portraitQuery = '(max-aspect-ratio: 9/10)';

/** The cover crop of a frame of size fw x fh shown in a box of w x h, around focus: [sx, sy, sw, sh, scale] */
export function cover(w: number, h: number, fw: number, fh: number, focus: number) {
  const scale = Math.max(w / fw, h / fh);
  const sw = w / scale;
  const sh = h / scale;
  return { sx: (fw - sw) * focus, sy: (fh - sh) / 2, sw, sh, scale };
}

const FIRST = 40; // fetched before the reader reaches the film, from its start
const AHEAD = 20; // then fetched in chunks in the scroll direction
const NEAR = 60; // then those within this many frames of the reader, then the rest
// Decoded bitmaps kept each side of the reader: half a second of film at 12 frames a second. More would hold hundreds of
// megabytes of images (a 1600 x 900 frame is 5.8 MB decoded) and risk the browser dropping the page on phones.
const RING = 6;

export function createFilm(root: HTMLElement, canvas: HTMLCanvasElement, video: HTMLVideoElement, film: Film, instant = false) {
  const set = matchMedia(portraitQuery).matches ? film.phone : film.desk;
  const [fw, fh] = set.size;
  const n = set.frames;
  // Frames are numbered from 1: desktop/frame-0001.avif (scripts/video/frames.sh writes them)
  const url = (i: number) => `${film.base}/${set.dir}/frame-${String(i + 1).padStart(4, '0')}.${set.ext}`;
  const blobs = new Map<number, Blob>();
  const bitmaps = new Map<number, ImageBitmap>();
  const decoding = new Set<number>();
  const fetching = new Set<number>();
  // Decoding in a worker; if workers are unavailable, createImageBitmap on this thread (still decoded off it)
  let worker: Worker | null = null;
  try {
    worker = new Worker(new URL('./film-decoder.ts', import.meta.url), { type: 'module' });
  } catch {
    worker = null;
  }
  const ctx = canvas.getContext('2d', { alpha: true }); // transparent until the first frame, so the poster shows through
  let target = 0;
  let shown = 0;
  let dir = 1;
  let raf = 0;
  let useVideo = !ctx;
  let drawnKey = '';
  let started = false;

  const fit = () => {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const w = Math.max(1, Math.round(box.width * dpr));
    const h = Math.max(1, Math.round(box.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawnKey = '';
      draw();
    }
  };

  // The decoded frame nearest to i, or -1
  const nearest = (i: number) => {
    for (let d = 0; d < n; d++) {
      if (bitmaps.has(i - d)) return i - d;
      if (bitmaps.has(i + d)) return i + d;
    }
    return -1;
  };
  const draw = () => {
    if (!ctx || useVideo) return;
    const a = Math.floor(shown);
    const b = Math.min(n - 1, a + 1);
    const f = shown - a;
    const A = bitmaps.get(a);
    const B = bitmaps.get(b);
    let key: string;
    const { sx, sy, sw, sh } = cover(canvas.width, canvas.height, fw, fh, set.focus);
    if (A && B && f > 0.02 && b !== a) {
      key = `${a}:${b}:${f.toFixed(2)}`;
      if (key === drawnKey) return;
      ctx.globalAlpha = 1;
      ctx.drawImage(A, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = f;
      ctx.drawImage(B, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    } else {
      const at = A ? a : nearest(Math.round(shown));
      if (at < 0) return;
      key = String(at);
      if (key === drawnKey) return;
      ctx.drawImage(bitmaps.get(at)!, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    }
    drawnKey = key;
    canvas.dataset.frame = String(Math.round(shown)); // read by the browser tests
  };

  // Keep the ring around the reader decoded, close everything outside it
  const decoded = (i: number, bm: ImageBitmap | null) => {
    decoding.delete(i);
    if (!bm) return;
    if (Math.abs(i - shown) > RING + 2) return bm.close();
    bitmaps.set(i, bm);
    draw();
  };
  if (worker) {
    worker.onmessage = (e: MessageEvent<{ i: number; bm: ImageBitmap | null }>) => decoded(e.data.i, e.data.bm);
    worker.onerror = () => {
      worker = null; // fall back to this thread; frames in flight are retried by the ring
      decoding.clear();
    };
  }
  const decode = (i: number) => {
    const blob = blobs.get(i);
    if (!blob || bitmaps.has(i) || decoding.has(i)) return;
    decoding.add(i);
    if (worker) worker.postMessage({ i, blob });
    else
      createImageBitmap(blob)
        .then((bm) => decoded(i, bm))
        .catch(() => decoded(i, null));
  };
  const keepRing = () => {
    const c = Math.round(shown);
    for (let d = 0; d <= RING; d++) {
      decode(c + d * dir);
      decode(c - d * dir);
    }
    for (const [i, bm] of bitmaps) {
      if (Math.abs(i - c) > RING + 2) {
        bm.close();
        bitmaps.delete(i);
      }
    }
  };

  const tick = () => {
    // Ease halfway each frame, but never more than one frame behind the scroll
    shown += (target - shown) * 0.5;
    if (instant || Math.abs(target - shown) < 0.01) shown = target;
    shown = Math.max(target - 1, Math.min(target + 1, shown));
    if (useVideo) {
      if (video.duration) video.currentTime = Math.min(video.duration, shown / set.fps);
    } else {
      keepRing();
      draw();
    }
    raf = shown === target ? 0 : requestAnimationFrame(tick);
  };

  // Fetching: the film's first frames before the reader gets there, then the frames ahead in the scroll direction in
  // chunks, then those within NEAR of the reader, then the rest, coarse to fine
  const wanted = (): number | undefined => {
    for (let i = 0; i < Math.min(FIRST, n); i++) if (!blobs.has(i) && !fetching.has(i)) return i;
    const c = Math.round(target);
    for (let d = 0; d <= AHEAD; d++) {
      const i = c + d * dir;
      if (i >= 0 && i < n && !blobs.has(i) && !fetching.has(i)) return i;
    }
    for (const limit of [NEAR, n]) {
      for (const step of [8, 4, 2, 1]) {
        for (let d = 0; d <= limit; d += step) {
          for (const i of [c - d * dir, c + d * dir]) if (i >= 0 && i < n && !blobs.has(i) && !fetching.has(i)) return i;
        }
      }
    }
    return undefined;
  };
  let failed = 0;
  const load = async (i: number) => {
    fetching.add(i);
    try {
      const res = await fetch(url(i));
      if (!res.ok) throw new Error(String(res.status));
      blobs.set(i, await res.blob());
      if (Math.abs(i - target) <= RING + 1) decode(i);
    } catch {
      failed++;
    } finally {
      fetching.delete(i);
    }
  };
  let workers = 0;
  const pump = () => {
    while (workers < 4) {
      const i = wanted();
      if (i === undefined) return;
      workers++;
      load(i).then(() => {
        workers--;
        if (!blobs.size && failed >= 3) return toVideo(); // the frames cannot load: the film takes over
        if (!useVideo && failed < 20) pump();
      });
    }
  };
  const toVideo = () => {
    useVideo = true;
    canvas.hidden = true;
    video.hidden = false;
    video.src = `${film.base}/${set.dir}.mp4`; // H.264 plays everywhere
    video.preload = 'auto';
  };

  let near = false;
  let scrolled = scrollY > 0;
  const start = () => {
    if (started || !near || !scrolled) return;
    started = true;
    if (useVideo) toVideo();
    else pump();
  };
  addEventListener(
    'scroll',
    () => {
      scrolled = true;
      start();
    },
    { once: true, passive: true },
  );
  new IntersectionObserver(
    (entries, io) => {
      near = entries.some((e) => e.isIntersecting);
      if (near) io.disconnect();
      start();
    },
    { rootMargin: '100% 0px' },
  ).observe(root);
  new ResizeObserver(fit).observe(canvas);
  fit();

  return {
    set,
    /** t: film time in seconds */
    seek(t: number) {
      const next = Math.max(0, Math.min(n - 1, t * set.fps));
      if (next !== target) dir = next > target ? 1 : -1;
      target = next;
      if (started && !useVideo) pump();
      if (!raf) raf = requestAnimationFrame(tick);
    },
    /** for tests: how many frames are held, and which one is drawn */
    loaded: () => blobs.size,
    state: () => ({ target, shown, drawn: drawnKey, useVideo, decoded: bitmaps.size }),
  };
}
