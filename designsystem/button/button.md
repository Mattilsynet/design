# Button

React button from Mattilsynet's design system. Triggers an action, or navigates when `href` is set.

## Import

```tsx
import { Button } from "designsystem/react";
```

## When to use

- An action the user can perform (Save, Delete, Submit, Toggle, Open menu).
- For navigation, set `href` — the component renders as `<a>` automatically.

## Minimal example

```tsx
<Button data-variant="primary">Save</Button>
```

## Polymorphism (`as`)

`Button` renders `<button>` by default, or `<a>` when `href` is set. Use `as` to render any other element/component.

```tsx
// Renders as <a> automatically because of href
<Button href="/profile">Profile</Button>

// Next.js Link
import Link from "next/link";
<Button as={Link} href="/profile">Profile</Button>
```

## API reference

### Component props (camelCase)

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `as` | `React.ElementType` | `"button"` (or `"a"` if `href`) | Polymorphic render. |
| `href` | `string` | — | Setting this switches default tag to `<a>`. |
| `command` | `string` | — | HTML invoker commands. |
| `commandfor` | `string` | — | ID of the element the command targets. |
| `popovertarget` | `string` | — | ID of a popover to toggle. |
| `popovertargetaction` | `string` | — | `"toggle" \| "show" \| "hide"`. |
| `ref` | `Ref` | — | Forwarded to underlying element. |

All other native HTML attributes (`disabled`, `type`, `onClick`, `aria-*`, etc.) are forwarded.

### `data-*` attributes

The visual API is exposed through `data-*` attributes — not regular React props. Spread them like any HTML attribute.

| Attribute | Values | Default | Purpose |
| --- | --- | --- | --- |
| `data-variant` | `"primary" \| "secondary" \| "tertiary"` | `"tertiary"` | Visual emphasis. |
| `data-size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Button size. |
| `data-color` | `"main" \| "danger" \| "info" \| "success" \| "warning" \| "neutral" \| "inverted"` | `"main"` | Color scheme. `"inverted"` for dark surfaces. |
| `data-arrow` | `true \| "left" \| "right"` | — | Adds chevron arrow. `true` = right. |
| `data-justify` | `"start" \| "center" \| "end" \| "left" \| "right"` | `"center"` (auto `"start"` in `<menu>`) | Content alignment. |
| `data-self` | `"auto" \| "full" \| "25" \| "50" \| "75" \| "100" \| "150" \| "200" \| "250" \| "300" \| "350" \| "400" \| "450" \| "500"` | — | Width: `"full"` = 100%, numbers = px. |
| `data-nowrap` | `boolean` | — | Prevents text wrapping. Also usable on a child `<span>`. |
| `data-tooltip` | `string` | — | Tooltip text. Also exposed to screen readers. |
| `data-tooltip-position` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Tooltip placement. |
| `data-analytics-name` | `string` | — | **Required when the button text contains personal data** (names, emails). Prevents leaking PII to analytics. |

### ARIA / HTML attributes with special behavior

| Attribute | Effect |
| --- | --- |
| `aria-busy="true"` | Replaces content with a spinner. On `<button>` it **auto-sets `disabled`**. On `<a>` you must add `tabIndex={-1}` yourself. |
| `aria-pressed="true \| false"` | Toggle state. Activates `data-pressed` swap on children (see *Toggle pattern*). |
| `aria-current="page"` | Marks active link inside a `<menu>`. |
| `aria-label="…"` | When the button has **no text content**, you get an automatic three-dot icon (action menu). |
| `disabled` | Standard disabled state. |
| `type` | Auto-set to `"button"` on `<button>` if not provided — prevents accidental form submits. |

### ⚠️ Deprecated

| Deprecated | Use instead |
| --- | --- |
| `data-command` | `command` + `commandfor` (HTML Invoker Commands API). |

Do not use `data-command` in new code.

## CSS custom properties

Theming hooks. Set on the button or an ancestor.

| Variable | Description |
| --- | --- |
| `--mtdsc-button-background` | Background color (resting). |
| `--mtdsc-button-background--hover` | Background color on hover. |
| `--mtdsc-button-background--active` | Background color when active/pressed. |
| `--mtdsc-button-color` | Text/icon color (resting). |
| `--mtdsc-button-color--hover` | Text/icon color on hover. |
| `--mtdsc-button-color--active` | Text/icon color when active/pressed. |
| `--mtdsc-button-border-color` | Border color. |
| `--mtdsc-button-border-style` | Border style (e.g. `solid`). |
| `--mtdsc-button-border-width` | Border width. |
| `--mtdsc-button-padding` | Inner padding. |
| `--mtdsc-button-gap` | Gap between icon and text. |
| `--mtdsc-button-size` | Min height / icon-only size. |

## Toggle pattern (`data-pressed` on children)

`data-pressed="true | false"` is set on **child elements**, not the button. The matching child is shown based on the button's `aria-pressed` value. Use this to swap icons or labels in a single button.

```tsx
const [pressed, setPressed] = useState(false);

<Button
  aria-pressed={pressed}
  onClick={() => setPressed(!pressed)}
>
  <StarIcon data-pressed="false" />
  <span data-pressed="false">Save favorite</span>
  <StarIcon data-pressed="true" weight="fill" />
  <span data-pressed="true">Remove favorite</span>
</Button>
```

The same swap also works when the next sibling is a `popover` element (children with `data-pressed="true"` show while popover is open).

## Common patterns

### 1. Primary save button

```tsx
<Button data-variant="primary">Save</Button>
```

### 2. Link styled as button

```tsx
<Button href="/applications">View applications</Button>
```

### 3. Loading state

```tsx
// <button>: disabled is set automatically
<Button aria-busy="true" data-variant="primary">Saving…</Button>

// <a>: must add tabIndex={-1} yourself
<Button href="/x" aria-busy="true" tabIndex={-1}>Loading…</Button>
```

### 4. Icon-only button with tooltip

```tsx
<Button data-tooltip="Add to favorites">
  <StarIcon />
</Button>
```

### 5. Toggle button (aria-pressed + child swap)

See *Toggle pattern* above.

### 6. Dot menu (action menu)

Empty button + `aria-label` produces the three-dot icon automatically.

```tsx
<Button aria-label="Actions" popovertarget="row-actions" />
<menu id="row-actions" popover="auto">
  <li><Button>Edit</Button></li>
  <li><Button>Delete</Button></li>
</menu>
```

### 7. Full-width button

```tsx
<Button data-self="full" data-variant="primary">Continue</Button>
```

### 8. Destructive (danger) action

```tsx
<Button data-variant="primary" data-color="danger">Delete</Button>
```

### 9. Button with arrow + popover (chevron)

Combining `popovertarget` with `data-arrow` renders a chevron that indicates a popover trigger.

```tsx
<Button data-arrow popovertarget="filter-menu">Filter</Button>
<menu id="filter-menu" popover="auto">…</menu>
```

### 10. Button inside `<menu>` (navigation)

Inside `<menu><li>`, buttons get equal width and left-aligned text automatically. Use `aria-current="page"` for the active link, or `aria-pressed="true"` for the selected button.

```tsx
<menu>
  <li><Button aria-current="page" href="/dashboard">Dashboard</Button></li>
  <li><Button href="/cases">Cases</Button></li>
  <li><Button href="/settings">Settings</Button></li>
</menu>
```

## Combining with other components

- **`<menu>`** — auto-aligned menu items (see pattern 10).
- **Popover (`popovertarget`)** — pair with `data-arrow` for a chevron trigger.
- **`Flex` / `Grid`** — use for groups of buttons; buttons themselves accept `data-self` for individual width control.
- **Phosphor icons** (`@phosphor-icons/react`) — placement is determined by JSX order: icon before text vs. icon after text.

## Accessibility

- `type="button"` is auto-set on `<button>` — never accidentally submits a form.
- Icon-only buttons **must** have `data-tooltip` or `aria-label`.
- `<Button href aria-busy="true">` requires `tabIndex={-1}` (auto-disable does not apply to `<a>`).
- `aria-busy` on `<button>` automatically sets `disabled`.
- When the visible text contains personal data, set `data-analytics-name` to a generic label.
- Use sentence case for button text.

## Pitfalls & don't do this

❌ **Tertiary button alone, without an icon.** Tertiary is the default variant and lacks visual weight on its own.
```tsx
// Bad
<Button>Cancel</Button>

// Good — pair with another button
<Button data-variant="primary">Save</Button>
<Button>Cancel</Button>

// Good — or add an icon
<Button><StarIcon />Favorite</Button>
```

❌ **Treating `data-pressed` as a button-level attribute.** It belongs on children.
```tsx
// Bad
<Button data-pressed="true">Saved</Button>

// Good
<Button aria-pressed={true}>
  <span data-pressed="false">Save</span>
  <span data-pressed="true">Saved</span>
</Button>
```

❌ **Using deprecated `data-command`.**
```tsx
// Bad
<Button data-command="close">Close</Button>

// Good
<Button command="close" commandfor="my-dialog">Close</Button>
```

❌ **Mixing sizes or colors within a button group.**
```tsx
// Bad
<Button data-variant="primary" data-size="sm">Save</Button>
<Button data-variant="secondary" data-size="lg">Cancel</Button>

// Good — same size, same color family
<Button data-variant="primary">Save</Button>
<Button data-variant="secondary">Cancel</Button>
```

❌ **Forgetting `tabIndex={-1}` on a loading link.**
```tsx
// Bad — focusable while loading
<Button href="/x" aria-busy="true">Loading</Button>

// Good
<Button href="/x" aria-busy="true" tabIndex={-1}>Loading</Button>
```

❌ **Uppercase or overly long button text.**
```tsx
// Bad
<Button data-variant="primary">SUBMIT THE APPLICATION FORM</Button>

// Good — sentence case, short
<Button data-variant="primary">Submit application</Button>
```

❌ **Multiple primary call-to-action buttons on the same page/section.** A page should have one primary action.

❌ **Icon-only button without tooltip or aria-label.** Screen readers and hover users get no context.
```tsx
// Bad
<Button><StarIcon /></Button>

// Good
<Button data-tooltip="Add to favorites"><StarIcon /></Button>
```

❌ **Personal data in button text without `data-analytics-name`.**
```tsx
// Bad — leaks name to analytics
<Button>Edit Ola Nordmann</Button>

// Good
<Button data-analytics-name="edit-user">Edit Ola Nordmann</Button>
```
