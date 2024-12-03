# Alert <mark data-badge="Alfa"></mark>

- Legg klassen `alert` på typisk `<div>`
- Bruk `role="alert"` ved kritiske feil og `role="status"` ved andre varsel

<Story layout="grid">
<div class="styles.alert" role="status">
  Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
</Story>

## Varianter
- Bruk `data-color="info | success | warning | danger"`
- Bruk `data-size="sm | md | lg"`
<Story layout="grid" aspect="4 / 3">
<div class="styles.alert" role="status">
  Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
<div class="styles.alert" data-color="success" role="status">
  Success ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
<div class="styles.alert" data-color="warning" role="status">
  Warning ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
<div class="styles.alert" data-color="danger" role="alert">
  Danger ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
</Story>

## Størrelser
- Bruk `data-size="sm | md | lg"`
<Story layout="grid" aspect="16 / 10">
<div class="styles.alert" data-size="sm" role="status">
  Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
<div class="styles.alert" data-size="md" role="status">
  Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
<div class="styles.alert" data-size="lg" role="status">
  Info ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in tincidunt ipsum. Morbi et consequat felis, quis finibus quam.
</div>
</Story>

## Med tittel
- Legg `h2`, `h3` eller `h4` som første element
<Story layout="grid">
<div class="styles.alert" role="status">
  <h2>Har du husket å bestille passtime?</h2>
  Det er lange køer for å bestille pass om dagen, det kan være lurt å bestille i god tid før du skal reise.
</div>
</Story>