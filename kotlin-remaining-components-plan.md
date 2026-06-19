# Kotlin remaining components plan

This is the follow-up plan after completing `kotlin-htmx-plan.md`. It focuses on design-system component families that are still missing Kotlin component coverage, plus a few partial coverage gaps that should be tracked separately.

## Current Kotlin component coverage

Kotlin generation is driven by `designsystem/**/*.contract.ts`, and the current generated Kotlin output includes wrappers for these component families:

- `alert`
- `badge`
- `button` / `button-link`
- `card` / `card-link` / `group`
- `divider`
- `input` baseline (`Input`)
- `layout` (`Flex`, `Grid`)
- `link`
- `logo` / `logo-link`
- `skeleton`
- `spinner`
- `tag` / `tag-link`
- `typography` (`Heading`, `Info`, `Ingress`, `Muted`, `Prose`)
- `validation`

Treat those as covered for this plan. Improvements to their API completeness can be handled as polish, not as remaining component coverage.

## Remaining uncovered component families

The remaining React component directories without Kotlin component coverage are:

`app`, `atlas`, `avatar`, `breadcrumbs`, `chart`, `chip`, `details`, `dialog`, `errorsummary`, `field`, `fieldset`, `fileupload`, `helptext`, `law`, `pagination`, `popover`, `print`, `progress`, `steps`, `table`, `tabs`, `toast`, `togglegroup`.

`tooltip` is also part of the design-system behavior, but it does not currently have a `tooltip.tsx` component wrapper. Treat it as attribute/helper support rather than a Kotlin component.

## Goals

1. Add coverage for every remaining component family, either as generated wrappers, manual Kotlin DSLs, or documented deferrals.
2. Keep simple wrappers generated from TypeScript contracts.
3. Extend the generator only where it unlocks multiple remaining components safely.
4. Hand-write Kotlin APIs for compound, structural, custom-element-heavy, or behavior-heavy components.
5. Keep HTMX usage ergonomic for forms, validation, dialogs, popovers, pagination, tables, and server-rendered feedback.

## Non-goals

- Do not port React stateful behavior into Kotlin.
- Do not hide required browser/custom-element JavaScript dependencies.
- Do not generate Kotlin directly from React implementation details.
- Do not attempt full Atlas, Chart, Law, Toast, or App behavior before low-level server-rendered surfaces and runtime requirements are documented.

## Classification legend

| Track | Meaning |
| --- | --- |
| `G0` | Can be added with the current contract schema and current generator tag support. |
| `G1` | Should be generated, but needs small generator/tag/custom-element extensions first. |
| `M` | Needs a hand-written Kotlin DSL/wrapper for a useful API. |
| `D` | Defer full component support; provide helper APIs or documentation first. |

## Remaining component matrix

| Component | Track | Proposed Kotlin surface | Notes / risks |
| --- | --- | --- | --- |
| `avatar` | `G0` | `Avatar`, `AvatarLink`, optionally `AvatarButton` | Current generator supports `span`, `a`, and `button`, so this is the quickest remaining generated component. Use separate wrappers instead of React-style polymorphism. Support `data-size`; verify link/button styling. |
| `chip` | `G1` | `Chip`, `RemovableChip` | Needs `label` tag support. Selectable chip wraps an input; removable chip is a button. Markup/a11y should be tested. |
| `details` | `G1` | `Details`, `Summary` helper | Needs `details`/`summary` tag support. Native behavior; low JS risk. Enforce or document summary-first markup. |
| `dialog` | `G1` plus helpers | `Dialog`, `DialogButton`/command helpers | Needs `dialog` tag support. Add typed helpers for `closedby`, `command`, `commandfor`, placement. Browser behavior varies. |
| `fieldset` | `G1` | `Fieldset`; optional `Legend`/`Description` helpers | Needs `fieldset` and possibly `legend` support. Keep native semantics and child order. |
| `fileupload` | `G1` | `FileUpload` label container | Needs `label` tag support. Do not implement upload state; render label/input markup and leave preview/removal to the app. |
| `popover` | `G1` plus helpers | `Popover`, `PopoverMenu`, trigger attr helpers | `div` is supported, but `menu`/popover-specific attrs and trigger helpers are needed. Depends on browser popover behavior and observer JS. |
| `print` | `G1` | `PrintSection`/`Print` | Needs `section` tag support. Mostly CSS/print-engine behavior. |
| `steps` | `G1` | `Steps`, optional `Step` helper | Needs `ol`/`li` support. Markup discipline matters for current/completed states. |
| `breadcrumbs` | `G1` then maybe `M` | Low-level `Breadcrumbs`; optional item DSL | Needs custom element support for `ds-breadcrumbs`. A useful DSL should render `ol/li/a` and current-page semantics. |
| `errorsummary` | `G1` then maybe `M` | Low-level `ErrorSummary`; optional `ErrorSummaryList` helper | Needs custom element support for `ds-error-summary`. Useful high-level API should render heading/list/link structure. |
| `progress` | `G1` | `Progress` | Needs custom element support for `u-progress`. Runtime registration comes from bundled JS/package imports. |
| `field` | `M` | `Field(label, description, validation, helpText, count, prefix, suffix) { ... }` | Compound component around `ds-field`, label/help/description/input/validation/counter/affixes. Defer `Field.Suggestion`/combobox initially. |
| `helptext` | `M` | `HelpText(id, label) { ... }` | Emits a button plus popover content. Requires explicit or generated IDs and accessibility decisions. |
| `pagination` | `M` | `Pagination(current, total, show, hrefFor/pageAttrs) { ... }` | Port the JS pagination algorithm. Render nested list/buttons/links; support HTMX attrs through callbacks. |
| `table` | `M` | `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td`, `ThSortable` | Low-level table wrapper is simple but useful API needs subcomponents, sortable headers, responsive/mobile attrs, and observer behavior. |
| `tabs` | `M` | `Tabs(idPrefix)`, `TabList`, `Tab`, `TabPanel` | Custom elements plus keyboard/a11y behavior from Designsystemet. Decide whether Kotlin sets roles/ids/selection server-side. |
| `togglegroup` | `M` | `ToggleGroup(name) { RadioItem(...) }`; later link variant | Requires nested fieldset/label/input/button structure. Keep radio group semantics correct. |
| `app` | `D` then `M` | Later `AppShell`, `AppHeader`, `AppSidebar`, `AppMain`, `AppFooter` | Depends on `app-observer.ts`, dialogs, localStorage, sidebar state, and app layout assumptions. Do after layout/dialog/popover usage is stable. |
| `chart` | `D` then `M` | Later `Chart(variant) { table { ... } }` | Custom element `mtds-chart`; content must be a table or equivalent. Requires JS, observers, table parsing, tooltip behavior. |
| `law` | `D` then `M` | Later `LawHtml`/`LawContainer`; optional Kotlin helpers for checked state | Useful support depends on transformed Lovdata HTML and helper functions. Sanitization and external markup assumptions must be explicit. |
| `toast` | `D` then `M` | Later static `ToastDialog`; optional HTMX out-of-band pattern helpers | React/plain JS exposes imperative toast helpers. Kotlin should first support server-rendered static toast markup, not client lifecycle. |
| `atlas` | `D` then `M` | Later low-level `Atlas`, `AtlasMarker`, `AtlasMatgeo`, `AtlasWms` | Separate atlas bundle, Leaflet, map tiles, custom elements, events, and network dependencies. Defer full map DSL. |
| `tooltip` | `D` helper | `dataTooltip(text, position?)` attribute helpers | Behavior on arbitrary elements, not a component wrapper. Depends on tooltip custom element/runtime. |

## Partial coverage gaps to track separately

These are not uncovered component families, but they should be tracked so Kotlin parity improves over time:

| Covered family | Gap |
| --- | --- |
| `input` | `Select` and `Textarea` are not covered by the current `Input` contract; add after `select`/`textarea` tag support. |
| `alert` | Stories use `data-size`; current contract only covers color. Consider adding `AlertSize`. |
| `tag` | Current contract should be checked against color/size support in stories/CSS. |
| `badge` | Verify whether `data-color` should be a public typed parameter. |
| `skeleton` | Inline text skeletons may need `SkeletonSpan`/`SkeletonText`. |
| `typography` | If heading levels beyond the current fixed tag are needed, generate explicit `H1`-`H6` or heading-level wrappers. |
| `layout` | Child layout attributes such as `data-self`, `data-align-self`, and `data-justify-self` may be better as generic attr helpers. |

## Phase 0: coverage tracking and generator hardening

Before adding more components, add lightweight guardrails.

### Tasks

1. Add a component coverage manifest or test that classifies every `designsystem/*/*.tsx` component as one of:
   - generated contract,
   - manual Kotlin wrapper,
   - deferred with reason.
2. Add a test that fails when a new React component directory appears without a Kotlin coverage decision.
3. Extend generator test fixtures to cover:
   - multiple contracts from one component family,
   - no-content elements,
   - fixed/default attributes,
   - enum/string/boolean params,
   - unusual enum values such as numeric strings or `true`.
4. Add native tag support needed by the rest of the plan:
   - form/content tags: `label`, `fieldset`, `legend`, `section`, `nav`, `menu`, `ol`, `li`, `details`, `summary`, `dialog`,
   - form controls: `select`, `textarea`,
   - table tags: `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`.
5. Add custom element support for generated wrappers:
   - `ds-*` for Designsystemet elements,
   - `u-*` for `u-progress` and related legacy/custom elements,
   - `mtds-*` for Mattilsynet custom elements such as charts and Atlas, when they are eventually supported.
6. Add generic attribute helpers for cross-cutting design-system behavior:
   - tooltip: `data-tooltip`, `data-tooltip-position`,
   - popover trigger: `popovertarget`, `popovertargetaction`,
   - command API: `command`, `commandfor`,
   - common data attrs such as `data-size`, `data-color`, `data-variant`, `data-align`, `data-justify`, `data-nowrap` where reusable helpers make sense.
7. Document runtime requirements in `kotlin/README.md`:
   - which components work with CSS only,
   - which require `/mtds/index.iife.js`,
   - which require `/mtds/atlas.iife.js` or external map services.

### Output

- The remaining component families have an explicit coverage decision.
- Generator can safely emit more native tags and custom elements.
- Components that require JS are explicitly documented.

## Phase 1: quick generated coverage (`G0`)

### Component

- `avatar`

### Tasks

1. Add contracts for `Avatar`, `AvatarLink`, and optionally `AvatarButton`.
2. Keep the API explicit rather than polymorphic:
   - `Avatar` -> `span.avatar`,
   - `AvatarLink` -> `a.avatar`,
   - `AvatarButton` -> `button.avatar` with default `type="button"`.
3. Expose `data-size` as an enum.
4. Add render tests for initials/content, link variant, and button variant if included.

## Phase 2: generated contracts after native tag support (`G1`)

After Phase 0 tag support, add components that are mostly declarative but need currently unsupported native tags.

### Components

- `chip`
- `details`
- `dialog`
- `fieldset`
- `fileupload`
- `popover`
- `print`
- `steps`
- `input` completion: `Select`, `Textarea`

### Tasks

1. Add contracts for simple root wrappers:
   - `Chip` as `label.chip`, `RemovableChip` as `button.chip`,
   - `Details` and a `Summary` helper,
   - `Dialog`,
   - `Fieldset`,
   - `FileUpload`,
   - `Popover` / `PopoverMenu`,
   - `Print`,
   - `Steps`,
   - `Select`, `Textarea`.
2. Add typed helper enums for browser/platform attrs when they are central to the component:
   - dialog placement and `closedby`,
   - popover placement/overscroll,
   - steps direction/fade/state,
   - details align/variant.
3. Keep nested structural requirements in docs and tests; do not overfit the generator to every nested shape.
4. Add examples that combine these with HTMX:
   - `Dialog` opened by a server-rendered button,
   - `Popover` with a trigger button,
   - `FileUpload` with server validation,
   - `Details` or `Steps` in a content page.

## Phase 3: generated custom element wrappers (`G1`)

Once custom element output is reliable, add low-level wrappers for components whose React implementation is mostly a custom element plus class.

### Components

- `breadcrumbs`
- `errorsummary`
- `progress`

### Tasks

1. Generate custom element wrappers:
   - `Breadcrumbs` -> `ds-breadcrumbs`,
   - `ErrorSummary` -> `ds-error-summary`,
   - `Progress` -> `u-progress`.
2. Ensure generated Kotlin can render unknown/custom tags with attributes and content.
3. Document that consumers must serve the appropriate design-system JS for custom-element behavior.
4. Add optional manual convenience helpers only where they remove repeated accessible markup:
   - `BreadcrumbsList` / `BreadcrumbItem`,
   - `ErrorSummaryList(errors)`.

## Phase 4: manual server-aware Kotlin DSLs (`M`)

These components should not be represented only as one generated element. Their useful Kotlin surface is a structured DSL or helper function.

### `Field`

Plan a hand-written API around common server-rendered form fields:

```kotlin
Field(
    id = "animal",
    label = "Dyreslag",
    description = "Velg dyreslag",
    validation = "Må fylles ut",
) {
    Input(attrs = { name = "animal" })
}
```

Initial scope:

- label,
- description,
- validation/error,
- help text integration,
- prefix/suffix affixes,
- counter,
- size/required attributes.

Defer:

- `Field.Suggestion`,
- combobox/datalist selected-state helpers,
- client custom events.

### `HelpText`

Manual wrapper because it emits two linked elements:

- trigger button with `class="helptext"`,
- popover content with a stable `id`.

Require explicit `id` at first. Consider generated IDs only if there is a deterministic, testable strategy.

### `ToggleGroup`

Start with radio toggle groups:

```kotlin
ToggleGroup(name = "status") {
    ToggleGroupRadio(value = "open", checked = true) { +"Åpen" }
    ToggleGroupRadio(value = "closed") { +"Lukket" }
}
```

Defer link-style toggle groups until radio behavior is stable.

### `Pagination`

Port the JS pagination algorithm and expose both link and button/HTMX-friendly APIs:

- `hrefFor(page)` for normal links,
- `attrsFor(page, type)` for HTMX buttons/links,
- explicit labels for previous/next,
- current page semantics with `aria-current="page"`,
- disabled previous/next handling.

### `Table`

Provide subcomponent helpers rather than one root wrapper only:

- `Table`, `Caption`, `Thead`, `Tbody`, `Tfoot`,
- `Tr`, `Th`, `Td`,
- `ThSortable` that renders a button inside `th` when sortable.

Document that responsive/mobile behavior depends on the table observer from `/mtds/index.iife.js`.

### `Tabs`

Manual API should wrap the Designsystemet custom elements and make IDs explicit:

- `Tabs(idPrefix = "case-tabs")`,
- `TabList`,
- `Tab(id = "details-tab", panelId = "details-panel", selected = true)`,
- `TabPanel(id = "details-panel", labelledBy = "details-tab")`.

Decide in implementation whether Kotlin sets roles/ARIA eagerly or relies on the custom element runtime.

## Phase 5: behavior-heavy and deferred components (`D` -> `M`)

These should be planned after the generated and server-form/navigation components are stable.

### `App`

Add only after `layout`, `dialog`, `popover`, `button`, `avatar`, and `logo` Kotlin support is solid.

Likely API:

- `AppShell`,
- `AppHeader`,
- `AppSidebar`,
- `AppMain`,
- `AppFooter`,
- optional helper for the initial app-expanded script/state.

Risks:

- `app-observer.ts`,
- `localStorage`,
- sidebar/dialog behavior,
- server/client state mismatch.

### `Chart`

Start with a low-level server-rendered wrapper around `mtds-chart` and a table DSL. Do not attempt a Kotlin charting data model until the table-based contract is stable.

Risks:

- custom element registration,
- table parsing,
- resize/mutation observers,
- tooltip behavior,
- keyboard/pointer interactions.

### `Law`

Treat as a wrapper/helper around transformed Lovdata HTML, not a simple component contract.

Before implementation, decide:

- where sanitization happens,
- whether Kotlin should expose helpers equivalent to `fixLawHtml`, `parseLawIds`, `setLawChecked`, and `getLawChecked`,
- whether checked-state handling belongs server-side, client-side, or both.

### `Toast`

Start with static toast markup for server responses and HTMX out-of-band swaps. Do not port the imperative React/plain JS `toast()` lifecycle in the first Kotlin iteration.

Possible first API:

- `ToastDialog(color, icon, timeout, open = true) { ... }`,
- helper docs for `hx-swap-oob` usage.

### `Atlas`

Defer full support. First document runtime requirements and add only low-level custom element wrappers if needed:

- `Atlas`,
- `AtlasMarker`,
- `AtlasMatgeo`,
- `AtlasWms`.

Risks:

- separate atlas bundle,
- Leaflet and marker clustering,
- map tile/network dependencies,
- custom events,
- Shadow DOM behavior.

### `Tooltip`

Do not add a `Tooltip` component. Add generic attrs instead:

```kotlin
Button(attrs = {
    dataTooltip("Vis mer")
    dataTooltipPosition(TooltipPosition.Top)
})
```

## Definition of done per component

For each component added to Kotlin support:

1. Contract or manual Kotlin wrapper exists.
2. Generated or manual API has focused render tests.
3. Public parameters cover the stable React/CSS data attributes for the selected scope.
4. Required static resources/JS runtime are documented when relevant.
5. `npm run build` regenerates metadata successfully.
6. `./gradlew -p kotlin build` passes.
7. The component is marked as covered in the coverage manifest/test.

## Recommended next PR sequence

1. Phase 0 coverage manifest/test and generator tag/custom-element groundwork.
2. Phase 1: `avatar`.
3. Phase 2 PR 1: `chip`, `details`, `fieldset`, `fileupload`, `print`, `steps`.
4. Phase 2 PR 2: `dialog`, `popover`, `Select`, `Textarea`.
5. Phase 3: `breadcrumbs`, `errorsummary`, `progress`.
6. Phase 4 PR 1: `Field`, `HelpText`, and `Pagination`.
7. Phase 4 PR 2: `Table`, `Tabs`, and `ToggleGroup`.
8. Phase 5 deferred behavior-heavy components: `App`, `Chart`, `Law`, `Toast`, `Atlas`, plus tooltip attribute helpers.
