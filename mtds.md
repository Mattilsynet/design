# @mattilsynet/design — LLM Reference

You are writing code that uses the design system **@mattilsynet/design**.
Follow the rules below. They use RFC-2119 keywords (**MUST**, **MUST NOT**, **SHOULD**, **MAY**) so they can be applied without ambiguity.

> **Scope:** The package ships React components, and web components + class names. When used in React, prefer `@mattilsynet/design/react`. Always import side-effect from `'@mattilsynet/design'` and CSS from `'@mattilsynet/design/styles.css'` in the application entry file - even in pure-React apps.

---

## 1. Mandate (read first)

1. You **MUST** import the stylesheet and register the package **once** in the application entry file:
   ```ts
   import '@mattilsynet/design';
   import '@mattilsynet/design/styles.css';
   ```
2. You **MUST** set `data-color-scheme="auto"` on `<html>` (valid values: `auto`, `light`, `dark`).
3. You **MUST** import React components from `@mattilsynet/design/react`.
4. You **MUST** import React icons from `@phosphor-icons/react/ssr`.
5. You **MUST NOT** invent spacing, color, radius, or typography with raw `px`/`rem`/hex/rgb values, inline `style`, or Tailwind utilities. Use design tokens (`var(--mtds-*)`) or component attributes.
6. You **MUST NOT** create a new generic container component if `Card`, `Group`, `Flex`, or `Grid` already cover the case.
7. If you need a custom component, you **SHOULD** write plain HTML styled with CSS custom properties from the token system.
8. Before using a component, you **SHOULD** read its full doc at `designsystem/<component>/<component>.mdx` and its related examples in `designsystem/<component>/<component>.stories.tsx`.

### Required imports (canonical block)

```tsx
// In your application entry file, ONCE:
import '@mattilsynet/design';
import '@mattilsynet/design/styles.css';

// In any file that uses the components:
import { NameOfComponent } from '@mattilsynet/design/react';
import { NameOfIcon } from '@phosphor-icons/react/ssr';
```

---

## 2. Quick decision tree

| You need to… | Use |
|---|---|
| Lay out items horizontally with mixed widths | `<Flex>` |
| Lay out items in equal-width columns or stack vertically | `<Grid>` |
| Group related content on a solid surface (white card) | `<Card>` |
| Group several cards/widgets on a tinted surface | `<Group>` |
| Wrap body/editorial text and get vertical rhythm | `<Prose>` |
| Render a heading | `<Heading as="hN" data-size="…">` |
| Render lead/intro text | `<Ingress>` |
| Render small/secondary text | `<Muted>` |
| Render a label + value pair (optionally with icon) | `<Info>` |
| Trigger an action | `<Button>` |
| Switch palette for a region | `data-color="…"` on any ancestor |
| Switch density for a region | `data-size="sm│md│lg"` on any ancestor |
| Add a tooltip | `data-tooltip="…"` on the element |

---

## 3. Token system (CSS custom properties)

All tokens are namespaced `--mtds-*` (system) and `--mtdsc-*` (per-component override).
You **SHOULD** treat the pixel values shown as informative only — always reference the token, never the literal value.

### 3.1 Spacing — `--mtds-{n}`

Use for `gap`, `padding`, `margin`, and any spatial `width`/`height`.
**Only the values listed below exist.** Do **not** write `--mtds-16`, `--mtds-20`, etc.

| Token | ≈ px |
|---|---|---|---|
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
You **MUST** use `--mtds-color{role}-{variant}` tokens (palette-agnostic). You **MUST NOT** hard-code a palette name in the token (`--mtds-color-danger-{role}-variant`) — switch the palette via `data-color="danger"` on a parent instead.

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

You **MUST NOT** use text tokens for backgrounds or vice versa - their semantic intention **MUST** match usage.

```css
/* Do — palette-agnostic, works under any data-color */
.myCard {
  background: var(--mtds-color-surface-default);
  color:      var(--mtds-color-text-default);
  border: 1px solid var(--mtds-color-border-default);
}

/* Don't — hard-coded palette */
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
--mtds-icon-size               /* = --mtds-6 */
--mtds-icon-size-sm            /* = --mtds-5 */
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
  <Heading>Error section</Heading>
  <Button data-variant="primary">Delete</Button>
</section>
```

### 4.2 `data-size` — density

Controls UI density (padding, control heights) for the element and its children.

| Value | Density |
|---|---|
| `sm` | Compact |
| `md` | Default |
| `lg` | Spacious |

> ⚠ **Name collision:** `Heading` use `data-size` to set their own *visual* size (`2xs`–`2xl`). On those components, the attribute is local — it does **not** change density. You **MUST NOT** use `data-size` to change font-size on plain HTML elements; use `<Heading>`, `<Ingress>`, or `<Muted>` instead.

### 4.3 `data-color-scheme` — light/dark

Set on `<html>`. Valid values: `auto` (recommended), `light`, `dark`.

### 4.4 `data-tooltip` — tooltip

Place on any element. Value is the tooltip text. Prefer placing on an interactive element (button, link); on non-interactive elements, also ensure the content is otherwise accessible.

```tsx
<Button data-tooltip="Save your changes">Save</Button>
```

---

## 5. Layout system

You **MUST NOT** write `<div style="display:flex">` or use raw `gap` for layout.
You **MUST NOT** create a new wrapper component if `Card`, `Group`, `Flex`, or `Grid` fits.

### 5.1 When to use which

| Component | Use when |
|---|---|
| `Flex`  | Children have different widths (button rows, mixed content) |
| `Grid`  | Children should have equal widths (card grids, tiles) or stack vertically |
| `Card`  | Group related content on a **white/solid surface** (e.g. one inspection, one entity) |
| `Group` | Group several cards or meta-UI on a **translucent grey surface** |
| `Prose` | Wrap body/editorial text content for typographic rhythm |

> `Card` MAY be nested inside `Group`. Avoid nesting `Card` inside `Card`.

### 5.2 Shared attributes — `Flex` and `Grid`

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

### 5.3 Child attributes — `Flex` only

| Attribute | Values | Description |
|---|---|---|
| `data-self` | `50`–`500` (50-step) or `full` | Min width for this child |
| `data-align-self` | `start`, `center`, `end`, `stretch` | Per-child vertical alignment |
| `data-justify-self` | `start`, `center`, `end` | Per-child horizontal alignment |

### 5.4 Shared attributes — `Card` and `Group`

| Attribute | Values | Description |
|---|---|---|
| `data-pad` | `0`–`30`, or `{vertical}-{horizontal}` (e.g. `4-6`) | Inner padding. Single value = uniform; hyphenated pair = vertical-horizontal |
| `data-radius` | `sm`, `md`, `lg`, `xl` | Border radius |

### 5.5 `Card` only

| Attribute | Values | Description |
|---|---|---|
| `href` | string | Renders the card as `<a>`, making the whole card a link |
| `data-clickdelegatefor` | CSS selector | Delegates clicks on the card to the matching descendant (e.g. `"#details-link"`) |

### 5.6 React quick reference

```tsx
// Page container (centered, max-width 2xl)
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

## 6. Typography system

You **MUST NOT** write raw `<h1>`–`<h6>`. Use `<Heading>`.

- Default rendered element: `<h2>`.
- You **MUST** set `as="h1"`–`as="h6"` to choose the **semantic** level (required for accessibility).
- Use `data-size` to set the **visual** size, independently of semantic level.
- `<Heading>` automatically aligns a single child icon when it is the first child — no inner `<Flex>` needed.

| Attribute | Values | Description |
|---|---|---|
| `as` | `h1`–`h6` | Semantic level (defaults to `h2`) |
| `data-size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | Visual size only |
| `data-justify` | `start`, `center` | Text alignment |

### 6.1 `Prose`

Wraps body/editorial text and applies typographic margins to **direct** children only. Recognised direct children: `<p>`, `<ul>`, `<ol>`, `<h1>`–`<h6>`, `<figure>`, `<Heading>`.

> ⚠ Layout primitives (`<Flex>`, `<Grid>`) inside `<Prose>` are **not** part of the rhythm — wrapping content in them will allow changing the vertical spacing.

- Max-width: `45rem` (override with `--mtdsc-prose-max-width`).

```tsx
<Prose>
  <Heading as="h2">Section title</Heading>
  <p>Body text with automatic typographic rhythm.</p>
  <ul><li>List item</li></ul>
</Prose>
```

### 6.2 `Ingress`

Larger lead/intro text.

```tsx
<Ingress>This is a lead paragraph introducing the topic.</Ingress>
```

### 6.3 `Muted`

Smaller secondary/helper text.

```tsx
<Muted>Last updated 06.05.2026</Muted>
```

### 6.4 `Info`

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
  <strong>Organization</strong>
  Fisk AS
</Info>

// Icon + label + value
<Info>
  <CheckIcon />
  <strong>Status</strong>
  Approved
</Info>

// Emphasised: icon + label + value with colored circle
<Info data-variant="circle" data-color="success">
  <CheckIcon />
  <strong>Status</strong>
  Approved
</Info>
```

When using `data-variant="circle"`, always show **both** a label and a value.

---

## 7. Forbidden patterns

| Don't | Do |
|---|---|
| `style={{ color: 'red' }}` | Set `data-color="danger"` on a parent and use `color: var(--mtds-color-text-default)` |
| `style={{ margin: 16 }}` | Use `data-gap` on a layout component |
| `style={{ padding: 8 }}` | Use `var(--mtds-2)` in CSS, or `data-pad` on `Card`/`Group` |
| `style={{ display: 'flex', gap: 12 }}` | `<Flex data-gap="3">` |
| `className="p-4 gap-3 text-red-500"` (Tailwind) | Design system tokens + layout components |
| Hex/rgb literals: `#c83719`, `rgb(200,55,25)` | `var(--mtds-color-base-default)` (under correct `data-color` parent) |
| `<h2>Title</h2>` | `<Heading as="h2">Title</Heading>` |
| `<div style="display:flex">` | `<Flex>` |
| `<p style="font-size: 1.3em">` | `<Ingress>` |
| `<small>helper</small>` | `<Muted>helper</Muted>` |
| `var(--mtds-16)` (non-existent token) | `var(--mtds-15)` or `var(--mtds-18)` from the actual scale |

---

## 8. Full example

Demonstrates layout, typography, palette switching, density switching, and tokens used together.

```tsx
import {
  Flex, Grid, Card,
  Heading, Prose, Ingress, Muted, Info,
  Button, Tag,
} from '@mattilsynet/design/react';
import { CheckIcon, WarningIcon } from '@phosphor-icons/react/ssr';

export function InspectionsPage() {
  return (
    // Centered page container, max-width 2xl
    <Flex data-center="2xl" data-gap="6">

      {/* Inverted header strip — palette switch via single attribute */}
      <header data-color="inverted">
        <Flex data-gap="3" data-align="center" data-pad="3">
          <Heading as="h1" data-size="xl">Inspections</Heading>
        </Flex>
      </header>

      <Prose>
        <Ingress>Overview of recent food-safety inspections.</Ingress>
        <p>Cards below show the latest results per entity.</p>
      </Prose>

      {/* Compact toolbar — density switch cascades to all buttons */}
      <Flex data-size="sm" data-gap="3">
        <Button>New inspection</Button>
        <Button>Export</Button>
        <Button>Filter</Button>
      </Flex>

      {/* Equal-width responsive card grid */}
      <Grid data-items="300" data-gap="6">

        {/* Approved — neutral palette */}
        <Card>
          <Prose>
            <Heading as="h2" data-size="sm">Fisk AS — Oslo</Heading>
            <Tag data-color="success">Approved</Tag>
            <p>Routine inspection completed. No violations found.</p>
            <Muted>Inspected 03.05.2026</Muted>
          </Prose>
          <Flex data-gap="3">
            <Button data-variant="secondary">Details</Button>
          </Flex>
        </Card>

        {/* Failed — danger palette switches the whole card */}
        <Card data-color="danger">
          <Prose>
            <Heading as="h2" data-size="sm">Kjøtt &amp; Co — Bergen</Heading>
            <Tag data-color="danger">Failed</Tag>
            <p>Critical violations found. Follow-up required within 14 days.</p>
            <Muted>Inspected 01.05.2026</Muted>
          </Prose>
          <Flex data-gap="3">
            <Button data-variant="primary">Follow up</Button>
            <Button data-variant="tertiary">Details</Button>
          </Flex>
        </Card>

        {/* Status with emphasised icon */}
        <Card>
          <Info data-variant="circle" data-color="warning">
            <WarningIcon />
            <strong>Pending review</strong>
            3 inspections awaiting approval
          </Info>
        </Card>
      </Grid>
    </Flex>
  );
}
```

Patterns demonstrated:

- `data-center="2xl"` on the outer `<Flex>` — centers the page with max-width and side padding.
- `data-color="inverted"` on `<header>` — switches the palette for the whole region without per-component props.
- `data-color="danger"` on a `<Card>` — single attribute turns the card and all descendants red.
- `data-size="sm"` on the toolbar `<Flex>` — makes all nested buttons compact, no per-button attribute.
- `<Heading as="h2" data-size="sm">` — correct semantic level, independent visual size.
- `<Prose>` wraps `<p>` for typographic rhythm; layout primitives (`<Flex>`) live outside `<Prose>`.
- `<Grid data-items="300">` — equal-width responsive cards that wrap automatically.
- All spacing via `data-gap` and `--mtds-*` tokens — zero raw `px`.
- `Info` with `data-variant="circle"` — icon takes visual focus, both label and value present.

---

## 9. Validation checklist

Before returning code, verify all of the following:

- [ ] No raw `px`/`rem` values for spacing — all gaps/padding use `data-gap`, `data-pad`, or `var(--mtds-{n})`.
- [ ] No hex/rgb/named colors — only `var(--mtds-color-*)` tokens or `data-color` on a parent.
- [ ] No inline `style={{…}}` for layout, color, or spacing.
- [ ] No Tailwind utility classes.
- [ ] No raw `<h1>`–`<h6>` — every heading is `<Heading as="hN">` with explicit semantic level.
- [ ] No raw `<div style="display:flex">` — use `<Flex>` or `<Grid>`.
- [ ] All spacing-token indexes used actually exist in the table (1–15, 18, 22, 26, 30).
- [ ] React components imported from `@mattilsynet/design/react`.
- [ ] Icons imported from `@phosphor-icons/react/ssr`.
- [ ] Entry file imports `'@mattilsynet/design'` and `'@mattilsynet/design/styles.css'`.
- [ ] `<html data-color-scheme="auto">` is set.
- [ ] `data-color` and `data-size` collisions accounted for (global cascade vs local component meaning).

---

## 10. Component index

Each component has a full doc at `ai/<component>.mdx` and examples in `ai/<component>.stories.tsx` covering HTML/CSS, React usage, all props, variants, and do/don't guidance. **Read the relevant doc before using a component you have not used in this session.**

| Component | Purpose |
|---|---|
| `alert` | Feedback messages (info, success, warning, danger) |
| `app` | Full-page layout with header, sidebar, main, footer |
| `avatar` | Person/entity representation (initials, image, icon) |
| `badge` | Short status label |
| `breadcrumbs` | Hierarchical navigation trail |
| `button` | Actions and CTAs |
| `card` | Content container (`Card` + `Group`) |
| `chart` | Data visualisation (bar, line, area, pie) |
| `chip` | Compact filter/tag toggle |
| `details` | Expandable/collapsible section |
| `dialog` | Modal dialog |
| `divider` | Horizontal separator line |
| `errorsummary` | Summary of form validation errors |
| `field` | Form field wrapper (label + input + validation) |
| `fieldset` | Group of related form fields |
| `fileupload` | File upload input |
| `helptext` | Contextual help popover attached to a field |
| `input` | Text, number, date, select, textarea, search inputs |
| `layout` | `Flex` and `Grid` layout primitives |
| `law` | Render and select sections of Norwegian legislation |
| `link` | Navigation link |
| `logo` | Mattilsynet logo with optional sub-brand/app name |
| `pagination` | Page navigation for long lists |
| `popover` | Floating overlay anchored to a trigger element |
| `print` | A4 print/PDF layout |
| `progress` | Progress bar (determinate or indeterminate) |
| `skeleton` | Loading placeholder |
| `spinner` | Loading spinner |
| `steps` | Multi-step progress indicator or timeline |
| `table` | Tabular data |
| `tabs` | Tabbed content panels |
| `tag` | Read-only label/keyword tag |
| `toast` | Temporary notification message |
| `togglegroup` | Single-select toggle button group |
| `typography` | `Heading`, `Prose`, `Ingress`, `Muted`, `Info` |
| `validation` | Inline field validation message |
