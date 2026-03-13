<h1><img src="https://dicebear.com/logo-readme.svg" width="28" /> DiceBear API (Netlify Edition)</h1>

This is a **serverless fork** of the [DiceBear API](https://dicebear.com/how-to-use/http-api), specifically modified to run on [Netlify Functions](https://www.netlify.com/products/functions/).

While the original is built on Fastify, this version leverages Netlify's infrastructure to provide a cost-effective, "scale-to-zero" avatar solution.

⭐ **If you find this serverless port helpful, please give this repository a star!**

---

## 🚀 Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kaungkhantjc/dicebear-netlify)

## ⚡ Global High-Performance Caching

This fork is pre-configured with professional-grade caching headers to minimize latency and function execution costs:

* **Netlify Durable Cache:** Avatars are cached globally across all Netlify edge nodes. Once an avatar is generated, it is served from the edge nearest to the user, completely bypassing function execution.
* **Stale-While-Revalidate (SWR):** If the cache expires, the edge serves the "stale" version instantly while regenerating the new one in the background. Users never wait for a cold start.
* **Browser Immutability:** Uses `immutable` headers to ensure browsers cache the avatars locally for up to a year, making repeat page loads near-instant.

## ⚙️ Environment Variables

To ensure the API runs correctly in a serverless environment, you **must** set these variables. Specifically, the `*_EXIF` variables must be disabled because the underlying EXIF tools require `Perl` and `procps`, which are not fully available in the standard Lambda runtime.

Set these in your **Netlify Site Settings > Build & deploy > Environment**:

| Variable | Value | Description |
| :--- | :--- | :--- |
| `NODE_VERSION` | `24` | Sets the Node.js runtime version. |
| `PNG_EXIF` | `0` | Disables EXIF metadata for PNGs (Requires Perl/procps). |
| `JPEG_EXIF` | `0` | Disables EXIF metadata for JPEGs (Requires Perl/procps). |
| `WEBP_EXIF` | `0` | Disables EXIF metadata for WebP (Requires Perl/procps). |
| `AVIF_EXIF` | `0` | Disables EXIF metadata for AVIF (Requires Perl/procps). |

## 📖 How to Use

Once deployed, your avatars will be accessible via your Netlify URL. Thanks to the included redirect rules, the syntax remains familiar:

`https://your-site.netlify.app/9.x/thumbs/svg?seed=Kane`

For more advanced options, refer to the [Original Documentation](https://dicebear.com/guides/host-the-http-api-yourself/) or try the [Playground](https://dicebear.com/playground/).

---

## 🛠 Changes in this Fork

This repository has been refactored through several atomic stages to ensure serverless stability:

1. **Dependency Optimization:** Added `@fastify/aws-lambda`, `sharp`, and `@resvg/resvg-js` to ensure native image processing binaries are correctly packaged.
2. **Environment-Aware Paths:** Refactored path resolution to use `LAMBDA_TASK_ROOT`, ensuring fonts and assets are found reliably within the AWS Lambda environment.
3. **Static Version Mapping:** Switched from dynamic imports to static mappings for avatar styles, allowing bundlers like `esbuild` to trace and include all necessary modules.
4. **Hybrid ESM/CJS Architecture:** Implemented a custom `esbuild` bundling script with a `.cjs` wrapper to bridge modern ESM code with Netlify's function execution environment.
5. **Optimized Configuration:** Added a `netlify.toml` pre-configured with the `nft` bundler and universal redirects.
6. **Advanced Caching Hook:** Integrated a Fastify `onSend` hook to inject `Netlify-CDN-Cache-Control` and `CDN-Cache-Control` headers globally.

## Credits & Sponsors

This project is a fork of the official [DiceBear API](https://github.com/dicebear/api). All credit for the incredible avatar styles and original architecture goes to the DiceBear team.

<a href="https://bunny.net/" target="_blank" rel="noopener noreferrer">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://www.dicebear.com/sponsors/bunny-light.svg">
        <source media="(prefers-color-scheme: light)" srcset="https://www.dicebear.com/sponsors/bunny-dark.svg">
        <img alt="bunny.net" src="https://www.dicebear.com/sponsors/bunny-dark.svg" height="64">
    </picture>
</a>
