# Marketing visual system — second pass

## Evidence and constraints (before implementation)

Inspected the rendered homepage at 1440, 768 and 390px, its hero and platform showcase, and all secondary source files. Reviewed desktop Platform, Solutions, Company and Contact plus mobile Platform. Existing work is uncommitted; preserve it.

- Container: 1280px maximum; gutters 36 / 24 / 16px. Left alignment is the anchor, not centered headline stacks.
- Grid: full-width opening product view, then narrow navigation rail / wide product stage; denser operational groupings and photographic industry strips.
- Rhythm: homepage major gaps 200 / 120 / 86px; inner gaps mostly 24–64px. Secondary long-form content can use the 80–120px interval to keep reading connected.
- Type: Gabarito display, Inter UI/body. Compact 28px desktop / 24px mobile display, 24px section and 20px feature roles. Inline muted continuation, normal weight, restrained tracking. Body 14–16px; metadata 12–13px. Avoid the secondary pages' 50–84px title scale.
- Surfaces: white canvas, cool gray inset panels, black conversion actions, 6px inner / 12px outer radii, quiet borders and diffuse product shadows.
- Color: content is neutral. Chromatic imagery belongs behind product or at a deliberate transition, not on every panel. No repeated glow treatment.
- Product framing: credible UI, fine borders, small labels, substantial media. Supporting illustrations should explain relationships, not imply new functionality or customer evidence.
- Controls: compact 40px conversion buttons, restrained links; current header anchors are visibly underlined and lack route state.
- Motion: gentle reveal and product entrance, deliberate accordion expansion; respect reduced motion. Reuse Reveal sparingly for media.
- Mobile: stacked compositions, smaller gutters and headings, compact symbol navigation; diagrams must reflow without horizontal clipping. Footer changes from an eight-column grid to four then two columns.
- Personality comes from the compact two-tone voice beside expansive operational UI, restrained framing and occasional optical imagery. Do not redesign the homepage or copy its shader into every page.

## Route audit and implementation plan

No nested routes exist. Platform anchors: matrix, flow, atlas, implementation. Related routes: contact, terms, privacy, not-found. Preserve their content and links.

- Foundation: install Tailwind (absent in the repository) with no Preflight; map existing CSS variables through v4 theme tokens. Replace secondary-page CSS with utility compositions and a small set of shared primitives. Keep homepage CSS untouched, including its existing proof treatment.
- Platform: replace oversized index cards with a connected system overview; use an object relationship composition for Matrix, existing workflow UI for Flow, a clearly labeled context diagram for Atlas, and a numbered implementation sequence.
- Solutions: replace flat text-only rows with alternating operational diagrams and an existing product visual. Keep the useful fit comparison; add industry imagery already used by the homepage.
- Company: compact editorial opening with a brand signature; distinct editorial argument, operating-model diagram, and open design-partner note. No invented portraits, metrics, or proof.
- Contact: structured preparation checklist and a quiet status panel; reuse numbered process sequence. Keep booking limitation explicit.
- Legal / 404: compact reading layouts using the same type and spacing primitives.
- Navigation: shared link with soft hover/current background, small square indicator, keyboard focus and nested-path matching; Company also owns Contact. Keep conversion action distinct and available on secondary routes.

## Validation

Inspect all affected routes at desktop, tablet and mobile. Check no overflow, image loading, anchor targets, keyboard/mobile navigation, current route state, reduced motion and homepage regression. Run lint, TypeScript and production build; repository initially has no test script or test suite.

## Implemented and verified

- Kept approved paragraphs, route structure and anchor IDs. New labels and diagrams only explain the existing model; all product examples are marked illustrative.
- Added Tailwind v4/PostCSS without Preflight, semantic aliases, shared page/section/product-frame/CTA/process primitives. Removed the secondary-page global rules, unused oversized editorial tokens and obsolete navigation/popover rules. Existing homepage compositions and effects remain in place.
- Built distinct Matrix relationships, Flow screenshot and Atlas context views. Solutions now uses a connected order sequence, service record composition, inventory relationship diagram and handoff illustration. Company uses a brand signature and an operating-model diagram. Contact uses a preparation checklist and process sequence.
- Visually inspected desktop (1440), tablet (768) and mobile (390) layouts across Platform, Solutions, Company, Contact, Privacy, Terms and 404. Reviewed full desktop Platform/Solutions and scrolled through the major mobile compositions. Also inspected the production CSS output.
- Additional DOM checks at 320, 721 and 1024px: no page-level overflow on the six secondary routes, one H1 per route, correct primary current state and Contact's Company association. The Flow visual intentionally has an accessible local horizontal scroll region on mobile.
- Verified keyboard activation and visible focus outline without text underlines, mobile menu open/close, Escape focus return, and anchor offset below the fixed header. Nested-route matching and segment-boundary behavior have two automated test cases.
- During QA, separate workspace edits changed header height and scroll treatment. Preserved them and changed the mobile menu inset to follow the actual header height.
- Homepage check: 1280px desktop container and 28px opening statement retained; product entrance still renders. No homepage content or product components were rewritten in this pass.
- Checks: ESLint, generated route types + TypeScript, navigation tests and Next production build pass. The sandbox initially blocked Turbopack worker ports; a clean build with the required execution permissions passed.

Existing content limitations remain: Contact awaits a confirmed booking destination, and legal pages await review. No substitute claims, contact information or legal wording were invented. The Node test runner emits a harmless module-type detection warning when importing the TypeScript helper; tests pass.

## Affected files

- `src/app/platform/page.tsx`, `src/app/solutions/page.tsx`, `src/app/company/page.tsx`: page compositions and explanatory visuals.
- `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/not-found.tsx`: supporting page layouts.
- `src/components/editorial-page.tsx`: shared containers, typography, sections, product framing, CTA and process steps.
- `src/components/header.tsx`, `src/lib/navigation.ts`, `tests/navigation.test.mjs`: navigation styling, current states and regression coverage.
- `src/app/globals.css`, `src/app/marketing-theme.css`, `postcss.config.mjs`, `package.json`, `package-lock.json`: styling foundation, removal of obsolete styles, Tailwind dependencies and validation scripts.
- `docs/marketing-design-pass.md`: audit, rationale and validation record.

Pre-existing edits to the homepage, layout, use-case accordion and site data were preserved; their presence in the working-tree diff is not work introduced by this visual pass.
