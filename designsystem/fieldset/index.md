# Fieldset <mark data-badge="Alfa"></mark>

- Legg klassen `fieldset` på `<fieldset>` rundt `<legend>` og flere skjemafelt
- Dette grupperer typisk `checkbox` eller `radio` inputs

<Story layout="grid">
<fieldset class="styles.fieldset">
  <legend>Hva foretrekker du?</legend>
  <p>Fellesbeskrivelse</p>
  <div class="styles.field">
    <input type="radio" class="styles.input" name="my-radio" checked />
    <label>Alternativ 1</label>
    <p>Beskrivelse</p>
  </div>
  <div class="styles.field">
    <input type="radio" class="styles.input" name="my-radio" />
    <label>Alternativ 2</label>
    <p>Beskrivelse</p>
  </div>
</fieldset>
</Story>

Med checkboxer
<Story layout="grid">
<fieldset class="styles.fieldset">
  <legend>Hvilke foretrekker du?</legend>
  <p>Fellesbeskrivelse</p>
  <div class="styles.field">
    <input type="checkbox" class="styles.input" name="my-check" checked />
    <label>Alternativ 1</label>
  </div>
  <div class="styles.field">
    <input type="checkbox" class="styles.input" name="my-check" />
    <label>Alternativ 2</label>
  </div>
</fieldset>
</Story>