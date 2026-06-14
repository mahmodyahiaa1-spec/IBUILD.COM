// Tiny inline SVG placeholder shown when an image fails to load.
export const IMG_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'>
      <rect width='16' height='9' fill='#141414'/>
      <text x='8' y='5.2' text-anchor='middle' font-family='serif' font-style='italic' font-size='1.2' fill='#666'>i Build</text>
    </svg>`
  );

export function onImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== IMG_FALLBACK) {
    img.src = IMG_FALLBACK;
    img.dataset.fallback = "true";
  }
}
