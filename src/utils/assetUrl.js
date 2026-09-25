/**
 * Utility to resolve asset paths relative to the current application base URL,
 * ensuring images and icons load correctly on GitHub Pages, custom domains, and local dev.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.replace(/^(\.\/|\/)/, '');
  return `./${clean}`;
}
