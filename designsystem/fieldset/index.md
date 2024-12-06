# Fieldset <mark data-badge="Alfa"></mark>

- Legg klassen `fieldset` på `<fieldset>` rundt `<legend>` og skjemafelter
- Dette grupperer typisk `checkbox` eller `radio` inputs

<pre hidden>
<fieldset class="styles.fieldset">
  <legend>Hva foretrekker du?</legend>
  <p>Fellesbeskrivelse</p>
  <mt-field class="styles.field">
    <input type="radio" class="styles.input" name="my-radio" checked />
    <label>Alternativ 1</label>
    <p>Beskrivelse</p>
  </mt-field>
  <mt-field class="styles.field">
    <input type="radio" class="styles.input" name="my-radio" />
    <label>Alternativ 2</label>
    <p>Beskrivelse</p>
  </mt-field>
</fieldset>
</pre>
<Story />

Med checkboxer
<pre hidden>
<fieldset class="styles.fieldset">
  <legend>Hvilke foretrekker du?</legend>
  <p>Fellesbeskrivelse</p>
  <mt-field class="styles.field">
    <input type="checkbox" class="styles.input" name="my-check" checked />
    <label>Alternativ 1</label>
  </mt-field>
  <mt-field class="styles.field">
    <input type="checkbox" class="styles.input" name="my-check" />
    <label>Alternativ 2</label>
  </mt-field>
</fieldset>
</pre>
<Story />