const assetUrls = import.meta.glob('/src/assets/{images,videos}/**/*', {
  eager: true,
  import: 'default',
  query: '?url',
});

export function getAssetUrl(path) {
  return assetUrls[path] ?? path;
}
