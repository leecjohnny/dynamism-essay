import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete essay shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Dynamism as a supercomputing race · Dynamism<\/title>/i,
  );
  assert.match(html, /July 2026/);
  assert.match(html, />Essay</);
  assert.match(html, /data-narration-word="w741"/);
  assert.match(html, /closing-accent"[^>]*>human</);
  assert.match(
    html,
    /class="reading-progress"[^>]*><div class="reading-progress-fill"/,
  );
  assert.match(html, /aria-label="Listen to the essay"/);
  assert.match(html, /data-narration-word="w0"/);
  assert.equal(html.match(/data-narration-word="w\d+"/g)?.length, 742);
  assert.match(html, /<audio preload="metadata"><\/audio>/);
  assert.match(
    html,
    /https:\/\/www\.nytimes\.com\/2026\/04\/27\/technology\/ai-artificial-intelligence-backlash\.html/,
  );
  assert.match(html, /\/assets\/essay\/figure-08\.png/);
  assert.doesNotMatch(
    html,
    /Draft essay|Motion|Fig\. 0|View source|\/assets\/essay\/manifest\.json/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
