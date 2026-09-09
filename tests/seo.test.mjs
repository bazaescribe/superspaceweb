import test from "node:test";
import assert from "node:assert/strict";
import { createPageMetadata, siteUrl } from "../src/lib/seo.ts";

test("page metadata keeps canonical and social fields aligned", () => {
  const metadata = createPageMetadata({
    title: "Platform",
    description: "A useful description.",
    path: "/platform",
  });

  assert.equal(metadata.title, "Platform");
  assert.equal(metadata.description, "A useful description.");
  assert.equal(metadata.alternates.canonical, "/platform");
  assert.equal(metadata.openGraph.url, "/platform");
  assert.equal(metadata.openGraph.title, "Platform — Superspace");
  assert.equal(metadata.twitter.card, "summary_large_image");
});

test("site URL always resolves to an absolute origin", () => {
  assert.ok(siteUrl instanceof URL);
  assert.ok(["http:", "https:"].includes(siteUrl.protocol));
});

test("homepage can opt into an absolute branded title", () => {
  const metadata = createPageMetadata({
    title: "Superspace — Operational software",
    description: "A useful description.",
    path: "/",
    absoluteTitle: true,
  });

  assert.deepEqual(metadata.title, { absolute: "Superspace — Operational software" });
  assert.equal(metadata.openGraph.title, "Superspace — Operational software");
});
