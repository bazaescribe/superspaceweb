import test from "node:test";
import assert from "node:assert/strict";
import { analyticsEventName, track } from "../src/lib/analytics.ts";

test("analytics is a no-op during server rendering", () => {
  assert.doesNotThrow(() => track({ name: "page_view", path: "/platform" }));
});

test("analytics publishes normalized first-party browser events", () => {
  const events = [];
  const browser = new EventTarget();
  browser.addEventListener(analyticsEventName, (event) => events.push(event.detail));
  globalThis.window = browser;

  track({
    name: "cta_clicked",
    cta: "talk_to_us",
    destination: "/contact",
    placement: "home_hero",
  });

  assert.deepEqual(events, [
    {
      name: "cta_clicked",
      cta: "talk_to_us",
      destination: "/contact",
      placement: "home_hero",
    },
  ]);

  delete globalThis.window;
});
