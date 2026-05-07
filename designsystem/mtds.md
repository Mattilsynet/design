# @mattilsynet/design — LLM Reference

You are a senior frontend engineer that converts Figma sketches/screenshots into production-ready React code using the `@mattilsynet/design` (mtds) design system.
You make no assumptions and create no new components, since you have full knowledge of this design system reference file mtds.md.
Treat the rules as binding RFC-2119 keywords (**MUST**, **MUST NOT**, **SHOULD**, **MAY**).

Use **components** from `@mattilsynet/design/react`, **attributes** (`data-*`) for variants and density, and **CSS tokens** (`--mtds-*`) for any custom styling. Never use raw `px`, hex colors, or inline `style` for layout/spacing/color. Avoid creating new class names unless strictly necessary.


## 0. Canonical imports

```ts
// In your application entry file, ONCE:
import '@mattilsynet/design';
import '@mattilsynet/design/styles.css';
```

```tsx
// In any file that uses components:
import { Button, Flex, Heading /* ... */ } from '@mattilsynet/design/react';
import { CheckIcon /* ... */ } from '@phosphor-icons/react/ssr';
```

The package ships React components, web components, and class names. In React projects, always use `@mattilsynet/design/react`. In non-React markup, use the equivalent class name (e.g. `<button class="button">` instead of `<Button>`).

---

## 1. Mandate

1. **MUST** import `'@mattilsynet/design'` and `'@mattilsynet/design/styles.css'` once in the entry file.
3. **MUST NOT** set `data-color-scheme` on `<html>`.
4. **MUST** import React components from `@mattilsynet/design/react` and icons from `@phosphor-icons/react/ssr`.
5. **MUST NOT** use raw `px`, `rem`, hex, `rgb()`, named colors, inline `style`, or Tailwind utilities for layout, spacing, color, radius, or typography. Use design tokens or component attributes.
2. **MUST** use the `App` component to create the app shell / page layout (see §6).
6. **MUST NOT** create a new container component if `Card`, `Group`, `Flex`, or `Grid` already cover the case.
7. **MUST NOT** write raw `<h1>`–`<h6>`. Use `<Heading as="h1">` etc.
8. **SHOULD** read `@mattilsynet/design/mtds/ai/<name>.mdx` (and `<name>.stories.tsx`) before using a component you have not used in this session.
9. **SHOULD**, for genuinely custom CSS, use a regular CSS file or CSS Module that references `--mtds-*` tokens — never inline `style`.

Verify all requirements with the **§11 checklist** before returning code.

---

## 2. Forbidden patterns (read before generating)

| Don't | Do |
|---|---|
| `style={{…}}` for layout, spacing, or color | Use a layout component, `data-*` attribute, or token in CSS |
| `className="p-4 gap-3 text-red-500"` (Tailwind) | Layout components + tokens |
| Hex / `rgb()` / named colors (`#c83719`, `red`) | `var(--mtds-color-…)` under the appropriate `data-color` parent |
| Raw `px`/`rem` for spacing (`padding: 16px`) | `var(--mtds-4)`, or `data-gap` / `data-pad` on a layout component |
| `<div style="display:flex">` | `<Flex>` |
| `<h2>Title</h2>` | `<Heading as="h2">Title</Heading>` |
| `<small>helper</small>`, `<p style="font-size:1.3em">` | `<Muted>`, `<Ingress>` |
| Made-up tokens: `var(--mtds-16)`, `var(--mtds-20)` | Snap to nearest existing token (see §5.1) |
| Hard-coded palette token: `var(--mtds-color-danger-base-default)` | Set `data-color="danger"` on a parent and use the palette-agnostic token (`var(--mtds-color-base-default)`) |

---

## 3. Decision tree (intent → component)

| You need to… | Use |
|---|---|
| Lay out items horizontally with mixed widths | `<Flex>` |
| Lay out items in equal-width columns or stack vertically | `<Grid>` |
| Group related content on a solid surface | `<Card>` |
| Group several cards or widgets on a tinted surface | `<Group>` |
| Wrap body/editorial text and get vertical rhythm | `<Prose>` |
| Render a heading | `<Heading as="hN" data-size="…">` |
| Render lead/intro text | `<Ingress>` |
| Render small/secondary text | `<Muted>` |
| Render a label + value pair (optionally with icon) | `<Info>` |
| Trigger an action | `<Button>` (renders `<a>` when `href` is present) |
| Navigate to another URL inline in text | `<Link>` |
| Show a form field (label + input + validation) | `<Field>` wrapping `<Input>` |
| Group several related form fields | `<Fieldset>` |
| Show validation errors at the top of a form | `<ErrorSummary>` |
| Show a modal | `<Dialog>` |
| Show a non-modal floating overlay anchored to a trigger | `<Popover>` (native popover API) |
| Show a tooltip on an element | `data-tooltip="…"` on the element |
| Show inline contextual feedback (info/success/warning/danger) | `<Alert>` |
| Tabular data | `<Table>` |
| Tabbed content panels | `<Tabs>` |
| Multi-step progress / timeline | `<Steps>` |
| Read-only label/keyword | `<Tag>` |
| Status indicator on top of another element | `<Badge>` |
| Single-select toggle button group / interactive filter chip | `<Chip>` or `<ToggleGroup>` |
| Switch palette for a region | `data-color="…"` on any ancestor |
| Switch density for a region | `data-size="sm│md│lg"` on a layout container |
| Add a tooltip | `data-tooltip="…"` on the element |

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

> ⚠ **Name collision.** On `Heading`, `Button`, `Info`, and several other components, `data-size` is a **component-local visual size** (e.g. `2xs`–`2xl` on `Heading`), not density. Always check the component's doc. **MUST NOT** use `data-size` to change font-size on plain HTML elements — wrap in `<Heading>`, `<Ingress>`, or `<Muted>` instead.

### 4.3 `data-tooltip` — tooltip text

Place on any element. Tooltip text is automatically exposed to assistive tech. Use `data-tooltip-position="top│right│bottom│left"` to reposition.

```tsx
<Button data-tooltip="Save your changes">Save</Button>
```

---

## 5. Token system

Tokens are namespaced `--mtds-*` (system) and `--mtdsc-*` (per-component override). All pixel values are **informative only** — the scale is fluid (resizes with density and root font-size). Always reference the token, never the literal value.

### 5.1 Spacing — `--mtds-{n}`

Spacing tokens **MUST NOT** be used, if layout primitives (`Flex`, `Grid`, `Card` or `Group` (see §7)) with corresponding `data-gap`, `data-pad` or `data-items` can be used. You **MUST NOT** set `margin` - prefer `data-gap` or `data-pad` for spacing whenever possible. Valid `n` values: **`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30`** (note the gap above 15). At default density, `n × 4 ≈ pixels`. Other indexes (`16`, `17`, `19`, `20`–`21`, `23`–`25`, `27`–`29`) **do not exist**.

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

Palette-prefixed tokens like `--mtds-color-danger-surface-tinted` exist in the CSS but **MUST NOT** be used directly. To get a danger surface, set `data-color="danger"` on a parent and use the agnostic token.

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

Every Mattilsynet web application/page **MUST** be built inside the `App` shell. It is the outermost layout that all other content lives within. The shell provides:

- `<App>` — the outer wrapping component
- `<App.Header>` — top header with logo and global actions (notifications, user menu)
- `<App.Toggle>` — must be placed before `<App.Sidebar>` to enable sidebar collapsing
- `<App.Sidebar>` — collapsible left sidebar (modal on mobile, persistent rail on desktop)
- `<App.Sticky>` — scroll-direction-aware sticky wrapper, used as a direct child of `<App.Sidebar>` to wrap its contents
- `<App.Main>` — the main content area
- `<App.Footer>` — optional footer (rarely used)
- The outer `<App>` accepts `data-variant="mobilebar"` for a mobile bottom-bar variant

### 6.1 Composition (canonical)

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
    <Card>{/* page content here — see §6.4 */}</Card>
  </App.Main>

  <App.Footer>
    <Logo href="/" />
  </App.Footer>
</App>
```

The required source order is **`App.Header` → `App.Toggle` → `App.Sidebar` → `App.Main` → `App.Footer`**.

### 6.2 Sub-component reference

| Component | Renders | Purpose |
|---|---|---|
| `App` | `<div class="app">` | The shell. Supports `data-variant="mobilebar"` (see §6.7) |
| `App.Header` | `<header>` | Logo + global actions. `<Logo>` **MUST** be the first child |
| `App.Toggle` | `<button>` | Expand/minimize sidebar (also opens it as a modal on mobile) |
| `App.Sidebar` | `<dialog role="navigation" id="mtds-sidebar">` | Primary navigation. Modal on mobile, rail/expanded on desktop |
| `App.Sticky` | `<div>` (polymorphic via `as`) | Scroll-direction-aware sticky wrapper inside `App.Sidebar` |
| `App.Main` | `<main>` | Page content. Every leaf content node **MUST** sit inside a `<Card>` or `<Group>` (see §6.4) |
| `App.Footer` | `<footer>` | Optional footer |
| `App.Script` | inline `<script>` | SSR/Next.js only. Render in `<head>` to prevent FOUC (see §6.8) |

### 6.3 Sidebar buttons MUST be icon-only

Every interactive child of `<App.Sidebar>` (button or link) **MUST** contain **only an icon** as visible content. The textual label **MUST** be supplied via `data-tooltip="…"` (and `aria-label` where the icon alone is not self-descriptive).

This is required because the design system manages how labels appear: when the sidebar is minimized the tooltip is shown on hover; when expanded the design system reveals the label inline automatically. Hard-coding text inside the button breaks both states.

`<Button>` elements inside `<App.Sidebar>` are most commonly wrapped in a `<menu>` → `<li>` structure (often via `<App.Sticky as="menu">`) for vertical stacking and good accessibility.

```tsx
// Do — icon-only, label via data-tooltip
<Button href="/soknader" aria-current="page" data-tooltip="Søknader">
  <SignatureIcon />
</Button>

// Don't — visible text inside a sidebar button
<Button href="/soknader">
  <SignatureIcon />
  Søknader
</Button>
```

### 6.4 `App.Main` content have direct child `Group` or `Card`, or `Flex` or `Grid` with `Card` or `Group` inside

`<App.Main>` is a layout region, not a content surface. You **MUST NOT** place bare text, headings, paragraphs, or raw elements as **leaf** content directly inside it. Every leaf node **MUST** be inside at least one `<Card>` or `<Group>`.
You **MUST NOT** use `data-center` on a direct child of `<App.Main>` - if you need to center content, you **MUST** do so within a `<Group>` or `<Card>`

Layout primitives (`<Flex>`, `<Grid>`) **MAY** sit between `<App.Main>` and the `<Card>`/`<Group>` — typically to apply `data-center` and `data-gap`.

- Use `<Card>` for a single related content unit on a solid surface (e.g. one inspection, one entity detail page).
- Use `<Group>` for a collection of cards or meta-UI on a tinted surface.

```tsx
// Do
<App.Main>
  <Flex data-center="2xl" data-gap="6">
    <Card>
      <Heading as="h1" data-size="xl">Tilsyn 12345</Heading>
      <p>…</p>
    </Card>
    <Group>
      <Card>…</Card>
      <Card>…</Card>
    </Group>
  </Flex>
</App.Main>

// Don't — bare content directly in App.Main
<App.Main>
  <Heading as="h1" data-size="xl">Tilsyn 12345</Heading>
  <p>…</p>
</App.Main>
```

Page-level centering (`data-center="2xl"`) **MUST** be applied **inside** `<App.Main>` (typically on a `<Flex>` or `<Grid>` that holds the cards), never on `<App>` itself.

### 6.5 Expand / minimize sidebar

- `<App.Toggle>` renders the standard expand/minimize button.
- You **SHOULD NOT** manage sidebar visibility with custom React state — always use `<App.Toggle>` (or `toggleAppExpanded()`).

### 6.6 Sticky sidebar content

Wrap the contents of `<App.Sidebar>` in `<App.Sticky>` to get scroll-direction-aware sticky behavior (the sidebar stays visible when scrolling up and slides away when scrolling down). `<App.Sticky>` is for sidebar contents — do not use it elsewhere in the layout.

### 6.7 Mobile bottom bar variant

```tsx
<App data-variant="mobilebar">…</App>
```

- Converts the sidebar into a mobile bottom navigation bar.
- **SHOULD** only be used when there are 5 or fewer top-level navigation items.
- Headings, dividers, and elements with `data-app-expanded="false"` are auto-hidden in this variant.

### 6.8 SSR / Next.js

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

### 6.9 Rules summary

- You **MUST** use `<App>` as the outermost layout for any new Mattilsynet application page.
- You **MUST** use `<App.Sidebar>` for primary navigation — never a plain `<aside>` or `<nav>`.
- You **MUST** place `<App.Toggle>` before `<App.Sidebar>` in source order.
- You **MUST** make every interactive child of `<App.Sidebar>` icon-only and provide its label via `data-tooltip` (see §6.3).
- You **MUST** keep every leaf content node inside `<App.Main>` wrapped in at least one `<Card>` or `<Group>` (see §6.4).
- You **MUST** use `<Logo>` as the first child of `<App.Header>`.
- You **MUST NOT** wrap `<App>` in `<Flex>`, `<Grid>`, or any layout primitive — the shell sets its own grid.
- You **MUST NOT** apply `data-center` to `<App>` itself — apply it inside `<App.Main>` instead.
- You **SHOULD** use `<App.Toggle>` or `toggleAppExpanded()` for sidebar state — never custom React state.
- (Next.js / SSR) You **SHOULD** render `<App.Script />` inside `<head>` to prevent FOUC.

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
| `data-center` | `sm`, `md`, `lg`, `xl`, `2xl` | Max-width + center + side padding. Use on the page-level container |
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
<Flex data-center="2xl">
  <Heading as="h1" data-size="xl">Page title</Heading>
</Flex>

// Button row
<Flex data-gap="3" data-align="center">
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

## 9. Worked example

```tsx
import { Flex, Grid, Card, Heading, Prose, Muted, Button, Tag } from '@mattilsynet/design/react';
import { WarningIcon } from '@phosphor-icons/react/ssr';

export function InspectionsPage() {
  return (
    <Flex data-center="2xl" data-gap="6">
      <header data-color="inverted">
        <Flex data-pad="3"><Heading as="h1" data-size="xl">Inspections</Heading></Flex>
      </header>

      {/* Compact toolbar — density cascades */}
      <Flex data-size="sm" data-gap="3">
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
        <Card data-color="danger">
          <Prose>
            <Heading as="h2" data-size="sm"><WarningIcon /> Kjøtt &amp; Co</Heading>
            <p>Critical violations. Follow up within 14 days.</p>
          </Prose>
          <Button data-variant="primary">Follow up</Button>
        </Card>
      </Grid>
    </Flex>
  );
}
```

---

## 10. Figma → code

When the input is a Figma frame/sketch, treat the design as a binding spec for *which design system components to use*, not just a pixel target.

### 10.1 Component mapping is mandatory

1. **MUST** map every visible Figma component instance in the area to its corresponding component from `@mattilsynet/design/react` is possible. Do **not** substitute custom HTML/CSS to gain layout control.
2. **MUST NOT** reach for raw `<div>`/`<span>` + CSS when a design system component covers the case — even if the component feels harder to make responsive. First try the component plus a wrapper (`Flex`, `Grid`, `Card`) and/or token-based CSS.
3. If you genuinely believe a deviation is required (e.g. the component cannot express the intended behavior), **STOP**. Explain the deviation and the alternative you propose **before** writing code, and wait for explicit approval.

### 10.2 Specific mapping rules
- **Auto-layout** if child compeonents of a Figma auto-layout has equal width, of width "fill", prefer `<Grid>` over `<Flex>`
- **Metadata in lists / cards** (icon + value, or label + value): **MUST** use `<Info>` whenever Figma uses an `Info` instance, **or** whenever the content shape is icon + value or label + value. Custom `<span>`/`<div>` structures for metadata are **not allowed** unless the user explicitly approves the deviation.
- **Headings:** any Figma text styled as a heading → `<Heading as="hN" data-size="…">`, never raw `<h1>`–`<h6>` or styled `<div>`.
- **Lead/intro text** → `<Ingress>`. **Secondary/meta text** → `<Muted>`.
- **Surface containers:** Figma "Card" → `<Card>`; Figma tinted region grouping cards → `<Group>`.
- **Buttons, Tags, Chips, Alerts, Tabs, Steps, Dialog, Popover, Table, Field/Fieldset, ErrorSummary** → use the matching component from the §12 index. Do not reimplement.
- **Color regions:** when a Figma frame is in a semantic color (danger/warning/success/info/inverted), set `data-color="…"` on a parent rather than picking palette-prefixed tokens.

### 10.3 Verification before returning code

Before sending the final response after a design-to-code task, perform a mapping audit:

1. List every visible component instance from the Figma context.
2. For each one, name the design system component used in the generated code.
3. If any Figma instance is **not** mapped to its design system equivalent, list it as an explicit deviation with a reason — or fix the code.

This audit is in addition to the §11 checklist; both must pass.

If the sketch is unclear (text unreadable, intent unknown, missing state), list assumptions explicitly at the top of your final answer.

---

## 11. Pre-return checklist

- [ ] No raw `px`/`rem` for spacing — only `data-gap`, `data-pad`, or `var(--mtds-{n})` from the §5.1 scale.
- [ ] No hex/rgb/named colors — only `var(--mtds-color-*)` (palette-agnostic) under the right `data-color` parent.
- [ ] No inline `style={{…}}` for layout/color/spacing.
- [ ] No Tailwind utility classes.
- [ ] No raw `<h1>`–`<h6>` — every heading is `<Heading as="hN">`.
- [ ] No raw `<div style="display:flex">` — use `<Flex>` or `<Grid>`.
- [ ] All spacing-token indexes used exist (`0`–`15`, `18`, `22`, `26`, `30`).
- [ ] React components imported from `@mattilsynet/design/react`; icons from `@phosphor-icons/react/ssr`.
- [ ] Entry file imports `'@mattilsynet/design'` and `'@mattilsynet/design/styles.css'`.
- [ ] `data-size` collisions accounted for (density on containers vs local size on `Heading`/`Button`/`Info`).
- [ ] Every visible Figma component instance is mapped to its `@mattilsynet/design/react` counterpart, or listed as an explicit, approved deviation.
- [ ] Metadata pairs (icon + value / label + value) use `<Info>`, not custom `<span>`/`<div>`.

---

## 12. Component index

Each component has full docs at `@mattilsynet/design/mtds/ai/<name>.mdx` and examples in `@mattilsynet/design/mtds/ai/<name>.stories.tsx`. **Read the relevant doc before using a component you have not used in this session.**

**Layout & structure:** `app`, `card` (Card, Group), `divider`, `layout` (Flex, Grid), `print`

**Typography:** `typography` (Heading, Prose, Ingress, Muted, Info), `link`

**Forms:** `field`, `fieldset`, `input`, `fileupload`, `helptext`, `togglegroup`, `validation`, `errorsummary`

**Actions:** `button`, `chip`

**Feedback & status:** `alert`, `badge`, `progress`, `skeleton`, `spinner`, `tag`, `toast`

**Navigation:** `breadcrumbs`, `pagination`, `steps`, `tabs`

**Display:** `avatar`, `chart`, `details`, `dialog`, `popover`, `table`, `tooltip`

**Domain & branding:** `law`, `logo`
