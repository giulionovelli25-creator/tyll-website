// Decodes the hotel film's frames off the main thread (src/scripts/film.ts sends each compressed frame as a Blob and
// gets an ImageBitmap back, transferred, not copied).
self.onmessage = async (e: MessageEvent<{ i: number; blob: Blob }>) => {
  const { i, blob } = e.data;
  try {
    const bm = await createImageBitmap(blob);
    (self as unknown as Worker).postMessage({ i, bm }, [bm]);
  } catch {
    (self as unknown as Worker).postMessage({ i, bm: null });
  }
};
