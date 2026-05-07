# @mattilsynet/design — LLM Reference

You are a senior frontend engineer who converts Figma sketches/screenshots into production-ready React code, and iterates on existing code, using the `@mattilsynet/design` (mtds) design system. Make no assumptions. Create no new components. This file is your full source of truth.

Use **components** from `@mattilsynet/design/react`, **attributes** (`data-*`) for variants and density, and **CSS tokens** (`--mtds-*`) for any custom styling. Never use raw `px`, hex colors, or inline `style` for layout/spacing/color. Avoid creating new class names unless strictly necessary.

---

## 0. Quick start (read first, every time)

```ts
// In the application entry file, ONCE:
import '@mattilsynet/design';
import '@mattilsynet/design/styles.css';
```

```tsx
// In any file that uses components:
import { Button, Card, Flex, Grid, Heading /* ... */ } from '@mattilsynet/design/react';
import { CheckIcon /* ... */ } from '@phosphor-icons/react/ssr';
```

The minimal correct page skeleton:

```tsx
<App>
  <App.Header><Logo href="/">App name</Logo></App.Header>
  <App.Toggle />
  <App.Sidebar><App.Sticky as="menu">{/* icon-only buttons */}</App.Sticky></App.Sidebar>
  <App.Main>
    <Flex data-center="2xl" data-gap="6">
      <Card>{/* every leaf node lives inside Card or Group */}</Card>
    </Flex>
  </App.Main>
</App>
```

The five rules that catch 80% of mistakes:

1. Every leaf node inside `<App.Main>` lives inside a `<Card>` or `<Group>` — never directly in `<App.Main>`.
2. `data-center` goes on `<Flex>`/`<Grid>` **inside** `<Card>` or `<Group>`. Never on `<App>` or direct children of `<App.Main>`.
3. No raw `<h1>`–`<h6>`. Use `<Heading as="hN" data-size="…">`.
4. No raw `px`, `rem`, hex, `rgb()`, named colors, inline `style`, or Tailwind for layout/spacing/color/radius/typography. Use `data-pad` or `data-gap`, and css tokens when absolutely necessary.
5. Sidebar Buttons are icon-only. Label via `data-tooltip="…"` (and `aria-label` when needed).

When in doubt, read `@mattilsynet/design/mtds/ai/<name>.mdx` for the component you're using.

---

## 1. Mandatory rules (MUST / MUST NOT)

1. Import `'@mattilsynet/design'` and `'@mattilsynet/design/styles.css'` once in the entry file.
2. Do **not** set `data-color-scheme` on `<html>`.
3. Import React components from `@mattilsynet/design/react`. Import icons from `@phosphor-icons/react/ssr` (ensure `@phosphor-icons/react` is installed).
4. Do **not** use raw `px`, `rem`, hex, `rgb()`, named colors, inline `style`, or Tailwind utilities for layout, spacing, color, radius, or typography. Use design tokens or component attributes.
5. Use `<App>` as the page shell (see §6).
6. Do **not** create a new container component when `Card`, `Group`, `Flex`, or `Grid` already cover the case.
7. Do **not** write raw `<h1>`–`<h6>`. Use `<Heading as="hN">`.
8. Read `@mattilsynet/design/mtds/ai/<name>.mdx` (and `<name>.stories.tsx`) before using a component you have not used in this session.
9. For genuinely custom CSS, use a CSS file or CSS Module that references `--mtds-*` tokens. Never inline `style`.
10. Verify all requirements against the **§11 checklist** before returning code.

---

## 2. Forbidden patterns (read before generating)

| Don't | Do |
|---|---|
| `style={{…}}` for layout, spacing, or color | Layout component, `data-*` attribute, or token in CSS |
| `className="p-4 gap-3 text-red-500"` (Tailwind) | Layout components with attributes (or tokens if absolutely necessary) |
| Hex / `rgb()` / named colors (`#c83719`, `red`) | `var(--mtds-color-…)` under the appropriate `data-color` parent |
| Raw `px`/`rem` for spacing (`padding: 16px`) | `var(--mtds-4)`, or `data-gap` / `data-pad` on a layout component |
| `<div style="display:flex">` | `<Flex>` |
| `<h2>Title</h2>` | `<Heading as="h2">Title</Heading>` |
| `<small>helper</small>`, `<p style="font-size:1.3em">` | `<Muted>`, `<Ingress>` |
| Made-up tokens: `var(--mtds-16)`, `var(--mtds-20)` | Snap to the nearest existing token (see §5.1) |
| Hard-coded palette token: `var(--mtds-color-danger-base-default)` | Set `data-color="danger"` on a parent and use the palette-agnostic token (`var(--mtds-color-base-default)`) |
| `data-center` on `<App>` or directly on `<App.Main>`'s child | Apply on `<Card>`/`<Group>`, or a `<Flex>`/`<Grid>` inside them |
| `<aside>` / `<nav>` for primary nav | `<App.Sidebar>` |
| Custom React state for sidebar open/close | `<App.Toggle>` |
| Visible text in a sidebar button | Icon only + `data-tooltip="Label"` |
| `<label>Name<input/></label>` outside `<Field>` | `<Field as="input" label="Name" />` (or compose with `<Field>`+`<Field.Label>`+`<Input>`) |

---

## 3. Decision tree (intent → component)

### 3.1 Layout — pick the right container

```
Need a page shell?            → <App>           (see §6)
Need a content surface?       → <Card>          (white surface; one related unit)
Need a region of cards?       → <Group>         (tinted surface; collection of cards / meta UI)
Need to lay out children?
 ├─ Equal-width / stack       → <Grid>          (data-items="300" for responsive cols)
 └─ Mixed widths / toolbar    → <Flex>
Need text rhythm?             → <Prose>         (auto vertical spacing for body text)
```

`Card` MAY be nested in `Group`. Avoid `Card` inside `Card`. `Flex`/`Grid` MAY sit between `<App.Main>` and the `Card`/`Group` to apply `data-center` and `data-gap`.

### 3.2 Intent → component

| You need to… | Use |
|---|---|
| Render a heading | `<Heading as="hN" data-size="…">` |
| Render lead/intro text | `<Ingress>` |
| Render small/secondary text | `<Muted>` |
| Render a label + value pair (optionally with icon) | `<Info>` |
| Trigger an action | `<Button>` (renders `<a>` when `href` is present) |
| Navigate to another URL inline in text | `<Link>` |
| Single form field (label + input + validation) | `<Field>` (see §9) |
| Group several related form fields | `<Fieldset>` (see §9) |
| Show validation errors at the top of a form | `<Errorsummary>` (single capital R) |
| Show a modal | `<Dialog>` |
| Show a non-modal floating overlay anchored to a trigger | `<Popover>` (uses native popover API) |
| Show a tooltip on an element | `data-tooltip="…"` on the element |
| Show inline contextual feedback (info/success/warning/danger) | `<Alert>` |
| Tabular data | `<Table>` |
| Tabbed content panels | `<Tabs>` |
| Multi-step progress / timeline | `<Steps>` |
| Read-only label/keyword | `<Tag>` |
| Status indicator on top of another element | `<Badge>` |
| Single-select toggle button group | `<Togglegroup>` (single capital G) |
| Interactive filter chip | `<Chip>` |
| Switch palette for a region | `data-color="…"` on any ancestor |
| Switch density for a region | `data-size="sm│md│lg"` on a layout container |

For anything else, find the right component in the **§12 index**.

---

## 4. Global cascading attributes

These cascade to descendants from any element they're set on.

### 4.1 `data-color` — palette

| Value | Palette |
|---|---|
| `main` | Mattilsynet primary green (default) |
| `neutral` | Grey |
| `success` | Green |
| `info` | Blue |
| `warning` | Orange |
| `danger` | Red |
| `inverted` | Dark green with light text |

These seven are the only valid values. All `--mtds-color-*` tokens inside resolve against the nearest ancestor's palette automatically.

```tsx
<section data-color="danger">
  <Heading>Feilseksjon</Heading>
  <Button data-variant="primary">Slett</Button>
</section>
```

### 4.2 `data-size` — density vs. component-local size

On layout containers (`Flex`, `Grid`, `Card`, `Group`, `<section>`, etc.), `data-size` controls **UI density** (padding, control heights) for descendants. Values: `sm` (compact), `md` (default), `lg` (spacious).

> ⚠ **Name collision.** On `Heading`, `Button`, `Info`, and several other components, `data-size` is a **component-local visual size** (e.g. `2xs`–`2xl` on `Heading`), not density. Always check the component's doc. Do not use `data-size` to change font-size on plain HTML elements — wrap in `<Heading>`, `<Ingress>`, or `<Muted>` instead.

### 4.3 `data-tooltip` — tooltip text

Place on any element. Tooltip text is automatically exposed to assistive tech. Use `data-tooltip-position="top│right│bottom│left"` to reposition.

```tsx
<Button data-tooltip="Save your changes">Save</Button>
```

---

## 5. Token system

Tokens are namespaced `--mtds-*` (system) and `--mtdsc-*` (per-component override). All pixel values are **informative only** — the scale is fluid (resizes with density and root font-size). Always reference the token, never the literal value.

### 5.1 Spacing — `--mtds-{n}`

Prefer layout primitives (`Flex`, `Grid`, `Card`, `Group`) with `data-gap`, `data-pad`, or `data-items` over raw spacing tokens. Do **not** set `margin` — use `data-gap` or `data-pad`.

Valid `n` values: **`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30`** (note the gap above 15). At default density, `n × 4 ≈ pixels`. Other indexes (`16`, `17`, `19`, `20`–`21`, `23`–`25`, `27`–`29`) **do not exist**.

```css
/* Do */
.x { padding: var(--mtds-4); gap: var(--mtds-3); }

/* Don't */
.x { padding: 16px; }                   /* raw px */
.x { padding: var(--mtds-16); }         /* not in the scale */
```

### 5.2 Color — `--mtds-color-{role}-{variant}`

Use **palette-agnostic** tokens. They resolve against the nearest ancestor's `data-color`.

| Role | Variants |
|---|---|
| `background` | `default`, `tinted` |
| `surface` | `default`, `tinted`, `hover`, `active` |
| `border` | `subtle`, `default`, `strong` |
| `text` | `subtle`, `default` |
| `base` | `default`, `hover`, `active`, `contrast-subtle`, `contrast-default` |

Roles are **not interchangeable**: text tokens are for text, surface tokens are for surfaces, etc.

```css
/* Do — works under any data-color */
.my-very-custom-component {
  background: var(--mtds-color-surface-default);
  color:      var(--mtds-color-text-default);
  border: 1px solid var(--mtds-color-border-default);
}
```

Palette-prefixed tokens like `--mtds-color-danger-surface-tinted` exist in the CSS but **must not** be used directly. To get a danger surface, set `data-color="danger"` on a parent and use the agnostic token.

### 5.3 Typography

Prefer the components (`Heading`, `Ingress`, `Muted`, `Info`) over raw font-size tokens in markup. For custom CSS only:

```css
--mtds-font-family             /* "Mattilsynet Sans" */
--mtds-font-weight-regular     /* 400 */
--mtds-font-weight-medium      /* 500 */
--mtds-font-weight-semibold    /* 600 */
--mtds-font-weight-bold        /* 700 */
--mtds-font-size-muted         /* used by <Muted> */
--mtds-line-height-sm | -md
```

Heading sizes (`2xs`–`2xl`) and body sizes (`xs`–`xl`) are exposed via the typography components — use `<Heading data-size="lg">`, not the underlying token.

### 5.4 Other tokens

```css
--mtds-border-radius-sm | -md | -lg | -xl | -full
--mtds-border-width-default | -focus
--mtds-box-shadow-sm | -md | -lg
--mtds-icon-size               /* = --mtds-6 */
--mtds-icon-size-sm            /* = --mtds-5 */
```

### 5.5 Per-component overrides — `--mtdsc-{component}-{property-path}`

Each component exposes scoped custom properties. Discover the available ones for any component at the bottom of `mtds/ai/<name>.mdx` (the `<CssVariables component="…" />` block).

```css
.scoped { --mtdsc-button-border-color: var(--mtds-color-border-strong); }
.wide   { --mtdsc-prose-max-width: 60rem; }
```

---

## 6. App layout (page shell)

Every Mattilsynet web application/page MUST be built inside the `App` shell. It is the outermost layout that all other content lives within.

| Sub-component | Purpose |
|---|---|
| `App` | The shell. Supports `data-variant="mobilebar"` (see §6.6) |
| `App.Header` | Logo + global actions. `<Logo>` MUST be the first child |
| `App.Toggle` | Expand/minimize sidebar (also opens it as a modal on mobile) |
| `App.Sidebar` | Primary navigation. Modal on mobile, rail/expanded on desktop |
| `App.Sticky` | Scroll-direction-aware sticky wrapper for sidebar contents only |
| `App.Main` | Page content. Every leaf node MUST sit inside a `<Card>` or `<Group>` (see §6.3) |
| `App.Footer` | Optional footer |
| `App.Script` | SSR/Next.js only. Render in `<head>` to prevent FOUC (see §6.7) |

Required source order: **`App.Header` → `App.Toggle` → `App.Sidebar` → `App.Main` → `App.Footer`**.

### 6.1 Canonical composition

```tsx
import { App, Logo, Button, Popover, Avatar, Card } from '@mattilsynet/design/react';
import { BellIcon, UserIcon, SignOutIcon, GearIcon, SignatureIcon, ListChecksIcon, MagnifyingGlassIcon, PlantIcon } from '@phosphor-icons/react/ssr';

<App>
  <App.Header>
    <Logo href="/">
      <PlantIcon weight="fill" />
      Digiplant
    </Logo>
    <Button><BellIcon /></Button>
    <Button aria-label="Meny" popoverTarget="user-menu">
      <Avatar data-size="sm" />
    </Button>
    <Popover as="menu" popover="auto" id="user-menu">
      <li><Button href="/profil"><UserIcon />Profil</Button></li>
      <li><Button href="/innstillinger"><GearIcon />Innstillinger</Button></li>
      <li><Button href="/logout"><SignOutIcon />Logg ut</Button></li>
    </Popover>
  </App.Header>

  <App.Toggle />

  <App.Sidebar>
    <App.Sticky as="menu">
      <li><Button href="/soknader" aria-current="page" data-tooltip="Søknader"><SignatureIcon /></Button></li>
      <li><Button href="/behandling" data-tooltip="Behandling"><ListChecksIcon /></Button></li>
      <li><Button href="/sok" data-tooltip="Søk"><MagnifyingGlassIcon /></Button></li>
    </App.Sticky>
  </App.Sidebar>

  <App.Main>
    <Card>
      <Flex data-center="2xl" data-gap="6">
        {/* page content here — see §6.3 */}
      </Flex>
    </Card>
  </App.Main>

  <App.Footer>
    <Logo href="/" />
  </App.Footer>
</App>
```

### 6.2 Sidebar buttons MUST be icon-only

Every interactive child of `<App.Sidebar>` MUST contain **only an icon** as visible content. The textual label MUST be supplied via `data-tooltip="…"` (and `aria-label` where the icon alone is not self-descriptive).

The design system manages how labels appear: when the sidebar is minimized the tooltip is shown on hover; when expanded the design system reveals the label inline automatically. Hard-coding text inside the button breaks both states.

`<Button>` elements inside `<App.Sidebar>` are most commonly wrapped in a `<menu>` → `<li>` structure (often via `<App.Sticky as="menu">`) for vertical stacking and good accessibility.

```tsx
// Do — icon-only, label via data-tooltip
<Button href="/soknader" data-tooltip="Søknader">
  <SignatureIcon />
</Button>

// Don't — visible text inside a sidebar button
<Button href="/soknader">
  <SignatureIcon />
  Søknader
</Button>
```

### 6.3 `App.Main` content rules (the centering rule)

`<App.Main>` is a layout region, not a content surface.

- Every **leaf** node (text, heading, paragraph, raw HTML element) inside `<App.Main>` MUST be wrapped in at least one `<Card>` or `<Group>`.
- Layout primitives (`<Flex>`, `<Grid>`) MAY sit between `<App.Main>` and the `<Card>`/`<Group>` — but if you need to apply `data-center`, you must have a `<Card>` or `<Group>` as parent.
- Use `<Card>` for a single related content unit on a solid surface (e.g. one inspection, one entity detail page).
- Use `<Group>` for a collection of cards or meta-UI on a tinted surface.

```tsx
// Do
<App.Main>
  <Card>
    <Grid data-center="2xl" data-gap="6">
        <Heading as="h1" data-size="xl">Tilsyn 12345</Heading>
        <p>…</p>
      <Group>
        <Card>…</Card>
        <Card>…</Card>
      </Group>
    </Grid>
  </Card>
</App.Main>

// Do multiple Cards in Group in App.Main
<App.Main>
  <Group>
    <Prose>
      <Heading as="h1" data-size="xl">Liste over tilsyn</Heading>
      <Card>…</Card>
      <Card>…</Card>
    </Prose>
  </Group>
</App.Main>

// Don't — bare content directly in App.Main
<App.Main>
  <Heading as="h1" data-size="xl">Tilsyn 12345</Heading>
  <p>…</p>
</App.Main>

// Don't — data-center on App or App.Main
<App data-center="2xl">…</App>

// Don't — data-center on direct child of App.Main
<App><App.Main><Grid data-center="2xl"></Grid></App.Main></App>
```

### 6.4 Expand / minimize sidebar

- `<App.Toggle>` renders the standard expand/minimize button.
- Do **not** manage sidebar visibility with custom React state — always use `<App.Toggle>`.

### 6.5 Sticky sidebar content

Wrap the contents of `<App.Sidebar>` in `<App.Sticky>` to get scroll-direction-aware sticky behavior (the sidebar stays visible when scrolling up and slides away when scrolling down). `<App.Sticky>` is for sidebar contents — do not use it elsewhere.

### 6.6 Mobile bottom bar variant

```tsx
<App data-variant="mobilebar">…</App>
```

- Converts the sidebar into a mobile bottom navigation bar.
- Use only when there are 5 or fewer top-level navigation items.
- Headings, dividers, and elements with `data-app-expanded="false"` are auto-hidden in this variant.

### 6.7 SSR / Next.js

To prevent flash of unstyled content (FOUC) when the persisted expanded/minimized state is restored, render `<App.Script />` inside `<head>`:

```tsx
// app/layout.tsx (Next.js)
<html>
  <head>
    <App.Script />
  </head>
  <body>{children}</body>
</html>
```

---

## 7. Layout primitives

### 7.1 When to use which

| Component | Use when | Surface |
|---|---|---|
| `Flex`  | Children have different widths (button rows, toolbars) | none |
| `Grid`  | Children should be equal-width (card grids) or stack vertically | none |
| `Card`  | Group related content as a single unit | `surface-default` (white) |
| `Group` | Group several cards or meta-UI as a region | `background-tinted` (translucent grey) |

`Card` MAY be nested inside `Group`. Avoid `Card` inside `Card`.

### 7.2 Shared attributes — `Flex` and `Grid`

| Attribute | Values | Notes |
|---|---|---|
| `data-gap`, `data-row-gap`, `data-column-gap` | Same set as §5.1 (`0`–`15`, `18`, `22`, `26`, `30`) | Default `data-gap="3"` |
| `data-items` | `auto`, `full`, or `25`, `50`, `75`, `100`, `150`, `200`, `250`, `300`, `350`, `400`, `450`, `500` | Min child width in **px** before wrapping. `full` = single column (Flex only). `auto` = intrinsic |
| `data-align` | `normal`, `stretch`, `start`, `center`, `end` | `align-items` |
| `data-align-content` | `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` | `align-content` |
| `data-justify` | `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` | `justify-content` |
| `data-center` | `sm`, `md`, `lg`, `xl`, `2xl` | Max-width + center + side padding. |
| `data-nowrap` | boolean | Prevent wrapping |
| `data-fixed`  | boolean | Children don't grow (Flex) / `auto-fill` (Grid) |

### 7.3 Flex child attributes

| Attribute | Values | Notes |
|---|---|---|
| `data-self` | Same set as `data-items` | Min width for this child |
| `data-align-self` | `start`, `center`, `end`, `stretch` | |
| `data-justify-self` | `start`, `center`, `end` | |

### 7.4 `Card` and `Group`

| Attribute | Values | Notes |
|---|---|---|
| `data-pad` | Single index from §5.1, or `{vertical}-{horizontal}` (e.g. `4-6`) | Inner padding. Default `5`. Pair form is fluid between viewport breakpoints |
| `data-radius` | `sm`, `md`, `lg`, `xl` | Defaults: Card `lg`, Group `xl` |

`Card` only:

| Attribute | Values | Notes |
|---|---|---|
| `href` | string | Renders Card as `<a>` (whole card becomes a link) |
| `data-clickdelegatefor` | CSS selector | Click anywhere on the card triggers the matching descendant (e.g. `"#details-link"`) |

### 7.5 Quick reference

```tsx
// Page container, centered, max-width 2xl
<Card>
  <Grid data-center="2xl">
    <Heading as="h1" data-size="xl">Page title</Heading>
  </Grid>
</Card>

// Button row
<Flex>
  <Button data-variant="primary">Save</Button>
  <Button>Cancel</Button>
</Flex>

// Responsive equal-width card grid
<Grid data-items="300" data-gap="6">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>
```

---

## 8. Typography components

### 8.1 `Heading`

| Attribute | Values | Notes |
|---|---|---|
| `as` | `h1`–`h6` | **Semantic** level. Default `h2`. Always set explicitly for accessibility |
| `data-size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | **Visual** size (independent of `as`) |
| `data-justify` | `start`, `center`, `end` | Text alignment |

`Heading` auto-sizes and aligns any `<svg>` child (no inner `<Flex>` needed).

```tsx
<Heading as="h2" data-size="sm"><CheckIcon /> Approved</Heading>
```

### 8.2 `Prose`

Wraps body/editorial text and applies typographic margins to **all direct children**. Tuned for `<p>`, `<ul>`, `<ol>`, `<h1>`–`<h6>`, `<figure>`, and `<Heading>`.

- Default max-width: `45rem` (override with `--mtdsc-prose-max-width`).
- Layout primitives (`<Flex>`, `<Grid>`) inside `<Prose>` will also receive the rhythm margin — keep them outside `<Prose>` if you don't want that.

```tsx
<Prose>
  <Heading as="h2">Section</Heading>
  <p>Body text with automatic rhythm.</p>
  <ul><li>Item</li></ul>
</Prose>
```

### 8.3 `Ingress` and `Muted`

```tsx
<Ingress>Lead paragraph introducing the topic.</Ingress>
<Muted>Last updated 06.05.2026</Muted>
```

### 8.4 `Info`

Responsive label + value layout. Use for metadata, key/value pairs, or a value next to an indicator icon. Wrap the label in `<strong>`.

| Attribute | Values | Notes |
|---|---|---|
| `data-variant` | `regular` (default), `circle` | `circle` wraps the icon in a colored circle. Use only when the icon must draw visual attention; show **both** label and value |

```tsx
// Label + value
<Info><strong>Organization</strong>Fisk AS</Info>

// Icon + label + value
<Info><CheckIcon /><strong>Status</strong>Approved</Info>

// Emphasised: icon in colored circle (palette comes from ancestor data-color)
<Info data-variant="circle">
  <CheckIcon /><strong>Status</strong>Approved
</Info>
```

To color the circle, set `data-color` on an ancestor (e.g. wrap the `Info` in a `<div data-color="success">`).

---

## 9. Forms

Forms in mtds compose `<Field>` (single input row), `<Fieldset>` (grouped fields), `<Errorsummary>` (top-of-form error list), and `<Validation>` (field-level error message). The exact React export names matter — see §12.

### 9.1 `Field` — two usage modes

**Mode A (composition):** wrap children manually. Use `<Field.Label>`, `<Field.Description>`, and an `<Input>` (or other input). Use this when you need fine control.

```tsx
<Field>
  <Field.Label>Name</Field.Label>
  <Field.Description>Your full legal name.</Field.Description>
  <Input />
</Field>
```

**Mode B (polymorphic shorthand):** `<Field as="…" label="…" />` renders the complete row.

```tsx
<Field
  as="input"
  type="text"
  label="Name"
  description="Your full legal name."
  validation="Name is required."
  helpText="Enter the name as it appears on your ID."
/>

<Field as="select" label="Country" options={['Norway', 'Sweden', 'Denmark']} />

<Field
  as="textarea"
  label="Comment"
  count={500}                /* character counter */
/>

<Field
  as={Field.Suggestion}
  label="Search"
  options={[{ label: 'Oslo', value: 'oslo' }]}
/>
```

Supported `as` values: `"input"`, `"textarea"`, `"select"`, `Field.Suggestion`.

Compound members: `Field.Label`, `Field.Description`, `Field.Suggestion`, `Field.Datalist`, `Field.Option`.

### 9.2 `Fieldset` — group related fields

Use plain `<legend>` and `<Fieldset.Description>` for grouped options. There is **no** `Fieldset.Legend` component — use the native HTML `<legend>` element when composing manually, or use `<Fieldset.Legend>` only inside the React `<Fieldset>` component (it renders `<legend>`).

```tsx
<Fieldset>
  <Fieldset.Legend>Hva foretrekker du?</Fieldset.Legend>
  <Fieldset.Description>Pick one option.</Fieldset.Description>
  <Field as="input" type="radio" name="pref" label="Alternative 1" />
  <Field as="input" type="radio" name="pref" label="Alternative 2" />
</Fieldset>
```

### 9.3 `Errorsummary` — top-of-form errors

Note the spelling: `Errorsummary` (single capital R). Children are a `<Heading>` + an unordered list of in-page anchors that point to field IDs.

```tsx
import { Errorsummary, Heading } from '@mattilsynet/design/react';

<Errorsummary>
  <Heading>For å gå videre må du rette opp følgende feil:</Heading>
  <ul>
    <li><a href="#name">Name is required</a></li>
    <li><a href="#email">Email must be valid</a></li>
  </ul>
</Errorsummary>
```

Behavior rules:
- Hide the Errorsummary with `hidden` until validation fails.
- Anchor links in Errorsummary must match field `id` attributes. On click, scroll the target into view and focus it.

### 9.4 `Validation` — field-level error

Use `<Validation>` (or `<div data-field="validation">` in plain HTML) as a child of `<Field>` or `<Fieldset>`. In Mode B (`Field as="…"`), pass `validation="…"` instead.

### 9.5 `Togglegroup` — single-select toggle button row

Note the spelling: `Togglegroup` (single capital G). Compound: `Togglegroup.Item`.

```tsx
<Togglegroup data-toggle-group="View">
  <Togglegroup.Item><input type="radio" name="view" defaultChecked /> List</Togglegroup.Item>
  <Togglegroup.Item><input type="radio" name="view" /> Grid</Togglegroup.Item>
</Togglegroup>
```

### 9.6 `Fileupload` (experimental)

Note the spelling: `Fileupload`. API may change — read `fileupload.mdx` before use.

### 9.7 `HelpText`

Inline contextual help button (renders as a button that toggles a popover). Prefer passing `helpText="…"` and `helpTextLabel="…"` to `<Field>` over composing `<HelpText>` manually.

### 9.8 Worked form example

```tsx
import { useRef, useState } from 'react';
import { Button, Card, Errorsummary, Field, Fieldset, Flex, Heading } from '@mattilsynet/design/react';

function ApplicationForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summaryRef = useRef<HTMLHeadingElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!data.get('name')) next.name = 'Navn er påkrevd';
    if (!data.get('email')) next.email = 'E-post er påkrevd';
    setErrors(next);
    if (Object.keys(next).length) setTimeout(() => summaryRef.current?.focus());
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Flex data-gap="5">
          <Errorsummary hidden={!Object.keys(errors).length}>
            <Heading ref={summaryRef} tabIndex={-1}>
              For å gå videre må du rette opp følgende feil:
            </Heading>
            <ul>
              {errors.name && <li><a href="#name">{errors.name}</a></li>}
              {errors.email && <li><a href="#email">{errors.email}</a></li>}
            </ul>
          </Errorsummary>

          <Field as="input" id="name"  name="name"  label="Navn"   validation={errors.name} />
          <Field as="input" id="email" name="email" label="E-post" type="email" validation={errors.email} />

          <Fieldset>
            <Fieldset.Legend>Foretrukket kontakt</Fieldset.Legend>
            <Field as="input" type="radio" name="contact" label="E-post" defaultChecked />
            <Field as="input" type="radio" name="contact" label="Telefon" />
          </Fieldset>

          <Button type="submit" data-variant="primary">Send inn</Button>
        </Flex>
      </form>
    </Card>
  );
}
```

---

## 10. Worked page example

```tsx
import { Flex, Grid, Card, Heading, Prose, Muted, Button, Tag } from '@mattilsynet/design/react';
import { WarningIcon } from '@phosphor-icons/react/ssr';

export function InspectionsPage() {
  return (
    <App.Main>
      <Group>
        <Prose>
          <Heading as="h1" data-size="xl">Inspections</Heading>
          {/* Compact toolbar — density cascades */}
          <Flex>
            <Button data-variant="primary">New</Button>
            <Button>Export</Button>
          </Flex>

          <Grid data-items="300" data-gap="6">
            <Card>
              <Prose>
                <Heading as="h2" data-size="sm">Fisk AS</Heading>
                <Tag data-color="success">Approved</Tag>
                <Muted>Inspected 03.05.2026</Muted>
              </Prose>
            </Card>

            {/* Single attribute switches whole card to red */}
            <Alert data-color="danger">
              <Prose>
                <Heading as="h2" data-size="sm"><WarningIcon /> Kjøtt &amp; Co</Heading>
                <p>Critical violations. Follow up within 14 days.</p>
              </Prose>
              <Button data-variant="primary">Follow up</Button>
            </Alert>
          </Grid>
        </Prose>
      </Group>
    </App.Main>
  );
}
```

---

## 11. Figma → code & pre-return checklist

When the input is a Figma frame/sketch, treat the design as a binding spec for *which design system components to use*, not just a pixel target.

### 11.1 Figma component names map 1:1 to mtds component names

A Figma instance named **Card** → `<Card>`. **Field** → `<Field>`. **Errorsummary** → `<Errorsummary>`. **Info** → `<Info>`. Look up the Figma component name in §12 and use the matching React component. There is no name remapping table — if the names differ, the Figma library is out of date; ask before guessing.

### 11.2 Mapping rules

- Map every visible Figma component instance to its corresponding component from `@mattilsynet/design/react`. Do **not** substitute custom HTML/CSS to gain layout control.
- Do **not** reach for raw `<div>`/`<span>` + CSS when a design system component covers the case — even if the component feels harder to make responsive. First try the component plus a wrapper (`Flex`, `Grid`, `Card`) and/or token-based CSS.
- **Auto-layout:** if children of a Figma auto-layout have equal width or width "fill", prefer `<Grid>` over `<Flex>`.
- **Metadata** (icon + value, or label + value): MUST use `<Info>` whenever Figma uses an `Info` instance, or whenever the content shape is icon + value or label + value. Custom `<span>`/`<div>` structures for metadata are not allowed unless the user explicitly approves the deviation.
- **Headings:** any Figma text styled as a heading → `<Heading as="hN" data-size="…">`, never raw `<h1>`–`<h6>` or styled `<div>`.
- **Lead/intro text** → `<Ingress>`. **Secondary/meta text** → `<Muted>`.
- **Surface containers:** Figma "Card" → `<Card>`; Figma tinted region grouping cards → `<Group>`.
- **Buttons, Tags, Chips, Alerts, Tabs, Steps, Dialog, Popover, Table, Field/Fieldset, Errorsummary** → use the matching component from §12. Do not reimplement.
- **Color regions:** when a Figma frame is in a semantic color (danger/warning/success/info/inverted), set `data-color="…"` on a parent rather than picking palette-prefixed tokens.
- If you genuinely believe a deviation is required (e.g. the component cannot express the intended behavior), **STOP**. Explain the deviation and the proposed alternative **before** writing code, and wait for explicit approval.
- If the sketch is unclear (text unreadable, intent unknown, missing state), list assumptions explicitly at the top of your final answer.

### 11.3 Pre-return checklist

Before sending the final response, verify every item:

**Imports & setup**
- [ ] React components imported from `@mattilsynet/design/react`; icons from `@phosphor-icons/react/ssr`.
- [ ] Entry file imports `'@mattilsynet/design'` and `'@mattilsynet/design/styles.css'`.
- [ ] Exact export names spelled correctly: `Errorsummary`, `Togglegroup`, `Fileupload`, `HelpText`.

**Spacing, color, sizing**
- [ ] No raw `px`/`rem` for spacing — only `data-gap`, `data-pad`, or `var(--mtds-{n})` from the §5.1 scale.
- [ ] No hex/rgb/named colors — only `var(--mtds-color-*)` (palette-agnostic) under the right `data-color` parent.
- [ ] No inline `style={{…}}` for layout/color/spacing.
- [ ] No Tailwind utility classes.
- [ ] All spacing-token indexes used exist (`0`–`15`, `18`, `22`, `26`, `30`).
- [ ] `data-size` collisions accounted for (density on containers vs. local size on `Heading`/`Button`/`Info`).

**Markup**
- [ ] No raw `<h1>`–`<h6>` — every heading is `<Heading as="hN">`.
- [ ] No raw `<div style="display:flex">` — use `<Flex>` or `<Grid>`.
- [ ] Metadata pairs (icon + value / label + value) use `<Info>`, not custom `<span>`/`<div>`.

**App shell**
- [ ] `<App>` wraps the page; source order `Header → Toggle → Sidebar → Main → Footer`.
- [ ] Every leaf node inside `<App.Main>` is wrapped in `<Card>` or `<Group>`.
- [ ] `<Logo>` is the first child of `<App.Header>`.
- [ ] Sidebar buttons are icon-only with `data-tooltip="Label"`.
- [ ] Sidebar state uses `<App.Toggle>` and `<App.Sidebar>`

**Figma audit (when converting from a sketch)**
- [ ] Every visible Figma component instance is mapped to its `@mattilsynet/design/react` counterpart, or listed as an explicit, approved deviation.

---

## 12. Component index

Each component has full docs at `@mattilsynet/design/mtds/ai/<name>.mdx` and examples in `@mattilsynet/design/mtds/ai/<name>.stories.tsx`. Read the relevant doc before using a component you have not used in this session.

### Layout & structure

- **`App`** — page shell with `Header`, `Toggle`, `Sidebar`, `Sticky`, `Main`, `Footer`, `Script`. See §6.
- **`Card`** — solid white surface for one related content unit. `data-pad`, `data-radius`, `href`, `data-clickdelegatefor`. See §7.4.
- **`Group`** — tinted surface for a region of cards or meta-UI. Same attrs as `Card`. See §7.4.
- **`Flex`** — flex container for mixed-width children (toolbars, button rows). See §7.2.
- **`Grid`** — grid container for equal-width columns or vertical stacks. Use `data-items="300"` for responsive. See §7.2.
- **`Divider`** — visual separator (`<hr>` styling).

### Typography

- **`Heading`** — `as="h1".."h6"` for semantics, `data-size="2xs".."2xl"` for visual size. See §8.1.
- **`Prose`** — apply vertical typographic rhythm to direct children (body text, lists, headings). See §8.2.
- **`Ingress`** — lead/intro paragraph. See §8.3.
- **`Muted`** — small/secondary text. See §8.3.
- **`Info`** — label + value pair, optionally with icon. `data-variant="regular│circle"`. See §8.4.
- **`Link`** — inline anchor styled to mtds.

### Forms (see §9)

- **`Field`** — single field row. Two modes: composition (`<Field.Label>`+`<Input>`) or polymorphic (`<Field as="input" label="…" />`). Compound: `Label`, `Description`, `Suggestion`, `Datalist`, `Option`.
- **`Fieldset`** — group related fields. Compound: `Legend`, `Description`.
- **`Input`** — form control primitive (`<input>`, used inside `<Field>`).
- **`Validation`** — field-level validation message. Pass via `validation="…"` on `<Field as="…">`, or render directly inside `<Field>`.
- **`Errorsummary`** — top-of-form error list (note: single capital R). Children: `<Heading>` + `<ul><li><a href="#fieldId">`. See §9.3.
- **`Togglegroup`** — single-select toggle button row (single capital G). Compound: `Item`. See §9.5.
- **`Fileupload`** — file upload (experimental). See §9.6.
- **`HelpText`** — popover-style help button. Prefer `<Field helpText="…" />`. See §9.7.

### Actions

- **`Button`** — primary action element. Renders `<a>` when `href` is set. Variants: `data-variant="primary│secondary│tertiary"`. Sizes via `data-size` on the button or its container.
- **`Chip`** — interactive filter chip / single-select toggle.

### Feedback & status

- **`Alert`** — inline contextual feedback. Color via ancestor `data-color="info│success│warning│danger"`.
- **`Badge`** — small status indicator overlay (count, dot) on top of another element.
- **`Progress`** — progress bar.
- **`Skeleton`** — loading placeholder block.
- **`Spinner`** — loading spinner.
- **`Tag`** — read-only label/keyword. Color via `data-color`.
- **`Toast`** — transient notification (managed via toast helpers).

### Navigation

- **`Breadcrumbs`** — breadcrumb trail.
- **`Pagination`** — paged result navigation.
- **`Steps`** — multi-step progress / timeline. Children are `<li>` with `<mark>`, `<strong>`, optional `<small>`. Set `aria-current="step"` on the active `<li>`. State via `data-state="complete"` on the `<ol>`/`<Steps>`.
- **`Tabs`** — tabbed content panels. Compound: `List`, `Tab`, `Panel`.

### Display

- **`Avatar`** — round user avatar.
- **`Chart`** — chart wrapper.
- **`Details`** — disclosure widget. Compound: `Summary`.
- **`Dialog`** — modal dialog using native `<dialog>`. Open with `command="show-modal"` + `commandfor="id"`; close with `command="request-close"`.
- **`Popover`** — non-modal floating overlay using native popover API. Polymorphic via `as` (commonly `as="menu"`). Anchor with `popoverTarget="id"` on the trigger.
- **`Table`** — data table. Compound: `Thead`, `Tbody`, `Tr`, `Th`, `Td`, `ThSortable`.
- **`Tooltip`** — prefer `data-tooltip="…"` on any element instead of a component.

### Domain & branding

- **`Law`** — Mattilsynet legal-text formatting.
- **`Logo`** — Mattilsynet (or sub-app) logo. Required as the first child of `<App.Header>`.
- **`Print`** — print-only utilities and breaks.

### Map and Charts

- **`Atlas`** — interactive map.
- **`Chart`** — chart primitives.
