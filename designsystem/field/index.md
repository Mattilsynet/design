# Field <mark data-badge="Alfa"></mark>

- Legg klassen `field` på typisk `<div>` rundt ledetekst og skjemafelt
- Dette kobler automatisk sammen `<label>` og `<input>`, samt eventuelle element med `<p>` og  `class="validation"`
- **Merk:** field oppkobllingsfunksjonalitet krever at du har importert javascript pakken: `import "@mattilsynet/design"`

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
</div>
</Story>

## Feilmelding
- Legg `class="validation"` på et element for å tilknytte feilmelding

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
  <div class="styles.validation">Validation</div>
</div>
</Story>

<!--## Antall tegn

- Legg `data-limit="100"` på `<input> | <textarea>`
- Legg til en `<div data-field="limit"></div>`

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" data-limit="100" />
  <div data-field="limit"></div>
</div>
</Story>-->