import esbuild from 'esbuild';

async function build() {
    await esbuild.build({
        entryPoints: ['src/lambda.ts'],
        bundle: true,
        platform: 'node',
        target: 'node20',
        format: 'esm',
        outfile: 'netlify-dist/bundle.mjs',
        banner: {
            // Shims CommonJS require for compatibility
            js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);",
        },
        external: [
            '@resvg/resvg-js',
            'sharp',
            'node:*',
            'crypto',
            'fs',
            'path',
            'url',
            'module',
            'stream',
            'events',
            'buffer',
            'util'
        ],
    });
    console.log('Successfully bundled Netlify function natively as ESM.');
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});