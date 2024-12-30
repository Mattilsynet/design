# Field <mark data-badge="Alfa"></mark>

- Legg klassen `field` på typisk en `<div>` rundt ledetekst og skjemafelt
- Dette kobler automatisk sammen `<label>` og `<input>`, samt eventuelle element med `<p>` og `class="styles.validation"`
- **Merk:** automatisk oppkobling krever at du har importert javascript pakken: `import "@mattilsynet/design"`

<pre hidden>
<div class="styles.field">
  <label>Ledetekst</label>
  <p>Beskrivelse</p>
  <input type="text" class="styles.input" />
</div>
</pre>
<Story />

## Radio / Check / Switch

- Ved bruk av `<input type="checkbox | radio"` vil `<label>`, `<p>` og `class="styles.validation"` legge seg etter input

<pre hidden>
  <div class="styles.field">
    <label>Radio 1</label>
    <input type="radio" class="styles.input" name="my-radio" checked>
  </div>
  <div class="styles.field">
    <label>Radio 2</label>
    <p>Beskrivelse</p>
    <input type="radio" class="styles.input" name="my-radio">
  </div>
  <div class="styles.field">
    <label>Check</label>
    <input type="checkbox" class="styles.input">
  </div>
  <div class="styles.field">
    <label>Switch</label>
    <input type="checkbox" class="styles.input" role="switch">
  </div>
</pre>
<Story stacked />

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