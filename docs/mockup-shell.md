# Marketing mockup shell

Every product visualization on the website is a view of the same application, built from one set of components. Do not build standalone mockups with their own styling; compose or extend the shell.

## Layers

| Layer | File | Use it for |
| --- | --- | --- |
| Base primitives | `src/components/preview-ui.tsx` | Panels, tags, avatars, people, switches, fields. Light or dark. |
| Stage | `src/components/preview-stage.tsx` | The gradient backdrop, lazy background loading and bottom fade behind floating panels. |
| Operational primitives | `src/components/operational-ui.tsx` | The product's vocabulary: objects, states, actions, activity, briefings. |
| Application frame | `src/components/product-preview.tsx` | The full app (rail, Inbox and Data screens) on a scaled 1512px canvas. |
| Story data | `src/lib/operational-story.ts` | All mockup records, people and copy that appears inside the product. |

## Operational primitives

All sizes are in `em`, so a primitive takes its scale from its host: 12px in the product canvas, container-relative in `PreviewStage` panels. Colors read the `--preview-*` variables, so they adapt to the panel theme.

| Component | Represents | Used in |
| --- | --- | --- |
| `ObjectChip` | A reference to a real record (`PO-48202`, `María López`). Interactive when given `onClick`. | Briefing, related work, dialogs, evidence |
| `StateTag`, `OpTag` | A lifecycle state or status, with the shared tone mapping in `stateTones`. | Collections, fields, exceptions |
| `StateBar` | Descriptive lifecycle segments with the current state marked. It is not a progress bar. | Object detail |
| `ObjectDetail` | The generic detail composition: identity and permitted actions, Properties, Details, Related work, Activity. Renders an Order and a Production job alike. | Hero, Monday steps 3–5, anatomy, operations, Platform |
| `CollectionList` | A collection of objects with title, subtitle and tags; selectable or static. | Hero, operations, Platform workspaces |
| `ActionDialog` | An action form: a typed object reference input, its permission requirement and its declared effect. | Monday step 4, Platform actions |
| `ExceptionRow` | A situation that needs attention, tied to its object and the actions available on it. | Briefing |
| `BriefingCard` | The manager-level operational briefing: calculated figures, AI narrative, references, exceptions and provenance. | Monday steps 1–2, Platform intelligence |
| `ActivityTimeline` | Append-only activity entries, with an optional badge such as "Agent-assisted, human-approved". | Object detail, Platform governance and intelligence |
| `Toast` | The confirmation an action shows after it completes. | Monday step 5, Platform actions |

`ObjectDetail` and `BriefingCard` accept a `highlight` (`summary`, `exception`, `context`, `actions`, `dialog`, `result`, `state`, `related`, `activity`). It outlines the matching part and dims the rest, without changing the layout. Walkthroughs use it to direct attention.

## Driving the application frame

`ProductPreview` runs uncontrolled by default. A walkthrough passes `state` and handles `onIntent`. `applyIntent` holds the default behavior, so hosts can reuse it and only map the results to their steps (see `MondayWalkthrough` in `home-story.tsx`).

```tsx
<ProductPreview screens={["Inbox", "Data"]} state={state} onIntent={onIntent} height={740} />
```

## Product accuracy rules

- Mockup data mirrors demonstrated product behavior. Assign driver creates a relationship and records an activity event; it does not change an order's lifecycle state.
- Keep state, relationships and assignments, actions and activity visually distinct.
- Customer names are fictional. Never copy fixture names, especially real brands, into story data.
- Show no integrations, route optimization, autonomous agents or invented metrics.
- Use the product's own labels: Data, Collections, Details, Properties, Related work, Activity, Actions.

## Operational Intelligence v0

The briefing is a designed preview until Operational Intelligence v0 is validated in the product. `briefing.status` in `operational-story.ts` controls the disclosures:

- `"design-preview"` shows the "Design preview" tag in the Inbox topbar and panels, the "In development" label on Platform, and the Monday disclosure line.
- `"verified"` removes the briefing disclosures. Agent proposal disclosures remain, because agents are a separate, experimental capability.

When v0 ships, update the briefing figures, items and provenance to match what the product produces, then switch the status. Keep the mockup data isolated from the product. If the briefing gains a real screenshot, it can replace `BriefingCard` inside the Inbox screen without changing the walkthrough logic.
