# Field <mark data-badge="Alfa"></mark>

- Legg klassen `field` på `<mt-field>` rundt ledetekst og skjemafelt
- Dette kobler automatisk sammen `<label>` og `<input>`, samt eventuelle element med `<p>` og  `class="validation"`
- **Merk:** field oppkobllingsfunksjonaliteten til `<mt-field>` elementet krever at du har importert javascript pakken: `import "@mattilsynet/design"`

<pre hidden>
<mt-field class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
</mt-field>
</pre>
<Story />

## Feilmelding
- Legg `class="validation"` på et element for å tilknytte feilmelding

<pre hidden>
<mt-field class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
  <div class="styles.validation">Validation</div>
</mt-field>
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