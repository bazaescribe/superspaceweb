# Figma marketing sync — September 15, 2026

Source: Superspace `PKfCpsiwTDhP4zdcvAETnE`, Home v2.2 `826:1356`.
Inspected with Figma MCP design context, variable definitions and read-only Plugin API queries before implementation. No changes were made to Figma.

## Design data and implementation

- Figma Colors has Light and Dark modes. Background/Main: white / `#09090b`; Background/Secondary: `#f9fafb` / white 4%; Background/Tertiary: `#f3f4f6` / white 8%. Content/Main: `#09090b` / white; Content/Secondary: foreground 60%; Content/Tertiary: foreground 30%. Border remains a separate existing token, `#f3f4f6` / white.
- Accent/Main remains `#170fff`. Following the user's explicit approval, the site's dark semantic accent uses Figma Accent/Darker (`#231f91`) for card hover/focus. Secondary text at 60% white has 5.37:1 contrast on this background, versus 3.51:1 on Accent/Main.
- `src/app/color-tokens.css` owns semantic colors. Existing CSS/Tailwind names remain aliases, rebound at `data-theme` boundaries, allowing nested explicit light/dark scopes. `HeaderThemeRegion` exposes its mode to CSS and retains scroll-driven navbar behavior. Buttons were checked in both modes so inverse CTAs do not become white-on-white.
- Website headings use Rethink Sans. Shared Figma styles are Regular: H1 48px, H2 40px, H3 32px, H4 28px, H5 24px, H6 20px. H1/H2 have 104% line height; H3–H6 automatic line height. All have 1% letter spacing. Actual hero and closing CTA nodes override the style to Bold (700); story statements remain Regular (400).
- Rethink Sans uses the existing self-hosted Fontsource variable-font strategy; Inter remains the body family. Removed the unused Gabarito dependency. Inspected body/feature copy uses the 16px body role, captions 14px, and footer metadata 12px.
- Desktop navbar is 64px; hero content starts at 144px, exactly 80px below it. Hero copy, including actions, ends 80px above the mockup. Removed the old mockup negative margin and replaced competing spacing values with shared responsive variables.
- Implementation has 200px desktop / 80px mobile section padding, 40px desktop / 24px mobile header-to-grid spacing, 4px desktop grid gap, square visual slots, 12px corners, and 32px desktop / 24px mobile caption padding. Exact captions already matched Figma and were retained in order: Map the operation; Shape the system; Put it to work.
- Resting cards use dark Background/Secondary; pointer hover and keyboard focus use dark Accent. Focus retains a white outline. No click destinations were invented for explanatory articles. The middle card's existing animation/static fallback remains and now also responds to keyboard focus, including when the pointer leaves a focused card.

## Footer and unresolved destinations

Four visually unheaded groups retain accessible navigation labels:

- Explore: Platform → `/platform`; Offerings → `/solutions`.
- Company: About us → `/company`; FAQ and Changelog → no destination yet.
- Connect: LinkedIn → `https://www.linkedin.com/company/superspaceai/`; X (Twitter) → `https://x.com/superspaceai`; Contact → `/contact`.
- Legal: Terms → `/terms`; Privacy → `/privacy`.

Identity: “Superspace Ontology Systems”, “Operational Software for Growing Companies”, “Mexico City / MX”, “Est. 2024”. English remains a non-interactive current-language indicator: no language-switching behavior or translation pages were invented.

Figma footer nodes have no hyperlinks or prototype destinations. Existing routes and user-supplied social URLs are used. FAQ/Changelog remain visible non-clickable labels with `href: null`, as approved. Implementation's FAQ and Download Brochure likewise remain non-clickable because no FAQ page or brochure asset exists. No missing pages were built, and no empty-href or fake `#` links were introduced. The working hero `#platform` anchor remains.

## Canonical exported assets

Existing filenames were replaced in place so interface, JSON-LD and social metadata consumers all use the new mark. Exact downloaded Figma exports were used; no logo paths were authored or altered.

| File in `public/brand/`           | Figma node         | Format/dimensions                            |
| --------------------------------- | ------------------ | -------------------------------------------- |
| `superspace-logo.svg`             | `967:5132`         | Transparent SVG, 1666.24×256                 |
| `superspace-logo-inverse.svg`     | `967:5147`         | Transparent SVG, 1666.24×256                 |
| `superspace-symbol.svg`           | `967:5130`         | Transparent SVG, 344×480                     |
| `superspace-symbol-inverse.svg`   | `967:5128`         | Transparent SVG, 344×480                     |
| `superspace-favicon.svg`          | `484:2558`         | SVG, 679×679 viewBox                         |
| `superspace-favicon.png`          | `484:2558`         | PNG, 512×512                                 |
| `superspace-apple-touch-icon.png` | `540:1811`         | PNG, 180×180; newly added                    |
| `superspace-social.png`           | `850:2274`         | PNG, 1200×675                                |
| `language-chevron.svg`            | `841:1949`         | Canonical SVG glyph; newly added             |
| `cta-chevron.svg`                 | `836:1824` subtree | Canonical white SVG glyph, 6×10; newly added |

Interface SVGs use MCP transparent vector assets rather than whole-node renders containing ancestor backgrounds. The CTA comes from the button subtree: the design-context asset URL resolved to an unrelated illustration frame; the actual exported white chevron was inspected before use. Metadata references now distinguish the separate Apple icon and declare correct favicon dimensions.

Old brand bytes were replaced in place, not retained in backup files. Existing edits in `public/assets/figma/illustration/` and `.DS_Store` were left untouched.

Follow-up favicon correction: at the user's explicit request, removed the exported ancestor gray background rectangle from the favicon SVG and regenerated its 512×512 PNG. The canonical black symbol and white outline paths are unchanged; both favicon formats now have transparent backgrounds. Apple touch and social assets retain their intended backgrounds.

## Deliberate deviations and scope

- All three existing Implementation visuals remain placeholders by explicit request; none of the new illustrations was implemented. Useful visual/animation code remains.
- The inspected Website v2 page has no tablet/mobile Home v2.2 frames. The project's responsive conventions supply symmetric 64px tablet and 40px mobile hero gaps, a 32px mobile hero, stacked cards and footer grids of eight/four/two columns. The existing 80px mobile navbar remains.
- Card transitions reuse established 280ms/easing tokens because inspected cards have no prototype reactions or transition specification.
- Existing hero shader and footer field effects remain untouched: this request changes hero spacing and footer navigation, not those effects. Other section content/navigation architecture remains outside this scoped update.
- Missing footer/Implementation destinations are intentionally non-clickable, as approved. Offerings/About us use existing canonical `/solutions` and `/company` routes.

## Validation

- ESLint, Next route type generation + TypeScript, Node tests (16 total), and production build.
- Added five regression tests for both semantic modes, AA reading-text/card-hover contrast, footer labels/order/routes, raster dimensions and transparent light/inverse SVG logos.
- Production browser inspections at 1512px desktop and 390px mobile: hero, Implementation focus/hover and footer. Measured 80/80 desktop and 40/40 mobile gaps.
- DOM audit at 320px, 768px and 1512px on all seven existing marketing routes: no page-level overflow, one H1, headings below the navbar, no failed brand images.
- Dark section/nav colors, 60% secondary text, 4% resting cards, darker-accent pointer hover and keyboard focus, and legible inverse CTA checked. Mobile menu Escape returns focus.
- Heading family/weights/sizes, self-hosted WOFF2 build output and loaded brand assets checked. Reduced-motion guards remain in CSS and the existing renderer; no system settings were changed.
- Final production HTTP checks passed: exported interface/browser/social assets, manifest and both font families returned 200. Rendered icon/social metadata and manifest dimensions are correct. Post-build browser checks confirmed loaded Rethink Sans, canonical CTA chevron, darker-accent keyboard focus with white outline, working footer routes and no mobile overflow.

On a clean rebuild, Turbopack's CSS worker could not bind its internal port in this execution environment, even after requesting execution permission. The supported Webpack production build is used as the validation fallback; no build configuration was changed.
