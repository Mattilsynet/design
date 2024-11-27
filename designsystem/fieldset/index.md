# Fieldset <mark data-badge="Alfa"></mark>

- Legg klassen `fieldset` på `<fieldset>` rundt `<legend>` og flere skjemafelt
- Dette grupperer typisk radio eller checkox inputs

<Story layout="grid">
<fieldset class="styles.fieldset">
  <legend>Hva foretrekker du?</legend>
  <p>Fellesbeskrivelse</p>
  <div class="styles.field">
    <input type="radio" class="styles.input" name="radio" checked />
    <label>Alternativ 1</label>
    <div data-field="description">Beskrivelse</div>
  </div>
  <div class="styles.field">
    <input type="radio" class="styles.input" name="radio" />
    <label>Alternativ 2</label>
    <div data-field="description">Beskrivelse</div>
  </div>
</fieldset>
</Story>