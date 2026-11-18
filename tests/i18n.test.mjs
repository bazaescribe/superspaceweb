import test from "node:test";
import assert from "node:assert/strict";
import { detectLocale } from "../src/i18n/detect.ts";
import { translate } from "../src/i18n/translate.ts";
import { createPageMetadata } from "../src/lib/seo.ts";

test("manual language wins over browser and country", () => {
  assert.equal(detectLocale("en", "es-MX,es;q=0.9", "MX"), "en");
  assert.equal(detectLocale("es", "en-US", "US"), "es");
});
test("browser preference honors quality, regional tags and disabled languages", () => {
  assert.equal(detectLocale(undefined, "en-US;q=0.7,es-MX;q=0.9", "US"), "es");
  assert.equal(detectLocale(undefined, "en-US,en;q=0.9", "MX"), "en");
  assert.equal(detectLocale(undefined, "es;q=0,en;q=0.8", "MX"), "en");
});
test("approximate country is a fallback for unsupported or missing languages", () => {
  assert.equal(detectLocale(undefined, "fr-FR", "MX"), "es");
  assert.equal(detectLocale("invalid", undefined, "ES"), "es");
  assert.equal(detectLocale(undefined, "es;q=invalid", "US"), "en");
  assert.equal(detectLocale(undefined, undefined, "BR"), "en");
  assert.equal(detectLocale(), "en");
});
test("translations preserve inline spacing, unknown names, and non-text nodes", () => {
  assert.equal(translate(" Platform ", "es"), " Plataforma ");
  assert.equal(translate("Platform", "en"), "Platform");
  assert.equal(translate("María López", "es"), "María López");
  const node = { type: "h1" };
  assert.equal(translate(node, "es"), node);
});
test("Spanish SEO has a localized title, canonical, social locale and language alternates", () => {
  const metadata = createPageMetadata(
    { title: "About us", description: "Building software around the way businesses work.", path: "/company" },
    "es",
  );
  assert.equal(metadata.title, "Nosotros");
  assert.equal(metadata.alternates.canonical, "/es/company");
  assert.equal(metadata.openGraph.locale, "es_MX");
  assert.equal(metadata.openGraph.url, "/es/company");
  assert.equal(metadata.alternates.languages.en, "/en/company");
  assert.equal(metadata.alternates.languages.es, "/es/company");
});
