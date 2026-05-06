# Popover

Floating panel anchored to a trigger element, built on the native HTML Popover API. Use when content is too rich for a tooltip (menus, forms, longer explanations).

## Import

```ts
import { Popover } from "@mattilsynet/design/react";
```

## Minimal example

```tsx
<button type="button" popoverTarget="my-popover">Open</button>
<Popover id="my-popover">Content</Popover>
```

- `id` on `Popover` is required and must match `popoverTarget` on the trigger.
- Trigger must be `<button type="button">` (or `<a>`) — omitting `type="button"` inside a form will submit it.
- Targets only React 19+ (`popoverTarget` camelCase). Older React requires `popovertarget` lowercase.

## API reference

### `Popover` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `"div" \| "menu"` | `"div"` | Use `"menu"` for dropdowns containing `<li>` children. |
| `id` | `string` | — | **Required** to link from a `popoverTarget` trigger. |
| `data-placement` | `"top" \| "top-start" \| "top-end" \| "right" \| "right-start" \| "right-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end"` | auto | Preferred placement; auto-flips to fit viewport. |
| `data-overscroll` | `"contain"` | — | Constrains popover height to the viewport and enables internal scroll. |
| `popover` | `"auto" \| "manual"` | `"auto"` | Do not override unless you need manual control. `"auto"` handles Escape and click-outside. |
| `className`, `id`, … | standard HTML | — | All other HTML attributes are forwarded. |

> ⚠️ **Deprecated:** `data-position` — use `data-placement` instead (same values). Do not use in new code.

### Trigger attributes

These go on the **trigger element** (`<button>` / `<Button>` / `<a>`), **not** on the `Popover`.

| Attribute | Values | Description |
|---|---|---|
| `popoverTarget` | `<id>` | ID of the `Popover` to open. |
| `popoverTargetAction` | `"show" \| "hide" \| "toggle"` | Force a specific action. Required on buttons placed *inside* a popover to toggle it. Required on `<a>` inside a popover to keep it open (`"show"`). |
| `data-arrow` | (boolean) | Renders a directional arrow on the trigger pointing toward the popover. |
| `data-popover` | `"inline"` | Styles the trigger as inline body text (for in-text explanations). |
| `data-pressed` | `"true" \| "false"` | On a child of the trigger (e.g. an icon) to show/hide it based on popover state. |

### CSS custom properties

Override on the popover element or an ancestor.

| Property | Description |
|---|---|
| `--mtdsc-popover-arrow-size` | Size of the directional arrow on the trigger. |
| `--mtdsc-popover-background` | Background color. |
| `--mtdsc-popover-border-color` | Border color. |
| `--mtdsc-popover-border-radius` | Corner radius. |
| `--mtdsc-popover-border-style` | Border style. |
| `--mtdsc-popover-border-width` | Border width. |
| `--mtdsc-popover-box-shadow` | Drop shadow. |
| `--mtdsc-popover-color` | Text color. |
| `--mtdsc-popover-max-width` | Maximum width. |
| `--mtdsc-popover-padding` | Inner padding. |
| `--mtdsc-popover-placement` | Resolved placement (set internally; read-only in practice). |

## Subcomponents

None. `Popover` has no `Popover.X` subcomponents.

## Common patterns

### A. Dropdown menu

```tsx
import { Button, Popover } from "@mattilsynet/design/react";

<Button popoverTarget="menu" data-variant="secondary" data-arrow>Actions</Button>
<Popover as="menu" id="menu">
  <li><Button>Edit</Button></li>
  <li><Button>Duplicate</Button></li>
  <li><Button>Delete</Button></li>
</Popover>
```

### B. Inline text popover

```tsx
<p>
  We use{" "}
  <button type="button" data-popover="inline" popoverTarget="tokens">
    design tokens
  </button>{" "}
  for consistency.
</p>
<Popover id="tokens">
  Design tokens are named variables for colors, spacing, etc.
</Popover>
```

### C. Popover with close button

```tsx
<button type="button" popoverTarget="confirm">Quit</button>
<Popover id="confirm">
  <p>Discard unsaved changes?</p>
  <Button popoverTarget="confirm" popoverTargetAction="hide" data-variant="secondary">
    Cancel
  </Button>
</Popover>
```

Buttons *inside* a popover require `popoverTargetAction` to toggle it.

### D. Explicit placement

```tsx
<button type="button" popoverTarget="info">Info</button>
<Popover id="info" data-placement="top-end">Hello</Popover>
```

Placement auto-flips when there is no room.

### F. Long content with scroll

```tsx
<Button popoverTarget="long" data-arrow>Open list</Button>
<Popover as="menu" id="long" data-overscroll="contain">
  {items.map((item) => (
    <li key={item.id}><Button>{item.label}</Button></li>
  ))}
</Popover>
```

## Combinations with other components

### `Button` as trigger

```tsx
<Button popoverTarget="p" data-arrow>Open</Button>
<Popover id="p">…</Popover>
```

### Inside `Field` / `Field.Label`

Place `Popover` **after** the label, not inside it, to keep the HTML semantically valid.

```tsx
<Field>
  <Field.Label>
    A{" "}
    <button type="button" data-popover="inline" popoverTarget="word">
      difficult word
    </button>{" "}
    in the label
  </Field.Label>
  <Popover id="word">Explanation here.</Popover>
  <Input />
</Field>
```

## Accessibility

- Trigger must be `<button type="button">` or `<a>` (link triggers are supported via internal polyfill).
- `id` on `Popover` must match `popoverTarget` on the trigger.
- `popover="auto"` (default) closes on `Escape` and click-outside; light-dismiss is automatic.
- Use `as="menu"` with `<li>` children for dropdown menu semantics.
- An `<a>` inside an auto popover closes it on click unless `popoverTargetAction="show"` (or `event.preventDefault()`) is set.

## Pitfalls

- Forgetting `type="button"` on the trigger → form submission inside a `<form>`.
- Wrapping `Popover` inside `<label>` → invalid semantics. Place after the label.
- Putting `data-arrow` or `data-popover="inline"` on the `Popover` element instead of the trigger.
- Using deprecated `data-position` instead of `data-placement`.
- A `<button>` *inside* a popover does not toggle it without `popoverTargetAction`.
- Confusing `as="menu"` (dropdown semantics, requires `<li>` children) with default `<div>` (static content).
- Using `popovertarget` (lowercase) on React 19+ — use `popoverTarget` camelCase.

## Don't do this

```tsx
// ❌ Popover inside a label
<label>
  Term
  <Popover id="x">…</Popover>
</label>

// ✅ Popover after the label
<label>
  Term{" "}
  <button type="button" data-popover="inline" popoverTarget="x">?</button>
</label>
<Popover id="x">…</Popover>
```

```tsx
// ❌ data-arrow on the Popover
<Popover id="p" data-arrow>…</Popover>

// ✅ data-arrow on the trigger
<button type="button" data-arrow popoverTarget="p">Open</button>
<Popover id="p">…</Popover>
```

```tsx
// ❌ Deprecated
<Popover id="p" data-position="top">…</Popover>

// ✅ Current
<Popover id="p" data-placement="top">…</Popover>
```
