import test from "node:test";
import assert from "node:assert/strict";
import { navigationState } from "../src/lib/navigation.ts";

test("primary groups recognize exact and nested routes", () => {
  for (const group of ["platform", "solutions", "company"]) {
    assert.equal(navigationState(`/${group}`, `/${group}`), "page");
    assert.equal(navigationState(`/${group}/`, `/${group}`), "page");
    assert.equal(navigationState(`/${group}/detail`, `/${group}`), "location");
    assert.equal(navigationState(`/${group}-other`, `/${group}`), undefined);
  }
});
test("contact belongs to Company while home and legal stay neutral", () => {
  assert.equal(navigationState("/contact", "/company"), "location");
  for (const path of ["/", "/privacy", "/terms", "/solutions"]) {
    assert.equal(navigationState(path, "/company"), undefined);
  }
  assert.equal(navigationState("/contact", "/platform"), undefined);
});
