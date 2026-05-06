# Badge

Non-interactive status indicator. Use for numeric counts attached to a parent element (icon, button, heading, tab) or as a small dot in the top-right corner of a wrapped element. Always anchor to a parent context — never standalone.

## Import

```tsx
import { Badge } from '@mattilsynet/design/react'
```

## Minimal example

```tsx
<Badge data-badge="2" />
```

## API reference

`Badge` is a `forwardRef<HTMLSpanElement>` that renders a `<span>`. It accepts all standard `span` attributes plus the props below.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `data-badge` | `string \| number \| boolean` | — | Content rendered via CSS `content: attr(data-badge)`. Use `true` for an empty dot. Omit entirely when wrapping an element to render a corner dot. |
| `data-color` | `"danger" \| "success" \| "warning" \| "info" \| "neutral" \| "main" \| "inverted"` | inherited | **Not in the TypeScript type** — supported via the global `data-color` convention. TS will not error on invalid values. |
| `className`, `ref`, ...span attrs | — | — | Forwarded to the underlying `<span>`. |

### CSS custom properties

Override on the `Badge` element (or an ancestor) to customize appearance:

| Variable | Default | Purpose |
|----------|---------|---------|
| `--mtdsc-badge-background` | `var(--mtds-color-base-default)` | Pill background color |
| `--mtdsc-badge-color` | `var(--mtds-color-base-contrast-subtle)` | Text color of the pill |
| `--mtdsc-badge-size` | `var(--mtds-3)` | Minimum width/height of the pill |
| `--mtdsc-badge-offset` | `0px` | Inward offset when badge wraps an element (positions the corner pill) |

## Common patterns

### 1. Numeric badge inside a button

```tsx
<button type="button" data-variant="secondary">
  <EnvelopeIcon /> E-mail <Badge data-badge="2" />
</button>
```

### 2. Wrap an icon — empty badge becomes a corner dot

```tsx
<Badge>
  <EnvelopeIcon />
</Badge>
```

### 3. Wrap an icon with a count in the corner

```tsx
<Badge data-badge="2">
  <EnvelopeIcon />
</Badge>
```

### 4. Color variant

```tsx
<Badge data-badge="9" data-color="danger" />
```

### 5. Truncated count

```tsx
<Badge data-badge="99+" />
```

## Combinations

Frequently used with:

- `Button` — especially `data-variant="primary"`, which automatically adjusts badge contrast.
- Headings (`<h2>`, etc.) for status counts on section titles.
- `Tabs` — counts inside tab labels.
- `Avatar` — wrapping an avatar automatically applies `--mtdsc-badge-offset: 15%`.

## Automatic behaviors

These are applied by CSS without any prop — be aware they happen:

- **Empty `<Badge>`** (no children, no `data-badge`): positioned `absolute` in the top-right corner of the parent, scaled to 85%. Use this for the dot-on-icon pattern.
- **Badge with content** (`:not(:empty)`): rendered inline in normal flow.
- **Wrapping an `Avatar`** (any descendant with `avatar` in its class): `--mtdsc-badge-offset` is set to `15%` to inset the badge correctly.
- **Inside `<button data-variant="primary">`**: badge background/color is overridden for contrast.
- **`data-badge="true"`**: renders an empty pill (no text), useful as a generic indicator dot.

## Accessibility

- Non-interactive — no implicit ARIA role, no focus, no keyboard handling.
- When a badge wraps an icon-only element, ensure the parent (e.g. the button) provides an accessible name via `aria-label` or visible text.

## Pitfalls

- `data-color` is **not validated by TypeScript**. Invalid values will silently fail.
- An empty `<Badge>` is **positioned absolutely** in the top-right of its children — it is not inline. Provide content via `data-badge` to render inline.
- Use **numbers only** as content. For textual status, use `Tag` instead.

## Don't do this

```tsx
// ❌ Text content — use Tag for textual status
<Badge data-badge="Three hundred twenty-four" />

// ❌ Multiple badges on the same parent — confusing
<button>E-mail <Badge data-badge="42" /><Badge data-badge="98" /></button>

// ❌ Standalone with no parent context
<Badge data-badge="452" />
```
