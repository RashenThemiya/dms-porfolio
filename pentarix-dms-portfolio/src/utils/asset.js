// Prefix a public-folder path with Vite's base URL so assets resolve when the
// site is served from a subpath (e.g. GitHub Pages: /<repo>/).
const base = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

export const asset = (path) => `${base}${path}`;
