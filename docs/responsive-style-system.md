# Responsive marketing styles

The root font size stays at the browser default. Global semantic tokens in
`src/app/globals.css` own the responsive page scale; CSS Modules consume them.
Do not add new phone-specific heading sizes in individual pages.

| Role                  | Tokens                                                    | Phone range               |
| --------------------- | --------------------------------------------------------- | ------------------------- |
| Hero                  | `--type-hero-size`, `--type-hero-leading`                 | 32–36px / 1.08            |
| Supporting page title | `--type-page-title-size`                                  | Same mobile scale as hero |
| Section heading       | `--type-section-size`, `--type-section-leading`           | 26–28px / 1.15            |
| Intro / body          | `--type-body-size`, `--type-body-leading`                 | 15–16px / 1.5             |
| Section copy          | `--type-section-body-size`, `--type-section-body-leading` | Same mobile scale as body |

Sizes use rem and fluid viewport terms, preserving browser text preferences.
Desktop defaults retain the larger type hierarchy. The Tailwind display/section
utilities alias the same responsive roles through `marketing-theme.css`.

Use `--site-gutter` for horizontal alignment (16px on narrow phones, 24px from
420px), `--layout-hero-top` for mobile hero spacing, and
`--layout-section-gap` for mobile major section spacing. Keep composition-specific
spacing local; these variables are not a multiplier for every gap.

The mobile header stays 64px high before and after scrolling. Keep its logo
proportions, 44px menu target, and `--control-touch-size` minimum for hero CTAs.
Buttons may wrap; do not shrink labels or controls to fit a single row.

Embedded product mockups intentionally use their own container-relative UI scale.
Do not apply page typography rules to their headings or controls.

For changes to this system, check Home, Platform, Deployment, Offering, FAQ, and
Company at 320px, 393px, 430px, plus desktop. Check menu open/close, header after
scroll, CTA targets, wrapping, and page overflow. Check reduced motion separately
when changing animations.

H1–H6 use the self-hosted Instrument Sans variable family through `--font-heading`.
`--font-display` and Tailwind display utilities alias that role. The base heading
font-family rule intentionally overrides module font shorthands; sizes, weights,
and line heights remain component/token controlled. Body copy stays in Inter.
