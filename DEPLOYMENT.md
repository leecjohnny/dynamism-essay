# Build and deployment

This archive contains the complete source, article imagery, three narration
tracks, and word-level synchronization data for the Dynamism essay site. It is
configured for Bun, Vite, and Cloudflare Workers.

## Requirements

- Bun 1.3 or newer
- A Cloudflare account for deployment

## Install and run locally

```bash
bun install --frozen-lockfile
bun run dev
```

The development server prints its local URL after startup.

## Validate and build

```bash
bun run lint
bun test
```

`bun test` creates a production build and checks the rendered essay shell. To
build without running the rendered-page test, use:

```bash
bun run build
```

The production output is written to `dist/`. The Cloudflare Vite plugin also
creates the generated Wrangler deployment configuration.

## Deploy to Cloudflare Workers

Authenticate once, then build and deploy:

```bash
bunx wrangler login
bun run deploy
```

Change the Worker name in `wrangler.jsonc` before deploying if needed. The
deploy script builds with Vite through Vinext, then publishes the generated
Worker and bundled public assets with Wrangler.

## Narration assets

The self-hosted audio and timing files are in `public/audio/dynamism/`. The
player does not rely on an external audio service at runtime.
