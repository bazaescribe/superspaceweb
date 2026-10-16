# Website closeout audit — 16 October 2026

Scope: current checkout, local production build on port 3100. This is not a verification of the deployed public site. No website code changed during this audit.

## Verified

- `npm run build -- --webpack` passes, including TypeScript and all 20 generated routes.
- All 14 user-facing routes return 200 at 393px and 1440px.
- No failed internal-link requests, missing rendered images, horizontal page overflow, or uncaught JavaScript errors during the standard-motion crawl.
- Navigation opens/closes at 320px on Home, Platform, Deployment, and FAQ.
- All seven Offering dialogs open at 320px; their workflow tabs switch, their close buttons work, and their dialogs have no horizontal overflow. Direct hash entry opens the matching dialog; Escape closes it. These hash URLs are intentional dialog state, not broken anchor links.
- FAQ is static question/answer content, not a broken accordion.

## Close before freezing the site

### 1. Complete the contact / booking path

Observed build: Let’s talk links resolve to `/contact`; that page offers LinkedIn rather than booking, an email address, or an inquiry form. Footer “Mail” also points to `/contact`. Links work technically, but the conversion journey does not deliver a direct contact or scheduling mechanism.

Sources: `src/lib/site.ts:1`, `src/app/contact/page.tsx:47`, footer groups in `src/lib/site.ts`.

Closure: choose one actual contact destination; configure `NEXT_PUBLIC_BOOKING_URL` if booking is the intended journey; align labels and fallback behavior. Verify the chosen destination without submitting an inquiry or booking an appointment.

### 2. Resolve unfinished public content

- `/privacy` and `/terms` explicitly say review is pending. Footer presents them as “Privacy Policy” and “Services Agreement”. Approved content needs the actual operating/business details; do not fabricate those details.
- `/engineering-blog` is just a hero and footer, with no posts or empty-state explanation.
- `/changelog` has an honest empty state but no updates. This can remain if intentional, or its navigation entry can wait until there is content.

Sources: `src/app/privacy/page.tsx:14`, `src/app/terms/page.tsx:14`, `src/app/engineering-blog/page.tsx:17`, `src/app/changelog/page.tsx`, `src/components/footer.tsx:44`.

Closure: supply the approved legal content; remove/hide the empty blog entry or give it an intentional empty state. No new content programme is required to finish the site.

### 3. Fix reduced-motion hydration

The production build emits React hydration error 418 on `/platform` and `/deployment` when `prefers-reduced-motion: reduce` is enabled. Those same routes pass with standard motion. Menus remain operable, but hydration recovery is a real runtime defect.

Likely causes to investigate: Platform uses a reduced-motion-dependent completed state during render (`src/components/platform-previews.tsx:314`); Deployment uses reduced-motion-dependent SVG composition (`src/components/deployment-assembly.tsx`). Initial server/client markup must agree before applying the client preference.

Closure: verify first-load production hydration with both motion preferences, including refresh and direct route entry.

### 4. Finish the shared gutter migration

At 430px:

| Route | Header left | Hero left | Footer copy left |
| --- | ---: | ---: | ---: |
| Home | 24px | 24px | 16px |
| Platform | 24px | 24px | 16px |
| FAQ | 24px | 16px | 16px |

The remaining `.shell` implementation hardcodes `padding: 0 1rem` below 767px (`src/app/globals.css:1293`). Migrate shared shells to the same gutter/container contract, checking full-width visuals and nested shells rather than blindly adding padding everywhere.

### 5. Make metadata assets and declared sizes agree

`npm test`: 23/24 pass. The failing metadata raster test finds:

| Asset | Actual | Declared/expected |
| --- | --- | --- |
| Social image | 1925 × 1049 | 1200 × 675 |
| Apple touch icon | 1358 × 1358 | 180 × 180 |
| PNG favicon | 512 × 512 | 512 × 512 |

The test stops at the first mismatch; the Apple dimensions were checked separately. Sources: `src/lib/seo.ts:7`, `src/app/layout.tsx`, `tests/marketing-design.test.mjs:73`.

Closure: generate proper delivery assets from the existing artwork, preserving source originals, and rerun the metadata test. Asset format/dimension work does not require redesigning the artwork.

### 6. Restore a clean lint run

`npm run lint`: three errors in `src/components/header.tsx` at lines 168, 203, and 207, all `react-hooks/set-state-in-effect`. Four unused-import warnings remain in `src/components/operations-system.tsx`.

Closure: refactor header lifecycle state without changing portal setup, route-change closing, or exit animation behavior; verify menu focus/scroll locking and CTA reveal. Remove unused imports.

## Decisions / optional follow-up

- The observed canonical URL is `https://superspaceweb.vercel.app/`. Confirm that this is the intended public origin; otherwise configure `NEXT_PUBLIC_SITE_URL` and verify sitemap, social URLs, and canonical tags on the deployment.
- Analytics currently dispatches browser CustomEvents; no collection provider is wired in `src/lib/analytics.ts`. Add collection if conversion reporting is needed before acquisition efforts. Do not mistake local event dispatch for stored analytics.
- Footer lists additional languages as static text. Make that clearly informational or remove unavailable choices if they are perceived as a language switcher.
- External destinations and real-device Safari performance were not verified here. Previous phone checks in this chat are separate evidence; do a final real-phone smoke check after the closeout changes.

## Suggested finish order

1. Fix hydration, metadata assets, lint, and shared gutters in one technical pass.
2. Resolve booking/contact and public placeholder-content decisions.
3. One production-build check plus real-phone smoke check, then freeze website work and switch to the platform demo.

## Follow-up implementation — 16 October 2026

- Default contact CTA and footer Mail now use `mailto:jl@superspaceos.com`; Contact exposes the email directly. `NEXT_PUBLIC_BOOKING_URL` remains an optional override.
- Privacy and website-only Terms drafts now use Rosas Baza Consulting SA de CV. Editable copies are in `docs/privacy-notice-draft.md` and `docs/website-terms-draft.md`. The supplied physical business address has now been added to the notice and editable draft: Indiana 57, Int. 201. Col. Nápoles. Benito Juárez, Ciudad de México. México. 03810.
- Reduced-motion consumers now use the existing `useSyncExternalStore` preference hook, with a matching server/hydration snapshot. All 14 routes passed the local production browser check with both motion preferences and zero uncaught errors.
- Shared `.shell` now uses `--site-gutter` and `--content-max`. Header, heroes, and footer align at 24px on 430px screens; representative pages have no overflow at 320px, 393px, and desktop.
- Production build passes. Tests remain 23/24, with the previously identified metadata raster failure. The footer destination test now validates the actual mailto destination.
- Existing header lifecycle lint errors, metadata assets, and empty blog/changelog work are still outstanding. No emails were sent and nothing was deployed.

## Final cleanup follow-up — 16 October 2026

- Metadata delivery PNGs now match their declarations; original artwork is preserved under `assets/brand/source/`, with repeatable exports in `scripts/export-metadata-assets.mjs`.
- Full lint passes with zero errors and warnings. Header lifecycle state now preserves menu exit visibility without synchronous effect updates; portal hydration uses matching server/client snapshots. Unused operations-system imports were removed.
- Engineering Blog and Changelog are hidden from footer navigation and sitemap, and marked noindex. Their direct routes remain available for future content.
- All 24 tests and the production build pass. The privacy notice and editable draft now contain the business address supplied by the user.
