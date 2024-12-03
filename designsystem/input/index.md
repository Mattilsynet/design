# Input <mark data-badge="Alfa"></mark>

- Legg klassen `input` på `<input>`, `<select>` eller `<textarea>`
- Input `type="radio"`, `type="checkbox"` og `role="switch"`  er også støttet
- Bruk [`Field`](/designsystem/field/) for å automatisk koble sammen `label` og `input`
- Bruk alltid en relatert `<label>`, `aria-label`, eller `aria-labelledby`

<Story layout="grid">
<div class="styles.field">
  <label>Ledetekst</label>
  <input class="styles.input" />
</div>
</Story>

## Varianter
- Bruk `<select>`, `<textarea>` eller `<input type="text | checkbox | radio | email | number | password | radio | search | tel | url">`
- Kombiner `type="checkbox" role="switch"` for å få bryter-design

<style>
  textarea { width: 345px }
</style>
<Story layout="grid">
<div class="styles.field">
  <label>Text</label>
  <input type="text" class="styles.input" />
</div>

<div class="styles.field">
  <label>Select</label>
  <select class="styles.input">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
    <option>Option 4</option>
    <option>Option 5</option>
  </select>
</div>

<hr />

<div class="styles.field">
  <label>Checkbox</label>
  <input type="checkbox" class="styles.input" />
</div>

<div class="styles.field">
  <label>Radio 1</label>
  <input type="radio" class="styles.input" name="my-radio" checked />
</div>

<div class="styles.field">
  <label>Radio 2</label>
  <input type="radio" class="styles.input" name="my-radio" />
</div>

<div class="styles.field">
  <label>Switch</label>
  <input type="checkbox" role="switch" class="styles.input" />
</div>

<hr />

<div class="styles.field">
  <label>Textarea</label>
  <textarea class="styles.input"></textarea>
</div>
</Story>

## Størrelser
- Bruk `data-size="sm | md | lg"`

<Story layout="grid">
<input aria-label="small" class="styles.input" data-size="sm" value="Small" />
<input aria-label="medium" class="styles.input" data-size="md" value="Medium" />
<input aria-label="large" class="styles.input" data-size="lg" value="Large" />
</Story>


## Read only
- Legg på attributt `readonly`
- Husk også `disabled` dersom du legger `readonly` på `type="checkbox"` eller `type="radio"`, siden disse ikke stoppes automatisk av nettleseren

<Story layout="rows">
<div class="styles.field">
  <label>Read only text</label>
  <input class="styles.input" readonly />
</div>
<div class="styles.field">
  <label>Read only checkbox</label>
  <input type="checkbox" class="styles.input" readonly disabled />
</div>
<div class="styles.field">
  <label>Read only radio</label>
  <input type="radio" class="styles.input" readonly disabled />
</div>
<div class="styles.field">
  <label>Read only switch</label>
  <input type="checkbox" role="switch" class="styles.input" readonly disabled />
</div>
</Story>


## Disabled
- Legg på attributt `disabled`

<Story layout="rows">
<div class="styles.field">
  <label>Disabled text</label>
  <input class="styles.input" disabled />
</div>
<div class="styles.field">
  <label>Disabled checkbox</label>
  <input type="checkbox" class="styles.input" disabled />
</div>
<div class="styles.field">
  <label>Disabled radio</label>
  <input type="radio" class="styles.input" disabled />
</div>
<div class="styles.field">
  <label>Disabled switch</label>
  <input type="checkbox" role="switch" class="styles.input" disabled />
</div>
</Story>