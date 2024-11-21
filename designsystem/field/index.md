---
title: Field
---

# Field <mark data-badge="Alfa"></mark>

- Legg klassenavnet `field` på typisk `<div>` rundt ledetekst og skjemafelt
- Dette kobler automatisk sammen `label` og `input`, samt eventuelle element med `data-field="description"` eller  `data-field="validation"`

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <div data-field="description">Beskrivelse</div>
  <input type="text" class="styles.input" />
</div>
</Story>