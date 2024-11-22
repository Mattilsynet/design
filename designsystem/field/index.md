---
title: Field
---

# Field <mark data-badge="Alfa"></mark>

- Legg klassenavnet `field` på typisk `<div>` rundt ledetekst og skjemafelt
- Dette kobler automatisk sammen `<label>` og `<input>`, samt eventuelle element med `data-field="description"` eller  `data-field="validation"`
- **Merk:** field kobler opp all funksjonalitet automatisk, men krever at du har importert javascript pakken: `import "@mattilsynet/design"`

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <div data-field="description">Beskrivelse</div>
  <input type="text" class="styles.input" />
</div>
</Story>

<!--## Antall tegn

- Legg `data-limit="100"` på `<input> | <textarea>`
- Legg til en `<div data-field="limit"></div>`

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <div data-field="description">Beskrivelse</div>
  <input type="text" class="styles.input" data-limit="100" />
  <div data-field="limit"></div>
</div>
</Story>-->