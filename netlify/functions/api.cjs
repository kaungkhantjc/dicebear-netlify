// Netlify V1 functions are natively treated as ESM if package.json has "type": "module".
// To use CommonJS (required for exports.handler in some Netlify contexts or wrappers),
// we use the .cjs extension.
// We use a dynamic import to load our pure ESM bundle, which preserves import.meta.url.
exports.handler = async (event, context) => {
    // Path is relative to the function file in the deployed Lambda environment
    const esmModule = await import('../../netlify-dist/bundle.mjs');
    return esmModule.handler(event, context);
};