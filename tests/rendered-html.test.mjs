import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

test("server-renders the finished Questly landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<main id="top">/);
  assert.match(html, /Stop guessing what happened/);
  assert.match(html, /Every interaction, evidence-linked/);
  assert.match(html, /data-parallax-hero/);
  assert.match(html, /data-parallax-layer="background"/);
  assert.match(html, /data-parallax-layer="copy"/);
  assert.match(html, /data-parallax-layer="product"/);
  assert.match(html, /data-parallax-layer="grass"/);
  assert.match(html, /src="\/questly-product\.svg"/);
  assert.match(html, /One standard\. Every channel\./);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("keeps the parallax component scoped and motion-safe", async () => {
  const [component, css, packageJson] = await Promise.all([
    readFile(
      new URL("../components/ui/parallax-scrolling.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(component, /from "gsap"/);
  assert.match(component, /from "gsap\/ScrollTrigger"/);
  assert.match(component, /from "@studio-freight\/lenis"/);
  assert.match(component, /gsap\.context/);
  assert.match(component, /gsap\.ticker\.remove/);
  assert.match(component, /lenis\.destroy/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(component, /ScrollTrigger\.getAll/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

  const dependencies = JSON.parse(packageJson).dependencies;
  assert.ok(dependencies.gsap);
  assert.ok(dependencies["@studio-freight/lenis"]);
});
