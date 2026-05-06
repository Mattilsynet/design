# @mattilsynet/design — LLM Reference

You are writing code that uses the design system **@mattilsynet/design**.
Follow the rules below. They use RFC-2119 keywords (**MUST**, **MUST NOT**, **SHOULD**, **MAY**) so they can be applied without ambiguity.

---

## 0. TL;DR for agents (read first)

Non-negotiable rules. Violating any of these is a bug:

1. Import `@mattilsynet/design` and `@mattilsynet/design/styles.css` **once** in the application entry file.
2. Import React components from `@mattilsynet/design/react`. Import icons from `@phosphor-icons/react/ssr`.
3. Never use raw `px`/`rem`/hex/rgb, inline `style` for layout/color/spacing, or Tailwind utilities. Use design tokens (`var(--mtds-*)`) and component attributes only.
4. Never use raw `<h1>`–`<h6>`, `<div style="display:flex">`, `<small>`, or hand-rolled grids for application pages. Use `<Heading>`, `<Flex>`/`<Grid>`, `<Muted>`, `<App>`.
5. Wrap every Mattilsynet application page in `<App>` and its sub-components.
6. All UI text **MUST** be in Norwegian Bokmål.
7. For project-specific custom CSS, use a `<style>` tag (scoped to the component as needed) referencing `--mtds-*` / `--mtdsc-*` tokens. Do not introduce CSS-in-JS, Tailwind, or external stylesheets.

### Manifest (machine-readable)

```
PACKAGE:        @mattilsynet/design
REACT_IMPORT:   @mattilsynet/design/react
ICON_IMPORT:    @phosphor-icons/react/ssr
CSS_IMPORT:     @mattilsynet/design/styles.css
DOCS_PATH:      @mattilsynet/design/ai/<component>.mdx
STORIES_PATH:   @mattilsynet/design/ai/<component>.stories.tsx
SPACING_SCALE:  0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,22,26,30
PALETTES:       main,neutral,success,info,warning,danger,inverted
DENSITIES:      sm,md,lg
HEADING_SIZES:  2xs,xs,sm,md,lg,xl,2xl
COLOR_SCHEMES:  auto,light,dark
```

---

## 1. Mandate

1. You **MUST** import the stylesheet and register the package **once** in the application entry file:
   ```ts
   import '@mattilsynet/design';
   import '@mattilsynet/design/styles.css';
   ```
2. You **MUST** import React components from `@mattilsynet/design/react`.
3. You **MUST** import React icons from `@phosphor-icons/react/ssr` (the `/ssr` path works in both server and client components). If `@phosphor-icons/react` is missing in `package.json`, install it via `npm i @phosphor-icons/react --save`.
4. You **MUST NOT** invent spacing, color, radius, or typography with raw `px`/`rem`/hex/rgb values, inline `style`, or Tailwind utilities. Use design tokens (`var(--mtds-*)`) or component attributes.
5. You **MUST NOT** create a new generic container component if `Card`, `Group`, `Flex`, or `Grid` already cover the case.
6. If you need project-specific custom styling, you **SHOULD** write plain HTML and add a `<style>` tag in the same file/component that references `--mtds-*` / `--mtdsc-*` tokens. Do not use inline `style={{…}}`, CSS-in-JS, or Tailwind.
7. Before using a component, you **SHOULD** read its full doc at `@mattilsynet/design/ai/<component>.mdx` and the related examples in `@mattilsynet/design/ai/<component>.stories.tsx`.
8. You **MUST** wrap any new Mattilsynet application/page in the `App` shell (`<App>` + sub-components). See §5.
9. All user-facing text **MUST** be in Norwegian Bokmål.

### Required imports (canonical block)

```tsx
// In your application entry file, ONCE:
import '@mattilsynet/design';
import '@mattilsynet/design/styles.css';

// In any file that uses the components:
import { NameOfComponent } from '@mattilsynet/design/react';
import { NameOfIcon } from '@phosphor-icons/react/ssr';
```

### Custom CSS (when truly needed)

```tsx
function MyWidget() {
  return (
    <>
      <div className="my-widget">…</div>
      <style>{`
        .my-widget {
          padding: var(--mtds-4);
          background: var(--mtds-color-surface-default);
          border-radius: var(--mtds-border-radius-md);
        }
      `}</style>
    </>
  );
}
```

---

## 2. Quick decision tree

| You need to… | Use |
|---|---|
| Build the page shell (header, sidebar, main, footer) for a new application | `<App>` and sub-components (§5) |
| Lay out items horizontally with mixed widths | `<Flex>` |
| Lay out items in equal-width columns or stack vertically | `<Grid>` |
| Group related content on a solid surface (white card) | `<Card>` |
| Group several cards/widgets on a tinted surface | `<Group>` |
| Wrap body/editorial text and get vertical rhythm | `<Prose>` (in `typography`) |
| Render a heading | `<Heading as="hN" data-size="…">` |
| Render lead/intro text | `<Ingress>` |
| Render small/secondary text | `<Muted>` |
| Render a label + value pair (optionally with icon) | `<Info>` (in `typography`) |
| Trigger an action | `<Button>` (renders `<a>` when `href` is present) |
| Navigate to another URL inline in text | `<Link>` |
| Show a form field (label + input + validation) | `<Field>` wrapping `<Input>` |
| Group several related form fields | `<Fieldset>` |
| Show validation errors at the top of a form | `<ErrorSummary>` |
| Show a modal | `<Dialog>` |
| Show a non-modal floating overlay anchored to a trigger | `<Popover>` (native popover API) |
| Show a tooltip on an element | `data-tooltip="…"` on the element |
| Show inline contextual feedback (info/success/warning/danger) | `<Alert>` |
| Show a transient notification | `<Toast>` |
| Tabular data | `<Table>` |
| Tabbed content panels | `<Tabs>` |
| Multi-step progress / timeline | `<Steps>` |
| Read-only label/keyword | `<Tag>` |
| Status indicator on top of another element | `<Badge>` |
| Single-select toggle button group / interactive filter chip | `<Chip>` or `<ToggleGroup>` |
| Switch palette for a region | `data-color="…"` on any ancestor |
| Switch density for a region | `data-size="sm│md│lg"` on any ancestor |

> **Tag vs Badge vs Chip — common confusion:**
> - `Tag` = read-only static label (e.g. "Approved").
> - `Badge` = numeric small status indicator attached to another element (e.g. notification count on a bell icon).
> - `Chip` = interactive, toggleable filter/selection.

> **Alert vs Toast:** `Alert` is part of the page (persistent, in-flow). `Toast` is transient (auto-dismisses).

---

## 3. Token system (CSS custom properties)

All tokens are namespaced `--mtds-*` (system) and `--mtdsc-*` (per-component override).
You **SHOULD** treat the pixel values shown as informative only — always reference the token, never the literal value.

### 3.1 Spacing — `--mtds-{n}`

Use for `gap`, `padding`, `margin`, and any spatial `width`/`height`.
**Rule:** the only valid indexes are `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30`. Tokens `--mtds-16`, `--mtds-20`, `--mtds-24` do **not** exist.

| Token | ≈ px |
|---|---|
| `--mtds-0` | 0 |
| `--mtds-1` | 4 |
| `--mtds-2` | 8 |
| `--mtds-3` | 12 |
| `--mtds-4` | 16 |
| `--mtds-5` | 20 |
| `--mtds-6` | 24 |
| `--mtds-7` | 28 |
| `--mtds-8` | 32 |
| `--mtds-9` | 36 |
| `--mtds-10` | 40 |
| `--mtds-11` | 44 |
| `--mtds-12` | 48 |
| `--mtds-13` | 52 |
| `--mtds-14` | 56 |
| `--mtds-15` | 60 |
| `--mtds-18` | 72 |
| `--mtds-22` | 88 |
| `--mtds-26` | 104 |
| `--mtds-30` | 120 |

```css
/* Do */
.myElement { padding: var(--mtds-4); gap: var(--mtds-3); }

/* Don't */
.myElement { padding: 16px; gap: 12px; }
.myElement { padding: var(--mtds-16); /* no such token */ }
```

### 3.2 Color — `--mtds-color-{role}-{variant}`

Color tokens automatically resolve against the nearest ancestor's `data-color` palette.
You **MUST** use palette-agnostic `--mtds-color-{role}-{variant}` tokens. You **MUST NOT** hard-code a palette name in the token (e.g. `--mtds-color-danger-surface-tinted`) — switch the palette via `data-color="danger"` on a parent instead.

| Token | Use for |
|---|---|
| `--mtds-color-background-default` | Page/section background |
| `--mtds-color-background-tinted`  | Slightly tinted background |
| `--mtds-color-surface-default`    | Card/panel surface |
| `--mtds-color-surface-tinted`     | Highlighted surface |
| `--mtds-color-surface-hover`      | Hover state surface |
| `--mtds-color-surface-active`     | Active/pressed surface |
| `--mtds-color-border-subtle`      | Subtle border |
| `--mtds-color-border-default`     | Normal border |
| `--mtds-color-border-strong`      | Emphasis border |
| `--mtds-color-text-subtle`        | Secondary/muted text |
| `--mtds-color-text-default`       | Primary body text |
| `--mtds-color-base-default`       | Solid fill (buttons, badges) |
| `--mtds-color-base-hover`         | Hover fill |
| `--mtds-color-base-active`        | Active fill |
| `--mtds-color-base-contrast-subtle`  | Subtle text on solid fill |
| `--mtds-color-base-contrast-default` | Default text on solid fill |

You **MUST NOT** use text tokens for backgrounds or vice versa — their semantic intention **MUST** match usage.

```css
/* Do — palette-agnostic, works under any data-color */
.myCard {
  background: var(--mtds-color-surface-default);
  color:      var(--mtds-color-text-default);
  border: 1px solid var(--mtds-color-border-default);
}

/* Don't — hard-coded palette in the token name */
.dangerBanner {
  background: var(--mtds-color-danger-surface-tinted);
}

/* Don't — raw colors */
.myCard { background: #fff; color: #3d3d3d; }
```

**Why this works:** when an ancestor has `data-color="danger"`, all `--mtds-color-*` tokens inside resolve to red/danger values automatically. To color text red, set `data-color="danger"` on a parent and use `color: var(--mtds-color-text-default)` — *not* a hex value.

### 3.3 Typography tokens

```css
--mtds-font-family             /* "Mattilsynet Sans" */
--mtds-font-weight-regular     /* 400 */
--mtds-font-weight-medium      /* 500 */
--mtds-font-weight-semibold    /* 600 */
--mtds-font-weight-bold        /* 700 */

--mtds-heading-2xl-font-size   /* fluid */
--mtds-heading-xl-font-size
--mtds-heading-lg-font-size
--mtds-heading-md-font-size
--mtds-heading-sm-font-size
--mtds-heading-xs-font-size
--mtds-heading-2xs-font-size

--mtds-body-xl-font-size
--mtds-body-lg-font-size
--mtds-body-md-font-size       /* default body text */
--mtds-body-sm-font-size
--mtds-body-xs-font-size

--mtds-font-size-muted         /* max(.888888em, .75rem) */
--mtds-line-height-sm
--mtds-line-height-md
```

> Prefer the typography components (`Heading`, `Ingress`, `Muted`) over raw font-size tokens in markup.

### 3.4 Other tokens

```css
--mtds-border-radius-sm | -md | -lg | -xl | -full
--mtds-border-width-default | -focus
--mtds-box-shadow-sm | -md | -lg
--mtds-icon-size               /* default icon size */
--mtds-icon-size-sm            /* small icon size */
```

### 3.5 Per-component overrides — `--mtdsc-{component}-{property-path}`

Each component exposes scoped custom properties for targeted overrides.
Naming pattern: `--mtdsc-{component}-{property-path}`.

```css
/* Override the button border color in a region */
.myScope { --mtdsc-button-border-color: var(--mtds-color-border-strong); }

/* Override Prose max-width */
.myWideArticle { --mtdsc-prose-max-width: 60rem; }
```

---

## 4. Global cascading attributes

These attributes work on **any** element and cascade to descendants.

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

```tsx
<section data-color="danger">
  <Heading>Feilseksjon</Heading>
  <Button data-variant="primary">Slett</Button>
</section>
```

### 4.2 `data-size` — density (and the name-collision rule)

`data-size` has **two** distinct meanings depending on the element:

1. **On layout/container elements** (`<Flex>`, `<Grid>`, `<Card>`, `<Group>`, `<App>`, plain wrappers): controls UI **density** and cascades to children. Valid values: `sm`, `md`, `lg`.
2. **On typography components** (`<Heading>`, `<Ingress>`, `<Info>`) and on a few components like `<Avatar>`: controls the component's own **visual size**. Valid values are component-specific (e.g. `<Heading>` accepts `2xs`–`2xl`, `<Avatar>` accepts `xs`–`lg`). Does **not** cascade.

| Density value | Effect |
|---|---|
| `sm` | Compact |
| `md` | Default |
| `lg` | Spacious |

> ⚠ You **MUST NOT** put `data-size` on plain HTML elements expecting it to change the font-size — it does nothing meaningful. Use `<Heading>`, `<Ingress>`, or `<Muted>` instead.

### 4.3 `data-tooltip` — tooltip

Place on any element. Value is the tooltip text. **MUST** be placed on an interactive element (button, link) so the tooltip is keyboard- and screen-reader-accessible. On non-interactive elements, also ensure the content is otherwise accessible.

```tsx
<Button data-tooltip="Lagre endringer">Lagre</Button>
```

Inside `<App.Sidebar>`, `data-tooltip` is **mandatory** (see §5.3).

---

## 5. App layout (page shell)

Every Mattilsynet web application/page **MUST** be built inside the `App` shell. It is the outermost layout that all other content lives within. The shell provides:

- `<App>` — the outer wrapping component
- `<App.Header>` — top header with logo and global actions (notifications, user menu)
- `<App.Toggle>` — must be placed before `<App.Sidebar>` to enable sidebar collapsing
- `<App.Sidebar>` — collapsible left sidebar (modal on mobile, persistent rail on desktop)
- `<App.Sticky>` — scroll-direction-aware sticky wrapper, used as a direct child of `<App.Sidebar>` to wrap its contents
- `<App.Main>` — the main content area
- `<App.Footer>` — optional footer (rarely used)
- The outer `<App>` accepts `data-variant="mobilebar"` for a mobile bottom-bar variant

### 5.1 Composition (canonical)

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
    <Card>{/* page content here — see §5.4 */}</Card>
  </App.Main>

  <App.Footer>
    <Logo href="/" />
  </App.Footer>
</App>
```

The required source order is **`App.Header` → `App.Toggle` → `App.Sidebar` → `App.Main` → `App.Footer`**.

### 5.2 Sub-component reference

| Component | Renders | Purpose |
|---|---|---|
| `App` | `<div class="app">` | The shell. Supports `data-variant="mobilebar"` (see §5.6) |
| `App.Header` | `<header>` | Logo + global actions. `<Logo>` **MUST** be the first child |
| `App.Toggle` | `<button>` | Expand/minimize sidebar (also opens it as a modal on mobile) |
| `App.Sidebar` | `<dialog role="navigation" id="mtds-sidebar">` | Primary navigation. Modal on mobile, rail/expanded on desktop |
| `App.Sticky` | `<div>` (polymorphic via `as`) | Scroll-direction-aware sticky wrapper inside `App.Sidebar` |
| `App.Main` | `<main>` | Page content. Every leaf content node **MUST** sit inside a `<Card>` or `<Group>` (see §5.4) |
| `App.Footer` | `<footer>` | Optional footer |
| `App.Script` | inline `<script>` | SSR/Next.js only. Render in `<head>` to prevent FOUC (see §5.7) |

### 5.3 Sidebar buttons MUST be icon-only

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

### 5.4 `App.Main` content have direct child `Group` or `Card`, or `Flex` or `Grid` with `Card` or `Group` inside

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

### 5.5 Expand / minimize sidebar

- `<App.Toggle>` renders the standard expand/minimize button.
- You **SHOULD NOT** manage sidebar visibility with custom React state — always use `<App.Toggle>` (or `toggleAppExpanded()`).

### 5.6 Sticky sidebar content

Wrap the contents of `<App.Sidebar>` in `<App.Sticky>` to get scroll-direction-aware sticky behavior (the sidebar stays visible when scrolling up and slides away when scrolling down). `<App.Sticky>` is for sidebar contents — do not use it elsewhere in the layout.

### 5.7 Mobile bottom bar variant

```tsx
<App data-variant="mobilebar">…</App>
```

- Converts the sidebar into a mobile bottom navigation bar.
- **SHOULD** only be used when there are 5 or fewer top-level navigation items.
- Headings, dividers, and elements with `data-app-expanded="false"` are auto-hidden in this variant.

### 5.8 SSR / Next.js

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

### 5.9 Rules summary

- You **MUST** use `<App>` as the outermost layout for any new Mattilsynet application page.
- You **MUST** use `<App.Sidebar>` for primary navigation — never a plain `<aside>` or `<nav>`.
- You **MUST** place `<App.Toggle>` before `<App.Sidebar>` in source order.
- You **MUST** make every interactive child of `<App.Sidebar>` icon-only and provide its label via `data-tooltip` (see §5.3).
- You **MUST** keep every leaf content node inside `<App.Main>` wrapped in at least one `<Card>` or `<Group>` (see §5.4).
- You **MUST** use `<Logo>` as the first child of `<App.Header>`.
- You **MUST NOT** wrap `<App>` in `<Flex>`, `<Grid>`, or any layout primitive — the shell sets its own grid.
- You **MUST NOT** apply `data-center` to `<App>` itself — apply it inside `<App.Main>` instead.
- You **SHOULD** use `<App.Toggle>` or `toggleAppExpanded()` for sidebar state — never custom React state.
- (Next.js / SSR) You **SHOULD** render `<App.Script />` inside `<head>` to prevent FOUC.

---

## 6. Layout system

You **MUST NOT** write `<div style="display:flex">` or use raw `gap` for layout.
You **MUST NOT** create a new wrapper component if `Card`, `Group`, `Flex`, or `Grid` fits.

### 6.1 When to use which

| Component | Use when |
|---|---|
| `Flex`  | Children have different widths (button rows, mixed content) |
| `Grid`  | Children should have equal widths (card grids, tiles) or stack vertically |
| `Card`  | Group related content on a **solid surface** (e.g. one inspection, one entity) |
| `Group` | Group several cards or meta-UI on a **tinted surface** |
| `Prose` | Wrap body/editorial text content for typographic rhythm |

> `Card` MAY be nested inside `Group`. Avoid nesting `Card` inside `Card`.

```tsx
// Do — Flex for mixed-width row
<Flex data-gap="3" data-align="center">
  <Heading as="h1" data-size="xl">Tittel</Heading>
  <Button data-variant="primary">Lagre</Button>
</Flex>

// Don't — manual flex
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <h1>Tittel</h1>
  <button>Lagre</button>
</div>
```

### 6.2 Shared attributes — `Flex` and `Grid`

| Attribute | Values | Description |
|---|---|---|
| `data-gap` | `0`–`30` (spacing-token index) | Gap between children. Default `3` |
| `data-row-gap` | `0`–`30` | Row gap only |
| `data-column-gap` | `0`–`30` | Column gap only |
| `data-items` | `auto`, `full`, or `50`–`500` in 50-step increments | Minimum child width in **pixels** before wrapping |
| `data-align` | `normal`, `stretch`, `start`, `center`, `end` | `align-items` |
| `data-align-content` | `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` | `align-content` |
| `data-justify` | `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` | `justify-content` |
| `data-center` | `sm`, `md`, `lg`, `xl`, `2xl` | Max-width + center + side padding. Use for page-level containers |
| `data-nowrap` | boolean | Prevent wrapping |
| `data-fixed`  | boolean | Prevent children from growing in width |

> `data-gap` indexes use the spacing scale (§3.1). Only the indexes listed there exist.

### 6.3 Child attributes — `Flex` only

| Attribute | Values | Description |
|---|---|---|
| `data-self` | `50`–`500` (50-step) or `full` | Min width for this child |
| `data-align-self` | `start`, `center`, `end`, `stretch` | Per-child vertical alignment |
| `data-justify-self` | `start`, `center`, `end` | Per-child horizontal alignment |

### 6.4 Shared attributes — `Card` and `Group`

| Attribute | Values | Description |
|---|---|---|
| `data-pad` | `0`–`30`, or `{vertical}-{horizontal}` (e.g. `4-6`) | Inner padding. Single value = uniform; hyphenated pair = vertical-horizontal |
| `data-radius` | `sm`, `md`, `lg`, `xl` | Border radius |

### 6.5 `Card` only

| Attribute | Values | Description |
|---|---|---|
| `href` | string | Renders the card as `<a>`, making the entire card a link. Use when **the whole card is one navigation target**. |
| `data-clickdelegatefor` | CSS selector | Delegates clicks anywhere on the card to the matching descendant (e.g. `"#details-link"`). Use when the card contains other interactive elements (buttons, links) but should still feel clickable as a whole. |

> Choose `href` for simple "the card is a link" cases; choose `data-clickdelegatefor` whenever the card contains nested interactive controls that must keep working.

### 6.6 React quick reference

```tsx
// Page container (centered, max-width 2xl)
<Flex data-center="2xl">
  <Heading as="h1" data-size="xl">Sidetittel</Heading>
</Flex>

// Button row
<Flex data-gap="3" data-align="center">
  <Button data-variant="primary">Lagre</Button>
  <Button>Avbryt</Button>
</Flex>

// Responsive equal-width card grid
<Grid data-items="300" data-gap="6">
  <Card>Kort 1</Card>
  <Card>Kort 2</Card>
  <Card>Kort 3</Card>
</Grid>
```

---

## 7. Typography system

You **MUST NOT** write raw `<h1>`–`<h6>`. Use `<Heading>`.

- Default rendered element: `<h2>`.
- You **MUST** set `as="h1"`–`as="h6"` to choose the **semantic** level (required for accessibility).
- Use `data-size` to set the **visual** size, independently of semantic level.
- `<Heading>` automatically aligns a single child icon when it is the first child — no inner `<Flex>` needed.

| Attribute | Values | Description |
|---|---|---|
| `as` | `h1`–`h6` | Semantic level (defaults to `h2`) |
| `data-size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | Visual size only (does not cascade) |
| `data-justify` | `start`, `center` | Text alignment |

### 7.1 `Prose`

Wraps body/editorial text and applies typographic margins to **direct** children only. Recognised direct children: `<p>`, `<ul>`, `<ol>`, `<h1>`–`<h6>`, `<figure>`, `<Heading>`.

> ⚠ Layout primitives (`<Flex>`, `<Grid>`) inside `<Prose>` are **NOT** subject to the rhythm; their margins must be set manually if needed. Keep layout primitives outside `<Prose>` whenever possible.

- Max-width: `45rem` (override with `--mtdsc-prose-max-width`).

```tsx
<Prose>
  <Heading as="h2">Seksjonstittel</Heading>
  <p>Brødtekst med automatisk typografisk rytme.</p>
  <ul><li>Listeelement</li></ul>
</Prose>
```

### 7.2 `Ingress`

Larger lead/intro text.

```tsx
<Ingress>Dette er en ingress som introduserer temaet.</Ingress>
```

### 7.3 `Muted`

Smaller secondary/helper text. Use instead of `<small>`.

```tsx
<Muted>Sist oppdatert 06.05.2026</Muted>
```

### 7.4 `Info`

Responsive label + value layout. Use for metadata, key/value pairs, or text next to an indicator icon.
Wrap the label in `<strong>`. Icons come from `@phosphor-icons/react/ssr`.

| Attribute | Values | Description |
|---|---|---|
| `data-size` | `sm`, `md`, `lg` | Size |
| `data-variant` | `regular` (default), `circle` | `circle` wraps the icon in a colored circle. Use only when the icon must draw visual attention |
| `data-color` | `success`, `warning`, `danger` | Color of the circle. Only valid with `data-variant="circle"` |

```tsx
// Label + value
<Info>
  <strong>Organisasjon</strong>
  Fisk AS
</Info>

// Icon + label + value
<Info>
  <CheckIcon />
  <strong>Status</strong>
  Godkjent
</Info>

// Emphasised: icon + label + value with colored circle
<Info data-variant="circle" data-color="success">
  <CheckIcon />
  <strong>Status</strong>
  Godkjent
</Info>
```

When using `data-variant="circle"`, always show **both** a label and a value.

---

## 8. Forbidden patterns

| Don't | Do |
|---|---|
| `style={{ color: 'red' }}` | Set `data-color="danger"` on a parent and use `color: var(--mtds-color-text-default)` |
| `style={{ margin: 16 }}` | Use `data-gap` on a layout component |
| `style={{ padding: 8 }}` | Use `var(--mtds-2)` in a `<style>` tag, or `data-pad` on `Card`/`Group` |
| `style={{ display: 'flex', gap: 12 }}` | `<Flex data-gap="3">` |
| `className="p-4 gap-3 text-red-500"` (Tailwind) | Design system tokens + layout components |
| Hex/rgb literals: `#c83719`, `rgb(200,55,25)` | `var(--mtds-color-base-default)` (under correct `data-color` parent) |
| `<h2>Tittel</h2>` | `<Heading as="h2">Tittel</Heading>` |
| `<h1>` without `as=` (or `<Heading>` without `as=`) | Always set `as="h1"`–`"h6"` explicitly |
| `<div style="display:flex">` | `<Flex>` |
| `<p style="font-size: 1.3em">` | `<Ingress>` |
| `<small>hjelp</small>` | `<Muted>hjelp</Muted>` |
| `<a className="…link styling…">` for inline links | `<Link>` |
| Raw `<input>`, `<select>`, `<textarea>` | `<Input>` (typically inside `<Field>`) |
| Raw `<dialog>` | `<Dialog>` |
| Custom toast/notification component | `<Toast>` |
| `useState` controlling a popover or dialog open/close state | Use the native popover API (`popoverTarget`) or `<Dialog>` props the system provides |
| `var(--mtds-16)` (non-existent token) | `var(--mtds-15)` or `var(--mtds-18)` from the actual scale |
| Custom `<header>` / `<aside>` / `<main>` grid for an application page | Use `<App>` and its sub-components |
| Plain `<nav>` or `<aside>` for primary navigation | `<App.Sidebar>` |
| `<Button><SignatureIcon />Søknader</Button>` inside `<App.Sidebar>` | `<Button data-tooltip="Søknader"><SignatureIcon /></Button>` |
| Bare elements directly inside `<App.Main>` | Wrap content in at least one `<Card>` or `<Group>` |
| `<Flex data-center="2xl"><App>…</App></Flex>` | Apply `data-center` inside `<App.Main>` instead |
| Toggle sidebar via custom React state | `<App.Toggle>` or `toggleAppExpanded()` |
| English UI text | Norwegian Bokmål |

---

## 9. Full example

Demonstrates layout, typography, palette switching, density switching, and tokens used together.

```tsx
import {
  App, Logo, Popover, Avatar,
  Flex, Grid, Card, Group,
  Heading, Prose, Ingress, Muted, Info,
  Button, Tag,
} from '@mattilsynet/design/react';
import {
  CheckIcon, WarningIcon, BellIcon, UserIcon, GearIcon, SignOutIcon,
  PlantIcon, SignatureIcon, ListChecksIcon, MagnifyingGlassIcon,
} from '@phosphor-icons/react/ssr';

export function TilsynsoversiktPage() {
  return (
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
        {/* All sidebar buttons are icon-only; every label is on data-tooltip */}
        <App.Sticky as="menu">
          <li><Button href="/tilsyn" aria-current="page" data-tooltip="Tilsyn"><SignatureIcon /></Button></li>
          <li><Button href="/behandling" data-tooltip="Behandling"><ListChecksIcon /></Button></li>
          <li><Button href="/sok" data-tooltip="Søk"><MagnifyingGlassIcon /></Button></li>
        </App.Sticky>
      </App.Sidebar>

      <App.Main>
        {/* App.Main content MUST be wrapped in Card/Group. Centering goes inside. */}
        <Flex data-center="2xl" data-gap="6">

          {/* Inverted header strip — palette switch via single attribute */}
          <Card data-color="inverted">
            <Flex data-gap="3" data-align="center">
              <Heading as="h1" data-size="xl">Tilsyn</Heading>
            </Flex>
          </Card>

          <Card>
            <Prose>
              <Ingress>Oversikt over nylig gjennomførte mattilsyn.</Ingress>
              <p>Kortene under viser de siste resultatene per virksomhet.</p>
            </Prose>
          </Card>

          {/* Compact toolbar — density switch cascades to all buttons */}
          <Card>
            <Flex data-size="sm" data-gap="3">
              <Button>Nytt tilsyn</Button>
              <Button>Eksporter</Button>
              <Button>Filtrer</Button>
            </Flex>
          </Card>

          {/* Group of inspection cards on a tinted surface */}
          <Group>
            <Grid data-items="300" data-gap="6">

              {/* Approved */}
              <Card>
                <Prose>
                  <Heading as="h2" data-size="sm">Fisk AS — Oslo</Heading>
                  <Tag data-color="success">Godkjent</Tag>
                  <p>Rutinetilsyn gjennomført. Ingen avvik funnet.</p>
                  <Muted>Tilsyn 03.05.2026</Muted>
                </Prose>
                <Flex data-gap="3">
                  <Button data-variant="secondary">Detaljer</Button>
                </Flex>
              </Card>

              {/* Failed — danger palette switches the whole card */}
              <Card data-color="danger">
                <Prose>
                  <Heading as="h2" data-size="sm">Kjøtt &amp; Co — Bergen</Heading>
                  <Tag data-color="danger">Avvik</Tag>
                  <p>Kritiske avvik funnet. Oppfølging kreves innen 14 dager.</p>
                  <Muted>Tilsyn 01.05.2026</Muted>
                </Prose>
                <Flex data-gap="3">
                  <Button data-variant="primary">Følg opp</Button>
                  <Button data-variant="tertiary">Detaljer</Button>
                </Flex>
              </Card>

              {/* Status with emphasised icon */}
              <Card>
                <Info data-variant="circle" data-color="warning">
                  <WarningIcon />
                  <strong>Til vurdering</strong>
                  3 tilsyn venter på godkjenning
                </Info>
              </Card>
            </Grid>
          </Group>
        </Flex>
      </App.Main>

      <App.Footer>
        <Logo href="/" />
      </App.Footer>
    </App>
  );
}
```

Patterns demonstrated:

- `<App>` shell wraps the entire page — header, toggle, sidebar, main, footer in canonical source order.
- `<App.Sidebar>` contains only icon-only buttons; every label is on `data-tooltip`.
- `<App.Main>` content is wrapped in `<Card>` / `<Group>` — never bare elements.
- `data-center="2xl"` is applied **inside** `<App.Main>` (on the `<Flex>`), not on `<App>`.
- `data-color="inverted"` on a `<Card>` — switches the palette for the whole region without per-component props.
- `data-color="danger"` on a `<Card>` — single attribute turns the card and all descendants red.
- `data-size="sm"` on the toolbar `<Flex>` — makes all nested buttons compact, no per-button attribute.
- `<Heading as="h2" data-size="sm">` — correct semantic level, independent visual size.
- `<Prose>` wraps `<p>` for typographic rhythm; layout primitives (`<Flex>`) live outside `<Prose>`.
- `<Grid data-items="300">` — equal-width responsive cards that wrap automatically.
- All spacing via `data-gap` and `--mtds-*` tokens — zero raw `px`.
- `Info` with `data-variant="circle"` — icon takes visual focus, both label and value present.
- All UI text in Norwegian Bokmål.

---

## 10. Validation checklist

Before returning code, verify all of the following:

- [ ] No raw `px`/`rem` values for spacing — all gaps/padding use `data-gap`, `data-pad`, or `var(--mtds-{n})`.
- [ ] No hex/rgb/named colors — only `var(--mtds-color-*)` tokens or `data-color` on a parent.
- [ ] No inline `style={{…}}` for layout, color, or spacing. Custom CSS lives in a `<style>` tag.
- [ ] No Tailwind utility classes.
- [ ] No raw `<h1>`–`<h6>` — every heading is `<Heading as="hN">` with explicit semantic level.
- [ ] Every `<Heading>` has an explicit `as="hN"` attribute.
- [ ] No raw `<div style="display:flex">` — use `<Flex>` or `<Grid>`.
- [ ] No raw `<input>`, `<select>`, `<textarea>`, `<dialog>`, `<small>` — use the design system equivalents.
- [ ] All spacing-token indexes used actually exist in the table (`0`–`15`, `18`, `22`, `26`, `30`).
- [ ] React components imported from `@mattilsynet/design/react`.
- [ ] Icons imported from `@phosphor-icons/react/ssr`.
- [ ] Entry file imports `'@mattilsynet/design'` and `'@mattilsynet/design/styles.css'`.
- [ ] `data-color` and `data-size` collisions accounted for (global cascade vs local component meaning — see §4.2).
- [ ] All UI text is in Norwegian Bokmål.
- [ ] `useState` is **not** used to control the open/close state of `<Popover>` or `<Dialog>` — native APIs / system props are used instead.
- [ ] Application page is wrapped in `<App>` with `<App.Header>`, `<App.Sidebar>`, `<App.Main>` (and optionally `<App.Footer>`).
- [ ] `<App.Toggle>` appears **before** `<App.Sidebar>` in source order.
- [ ] All interactive children of `<App.Sidebar>` are icon-only and provide their label via `data-tooltip`.
- [ ] Every leaf content node inside `<App.Main>` sits within a `<Card>` or `<Group>` — no bare elements.
- [ ] `data-center` is applied **inside** `<App.Main>` (not on `<App>`).
- [ ] (Next.js / SSR) `<App.Script />` is rendered inside `<head>`.

---

## 11. Component index

Each component has a full doc at `@mattilsynet/design/ai/<component>.mdx` and examples in `@mattilsynet/design/ai/<component>.stories.tsx` covering HTML/CSS, React usage, all props, variants, and do/don't guidance. **Read the relevant doc before using a component you have not used in this session.**

Some doc files cover multiple related components — those are noted as "covers: …".

| Doc file | Components / purpose |
|---|---|
| `alert` | `Alert` — feedback messages (info, success, warning, danger). Persistent, in-flow. |
| `app` | `App` and sub-components — application shell. **See §5 for full rules.** |
| `avatar` | `Avatar` — person/entity representation (initials, image, icon). Sizes `xs`–`lg`. |
| `badge` | `Badge` — small status indicator attached to another element. |
| `breadcrumbs` | `Breadcrumbs` — hierarchical navigation trail. |
| `button` | `Button` — actions and CTAs. Polymorphic: renders `<a>` when `href` is present. |
| `card` | covers: `Card`, `Group` — content containers. |
| `chart` | Charts (bar, line, area, pie). |
| `chip` | `Chip` — interactive filter/selection toggle. |
| `details` | `Details` — expandable/collapsible section. |
| `dialog` | `Dialog` — modal dialog. |
| `divider` | `Divider` — horizontal separator line. |
| `errorsummary` | `ErrorSummary` — summary of form validation errors. |
| `field` | `Field` — form field wrapper (label + input + validation). |
| `fieldset` | `Fieldset` — group of related form fields. |
| `fileupload` | `FileUpload` — file upload input. |
| `helptext` | `HelpText` — contextual help popover attached to a field. |
| `input` | `Input` — text, number, date, select, textarea, search inputs. |
| `layout` | covers: `Flex`, `Grid` — layout primitives. **See §6.** |
| `law` | Render and select sections of Norwegian legislation. |
| `link` | `Link` — inline navigation link. |
| `logo` | `Logo` — Mattilsynet logo with optional sub-brand/app name. |
| `pagination` | `Pagination` — page navigation for long lists. |
| `popover` | `Popover` — floating overlay anchored to a trigger element (uses native popover API). |
| `print` | A4 print/PDF layout. |
| `progress` | `Progress` — progress bar (determinate or indeterminate). |
| `skeleton` | `Skeleton` — loading placeholder. |
| `spinner` | `Spinner` — loading spinner. |
| `steps` | `Steps` — multi-step progress indicator or timeline. |
| `table` | `Table` — tabular data. |
| `tabs` | `Tabs` — tabbed content panels. |
| `tag` | `Tag` — read-only static label/keyword. |
| `toast` | `Toast` — transient notification. |
| `togglegroup` | `ToggleGroup` — single-select toggle button group. |
| `tooltip` | Tooltip behavior (use via `data-tooltip` attribute, see §4.3). |
| `typography` | covers: `Heading`, `Prose`, `Ingress`, `Muted`, `Info`. **See §7.** |
| `validation` | Inline field validation message. |
