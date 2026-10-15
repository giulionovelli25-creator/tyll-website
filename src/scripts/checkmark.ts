// The Tyll checkmark drawing itself, like a pen: the short stroke runs down into the corner,
// then the long stroke flicks up and out. Each stroke is a copy of itself clipped to its own shape and
// slid along its axis, so the real logo geometry is used throughout.
// Without JavaScript, or with reduced motion, the mark simply shows in full.

const unit = (x: number, y: number) => {
  const l = Math.hypot(x, y);
  return [x / l, y / l] as const;
};
const SHORT_AXIS = unit(9, 34); // down into the corner
const LONG_AXIS = unit(24, -56); // up and to the right
const SHORT_LEN = 40;
const LONG_LEN = 60;

const clamp = (t: number) => Math.min(1, Math.max(0, t));
const easeIn = (t: number) => t * t * (1.6 - 0.6 * t); // gathers speed into the corner
const easeOut = (t: number) => 1 - (1 - t) ** 3; // settles at the end of the flick

type Strokes = { short: SVGElement; long: SVGElement };

const strokesOf = (svg: SVGSVGElement): Strokes | null => {
  const short = svg.querySelector<SVGElement>('.ck-s');
  const long = svg.querySelector<SVGElement>('.ck-l');
  return short && long ? { short, long } : null;
};

// s and l are how far each stroke is drawn, from 0 to 1.
const pose = ({ short, long }: Strokes, s: number, l: number) => {
  const so = (1 - s) * SHORT_LEN;
  const lo = (1 - l) * LONG_LEN;
  short.setAttribute('transform', `translate(${-SHORT_AXIS[0] * so} ${-SHORT_AXIS[1] * so})`);
  long.setAttribute('transform', `translate(${-LONG_AXIS[0] * lo} ${-LONG_AXIS[1] * lo})`);
};

// Progress p from 0 to 1 across the whole gesture.
const drawAt = (strokes: Strokes, p: number) =>
  pose(strokes, easeIn(clamp(p / 0.42)), easeOut(clamp((p - 0.36) / 0.64)));

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Draw a mark once. Resolves when the stroke has settled. */
export function drawCheck(svg: SVGSVGElement, duration = 950): Promise<void> {
  const strokes = strokesOf(svg);
  if (!strokes || reduced()) {
    if (strokes) pose(strokes, 1, 1);
    svg.dataset.drawn = 'true';
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const t0 = performance.now();
    const frame = (now: number) => {
      const p = clamp((now - t0) / duration);
      drawAt(strokes, p);
      if (p < 1) requestAnimationFrame(frame);
      else {
        svg.dataset.drawn = 'true';
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}

export function hideCheck(svg: SVGSVGElement) {
  const strokes = strokesOf(svg);
  if (strokes && !reduced()) pose(strokes, 0, 0);
}

// Footer loop, after the live site's logo animation: draw (1.1 s), hold, retract long stroke first (3.6 s loop).
function loop(svg: SVGSVGElement) {
  const strokes = strokesOf(svg);
  if (!strokes || reduced()) return;
  const LOOP = 3.6;
  const OUT = 2.6;
  const tick = (t: number) => {
    if (t < OUT) return drawAt(strokes, clamp(t / 1.1));
    const r = t - OUT;
    pose(strokes, 1 - easeIn(clamp((r - 0.25) / 0.5)), 1 - easeIn(clamp(r / 0.5)));
  };
  let raf = 0;
  let t0 = 0;
  const frame = (now: number) => {
    tick(((now - t0) / 1000) % LOOP);
    raf = requestAnimationFrame(frame);
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) {
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!e.isIntersecting && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      pose(strokes, 1, 1);
    }
  }).observe(svg);
}

let started = false;

/** Wire up every [data-check] mark on the page. Marks inside [data-check-group] are drawn by their group. */
export function initCheckmarks() {
  if (started) return;
  started = true;

  document.querySelectorAll<SVGSVGElement>('svg[data-check="loop"]').forEach(loop);

  const singles = [...document.querySelectorAll<SVGSVGElement>('svg[data-check="draw"]')].filter(
    (svg) => !svg.closest('[data-check-group], [data-check-manual]'),
  );
  singles.forEach(hideCheck);
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        drawCheck(e.target as SVGSVGElement);
      }),
    { threshold: 0.6 },
  );
  singles.forEach((svg) => io.observe(svg));

  // Groups draw their marks one after another once the group is in view. A mark inside [data-check-step]
  // marks that step "is-in" when it settles, which is when CSS reveals the step's text.
  // Text is only hidden once the group is armed, so without JavaScript or with reduced motion it simply shows.
  if (reduced()) return;
  const groups = [...document.querySelectorAll<HTMLElement>('[data-check-group]')];
  const gio = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        gio.unobserve(e.target);
        const group = e.target as HTMLElement;
        const gap = Number(group.dataset.checkGap ?? 220);
        const duration = Number(group.dataset.checkDuration ?? 700);
        group.querySelectorAll<SVGSVGElement>('svg[data-check="draw"]').forEach((svg, i) => {
          setTimeout(() => {
            drawCheck(svg, duration).then(() => svg.closest('[data-check-step]')?.classList.add('is-in'));
          }, i * gap);
        });
      }),
    { threshold: 0.35 },
  );
  groups.forEach((group) => {
    group.dataset.armed = 'true';
    group.querySelectorAll<SVGSVGElement>('svg[data-check="draw"]').forEach(hideCheck);
    gio.observe(group);
  });
}
