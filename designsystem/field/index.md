# Field <mark data-badge="Alfa"></mark>

- Legg klassen `field` på typisk en `<div>` rundt ledetekst og skjemafelt
- Dette kobler automatisk sammen `<label>` og `<input>`, samt eventuelle element med `<p>` og  `class="styles.validation"`
- **Merk:** field oppkobllingsfunksjonaliteten krever at du har importert javascript pakken: `import "@mattilsynet/design"`

<pre hidden>
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
</div>
</pre>
<Story />

## Feilmelding
- Legg `class="styles.validation"` på et element for å tilknytte feilmelding

<pre hidden>
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
  <div class="styles.validation">Validation</div>
</div>
</pre>
<Story />

<!--## Antall tegn

- Legg `data-limit="100"` på `<input> | <textarea>`
- Legg til en `<div data-field="limit"></div>`

<pre hidden>
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" data-limit="100" />
  <div data-field="limit"></div>
</div>
</pre>
<Story />-->