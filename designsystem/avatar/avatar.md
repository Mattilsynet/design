# Avatar

A small visual representing a person, rendered as initials, an image, or an icon.

## Import

```tsx
import { Avatar } from "@mattilsynet/design/react";
```

## When to use

Use `Avatar` to represent a **person** (user, profile, organization). Do not use it for documents, files, or other non-person things.

## Minimal example

```tsx
<Avatar>MT</Avatar>
```

## API reference

### Props

| Prop        | Type                          | Default                               | Description                                                              |
| ----------- | ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `children`  | `ReactNode`                   | —                                     | Initials (text), `<img>`, or an icon.                                    |
| `href`      | `string`                      | —                                     | When set, Avatar renders as `<a>` automatically.                         |
| `as`        | `"span" \| "a" \| "button"`   | `"a"` if `href` is set, else `"span"` | Override the rendered element.                                           |

All native HTML attributes for the resulting element are forwarded (e.g. `onClick`, `aria-*`, `title`, `type`, `className`).

### `data-*` attributes

| Attribute   | Values                          | Default | Description                |
| ----------- | ------------------------------- | ------- | -------------------------- |
| `data-size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"`  | Visual size of the avatar. |

## Subcomponents

None.

## CSS variables

Override on the Avatar element to theme it. Only override these for genuine design needs.

| Variable                    | Purpose                                                  |
| --------------------------- | -------------------------------------------------------- |
| `--mtdsc-avatar-background` | Background color.                                        |
| `--mtdsc-avatar-color`      | Foreground (text/icon) color.                            |
| `--mtdsc-avatar-font-size`  | Font size for initials.                                  |
| `--mtdsc-avatar-icon-url`   | Fallback icon when no children are provided.             |
| `--mtdsc-avatar-padding`    | Inner padding (controls how much room icons/initials get). |
| `--mtdsc-avatar-size`       | Size of the avatar element.                              |

## Common patterns

### Initials

```tsx
<Avatar>MT</Avatar>
```

### Image

```tsx
<Avatar>
  <img src={avatar} alt="Navn Navnesen" />
</Avatar>
```

### Icon

```tsx
import { UserIcon } from "@phosphor-icons/react";

<Avatar>
  <UserIcon aria-label="Navn Navnesen" />
</Avatar>
```

### Sizes

```tsx
<Avatar data-size="xs">MT</Avatar>
<Avatar data-size="sm">MT</Avatar>
<Avatar data-size="md">MT</Avatar>
<Avatar data-size="lg">MT</Avatar>
```

### As link

`href` automatically renders the Avatar as `<a>`:

```tsx
<Avatar href="/profile">
  <img src={avatar} alt="Navn Navnesen" />
</Avatar>
```

### As button

```tsx
<Avatar as="button" type="button" onClick={openMenu}>
  <img src={avatar} alt="Navn Navnesen" />
</Avatar>
```

### With Badge

Wrap with `<Badge>` to add a badge indicator (notification dot, count, etc.):

```tsx
import { Avatar, Badge } from "@mattilsynet/design/react";

<Badge data-badge="3">
  <Avatar>
    <img src={avatar} alt="Navn Navnesen" />
  </Avatar>
</Badge>
```

### Inside a Button

Avatar can be placed inside a `<Button>` next to text:

```tsx
import { Avatar, Button } from "@mattilsynet/design/react";

<Button>
  <Avatar data-size="xs">NN</Avatar>
  Navn Navnesen
</Button>
```

## Accessibility

- `<Badge>` must have the persons name in `aria-label`.
- **Clickable avatars** (`href` or `as="button"`): focus ring is built in.

## Pitfalls

- Use the `<Avatar>` React component, not `<div className="avatar">`, in React code.
- `data-size` goes on the `<Avatar>` element itself, not on its children.
- `as="button"` **requires** `type="button"` to prevent accidental form submission.
- Avatar is for people only — never use it to represent documents, files, or generic objects.
