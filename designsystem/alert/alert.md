# Alert

Draws the user's attention to an important message or notification.

## Import

```tsx
import { Alert } from "@mattilsynet/design/react";
```

## When to use

- Use `<Alert>` (renders as `<output>`) for **non-critical** messages (polite live region).
- Use `<Alert as="div" role="alert">` for **critical** errors and warnings

## Minimal example

```tsx
<Alert>Your changes have been saved.</Alert>
```

## API reference

| Prop / attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ElementType` | `"output"` | Renders any element. When `as` is not `"output"` and `role` is not set, `role="alert"` is added automatically. |
| `data-color` | `"info" \| "success" \| "warning" \| "danger" \| "neutral"` | `"info"` | Visual variant and icon. |
| `data-icon` | `"none" \| "false"` | — | Hides the leading icon. |


All native HTML attributes for the resulting element are forwarded (e.g. `onClick`, `aria-*`, `title`, `type`, `className`).

Notes:
- There is **no** `onClose` prop. Wire up your own `onClick` on a close button (see pattern below).
- There is **no** `title` prop. Place a heading `<Heading>` as the **first child** to render a title.

## CSS custom properties

All variables can be overridden via `style` or a wrapping CSS rule.

| Variable | Default |
| --- | --- |
| `--mtdsc-alert-background` | `var(--mtds-color-info-surface-tinted)` |
| `--mtdsc-alert-border-width` | `var(--mtds-border-width-default)` |
| `--mtdsc-alert-border-style` | `solid` |
| `--mtdsc-alert-border-color` | `var(--mtds-color-info-border-default)` |
| `--mtdsc-alert-border-radius` | `var(--mtds-border-radius-md)` |
| `--mtdsc-alert-color` | `var(--mtds-color-info-text-default)` |
| `--mtdsc-alert-icon-color` | `var(--mtds-color-info-text-subtle)` |
| `--mtdsc-alert-icon-url` | (info icon SVG as data uri) |
| `--mtdsc-alert-icon-size` | `var(--mtds-7)` |
| `--mtdsc-alert-spacing` | `var(--mtds-2)` |
| `--mtdsc-alert-padding-block` | `var(--mtds-6)` |
| `--mtdsc-alert-padding-inline-end` | `var(--mtds-6)` |

## Common patterns

### 1. Default (info)

```tsx
<Alert>Passport queues are long. Book early.</Alert>
```

### 2. Color variants

```tsx
<Alert data-color="success">Your application has been submitted.</Alert>
<Alert data-color="warning">Your session will expire in 2 minutes.</Alert>
<Alert data-color="neutral">Maintenance scheduled tonight.</Alert>
```

### 3. With title

The first child must be `<h2>`, `<h3>`, or `<h4>`. The icon aligns to the heading automatically.

```tsx
<Alert>
  <Heading>Did you remember to book a passport appointment?</Heading>
  <p>Queues are long. Book in good time before you travel.</p>
</Alert>
```

### 4. Critical error (assertive)

Use `as="div" role="alert"` for critical errors.

```tsx
<Alert as="div" role="alert" data-color="danger">
  <Heading>Submission failed</Heading>
  <p>Check your network connection and try again.</p>
</Alert>
```

### 5. With close button

The close button must be **empty** and the **last child**. The CSS renders the close icon and positioning automatically.

```tsx
<Alert>
  <Heading>Did you remember to book a passport appointment?</Heading>
  <p>Queues are long. Book in good time before you travel.</p>
  <button type="button" aria-label="Close" onClick={handleClose} />
</Alert>
```

### 6. With action buttons

Wrap actions in a `<Flex>` as the last child.

```tsx
import { Alert, Flex, Button } from "@mattilsynet/design/react";

<Alert data-color="danger" as="div">
  <Heading>Could not load data</Heading>
  <p>Please try again or contact support.</p>
  <Flex>
    <Button data-variant="secondary" onClick={retry}>Try again</Button>
    <Button as="a" href="/contact">Contact us</Button>
  </Flex>
</Alert>
```

## Accessibility
- A close button **must** have a meaningful `aria-label` (e.g. `"Close"`).

## Things to remember
- A title must be a heading (`h2`/`h3`/`h4`) and the **first child** — otherwise the icon will not align correctly.
