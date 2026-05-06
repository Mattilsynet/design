# @mattilsynet/design — LLM Reference

Use **components** from `@mattilsynet/design/react`, **attributes** (`data-*`) for variants and density, and **CSS tokens** (`--mtds-*`) for any custom styling. Never use raw `px`, hex colors, or inline `style` for layout/spacing/color. Avoid creating new class names unless strictly necessary.

Rules use RFC-2119 keywords (**MUST**, **MUST NOT**, **SHOULD**, **MAY**).

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
2. **MUST** set `data-color-scheme="auto"` (or `light` / `dark`) on `<html>`.
3. **MUST** import React components from `@mattilsynet/design/react` and icons from `@phosphor-icons/react/ssr`.
4. **MUST NOT** use raw `px`, `rem`, hex, `rgb()`, named colors, inline `style`, or Tailwind utilities for layout, spacing, color, radius, or typography. Use design tokens or component attributes.
5. **MUST NOT** create a new container component if `Card`, `Group`, `Flex`, or `Grid` already cover the case.
6. **MUST NOT** write raw `<h1>`–`<h6>`. Use `<Heading as="h1">` etc.
7. **SHOULD** read `@mattilsynet/design/mtds/ai/<name>.mdx` (and `<name>.stories.tsx`) before using a component you have not used in this session.
8. **SHOULD**, for genuinely custom CSS, use a regular CSS file or CSS Module that references `--mtds-*` tokens — never inline `style`.

Verify all requirements with the **§10 checklist** before returning code.

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

For anything else, find the right component in the **§11 index**.

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

Valid `n` values: **`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30`** (note the gap above 15). At default density, `n × 4 ≈ pixels`. Other indexes (`16`, `17`, `19`, `20`–`21`, `23`–`25`, `27`–`29`) **do not exist**.

Use for `gap`, `padding`, `margin`, and any spatial `width`/`height`.

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

## 6. Layout primitives

### 6.1 When to use which

| Component | Use when | Surface |
|---|---|---|
| `Flex`  | Children have different widths (button rows, toolbars) | none |
| `Grid`  | Children should be equal-width (card grids) or stack vertically | none |
| `Card`  | Group related content as a single unit | `surface-default` (white) |
| `Group` | Group several cards or meta-UI as a region | `background-tinted` (translucent grey) |

`Card` MAY be nested inside `Group`. Avoid `Card` inside `Card`.

### 6.2 Shared attributes — `Flex` and `Grid`

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

### 6.3 Flex child attributes

| Attribute | Values | Notes |
|---|---|---|
| `data-self` | Same set as `data-items` | Min width for this child |
| `data-align-self` | `start`, `center`, `end`, `stretch` | |
| `data-justify-self` | `start`, `center`, `end` | |

### 6.4 `Card` and `Group`

| Attribute | Values | Notes |
|---|---|---|
| `data-pad` | Single index from §5.1, or `{vertical}-{horizontal}` (e.g. `4-6`) | Inner padding. Default `5`. Pair form is fluid between viewport breakpoints |
| `data-radius` | `sm`, `md`, `lg`, `xl` | Defaults: Card `lg`, Group `xl` |

`Card` only:

| Attribute | Values | Notes |
|---|---|---|
| `href` | string | Renders Card as `<a>` (whole card becomes a link) |
| `data-clickdelegatefor` | CSS selector | Click anywhere on the card triggers the matching descendant (e.g. `"#details-link"`) |

### 6.5 Quick reference

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

## 7. Typography components

### 7.1 `Heading`

| Attribute | Values | Notes |
|---|---|---|
| `as` | `h1`–`h6` | **Semantic** level. Default `h2`. Always set explicitly for accessibility |
| `data-size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | **Visual** size (independent of `as`) |
| `data-justify` | `start`, `center`, `end` | Text alignment |

`Heading` auto-sizes and aligns any `<svg>` child (no inner `<Flex>` needed).

```tsx
<Heading as="h2" data-size="sm"><CheckIcon /> Approved</Heading>
```

### 7.2 `Prose`

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

### 7.3 `Ingress` and `Muted`

```tsx
<Ingress>Lead paragraph introducing the topic.</Ingress>
<Muted>Last updated 06.05.2026</Muted>
```

### 7.4 `Info`

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

## 8. Worked example

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

## 9. Figma → code

When the input is a Figma frame/sketch, treat the design as a binding spec for *which design system components to use*, not just a pixel target.

### 9.1 Component mapping is mandatory

1. **MUST** map every visible Figma component instance in the area to its corresponding component from `@mattilsynet/design/react` is possible. Do **not** substitute custom HTML/CSS to gain layout control.
2. **MUST NOT** reach for raw `<div>`/`<span>` + CSS when a design system component covers the case — even if the component feels harder to make responsive. First try the component plus a wrapper (`Flex`, `Grid`, `Card`) and/or token-based CSS.
3. If you genuinely believe a deviation is required (e.g. the component cannot express the intended behavior), **STOP**. Explain the deviation and the alternative you propose **before** writing code, and wait for explicit approval.

### 9.2 Specific mapping rules

- **Metadata in lists / cards** (icon + value, or label + value): **MUST** use `<Info>` whenever Figma uses an `Info` instance, **or** whenever the content shape is icon + value or label + value. Custom `<span>`/`<div>` structures for metadata are **not allowed** unless the user explicitly approves the deviation.
- **Headings:** any Figma text styled as a heading → `<Heading as="hN" data-size="…">`, never raw `<h1>`–`<h6>` or styled `<div>`.
- **Lead/intro text** → `<Ingress>`. **Secondary/meta text** → `<Muted>`.
- **Surface containers:** Figma "Card" → `<Card>`; Figma tinted region grouping cards → `<Group>`.
- **Buttons, Tags, Chips, Alerts, Tabs, Steps, Dialog, Popover, Table, Field/Fieldset, ErrorSummary** → use the matching component from the §11 index. Do not reimplement.
- **Color regions:** when a Figma frame is in a semantic color (danger/warning/success/info/inverted), set `data-color="…"` on a parent rather than picking palette-prefixed tokens.

### 9.3 Verification before returning code

Before sending the final response after a design-to-code task, perform a mapping audit:

1. List every visible component instance from the Figma context.
2. For each one, name the design system component used in the generated code.
3. If any Figma instance is **not** mapped to its design system equivalent, list it as an explicit deviation with a reason — or fix the code.

This audit is in addition to the §10 checklist; both must pass.

---

## 10. Pre-return checklist

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

## 11. Component index

Each component has full docs at `@mattilsynet/design/mtds/ai/<name>.mdx` and examples in `@mattilsynet/design/mtds/ai/<name>.stories.tsx`. **Read the relevant doc before using a component you have not used in this session.**

**Layout & structure:** `app`, `card` (Card, Group), `divider`, `layout` (Flex, Grid), `print`

**Typography:** `typography` (Heading, Prose, Ingress, Muted, Info), `link`

**Forms:** `field`, `fieldset`, `input`, `fileupload`, `helptext`, `togglegroup`, `validation`, `errorsummary`

**Actions:** `button`, `chip`

**Feedback & status:** `alert`, `badge`, `progress`, `skeleton`, `spinner`, `tag`, `toast`

**Navigation:** `breadcrumbs`, `pagination`, `steps`, `tabs`

**Display:** `avatar`, `chart`, `details`, `dialog`, `popover`, `table`, `tooltip`

**Domain & branding:** `law`, `logo`
