# Dynamism as a supercomputing race

A single-essay website built with React, Vite, Bun, and Cloudflare Workers
through Vinext and the Cloudflare Vite plugin.

[Read the live essay](https://dynamism-supercomputing-race.lee-c-johnny.workers.dev)

The essay is rendered from structured content in `app/essay-content.json`.
Original document images live in `public/assets/essay/`, with provenance,
captions, dimensions, source links, and accessibility text recorded in
`public/assets/essay/manifest.json`.

## Local development

```bash
bun install
bun run dev
```

## Production build

```bash
bun run build
```

## Deploy to Cloudflare Workers

Authenticate Wrangler once, then deploy the Vite production build:

```bash
bunx wrangler login
bun run deploy
```
