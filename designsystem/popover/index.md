# Popover <mark data-badge="Alfa"></mark>

- Legg klassen `popover`, attributten `popover` og `id` på `<div>` eller `<menu>`
- Legg `popovertarget="ID"` på typisk `<button>` som trigger element
- Plassiering vil automatisk tilpasse seg scroll og tilgjengelig plass
- **Merk:** automatisk posisjonering krever at du har importert javascript pakken: `import "@mattilsynet/design"`


<pre hidden>
<button popovertarget="pop-1" type="button" class="styles.button">Knapp</button>
<menu popover id="pop-1" class="styles.popover">
  <li><button type="button" class="styles.button">Knapp 1</button></li>
  <li><button type="button" class="styles.button">Knapp 2</button></li>
  <li><button type="button" class="styles.button">Knapp 3</button></li>
  <li><button type="button" class="styles.button">Knapp 4</button></li>
  <li><button type="button" class="styles.button">Knapp 5</button></li>
</menu>
</pre>
<Story />

## Nedtrekksmeny / Dropdown
- Bruk `<menu>` med `<li><button type="button">` eller ` <li><a>` som barn
<pre hidden>
<button popovertarget="pop-1" type="button" class="styles.button">Knapp</button>
<menu popover id="pop-1" class="styles.popover">
  <li><button type="button" class="styles.button">Knapp 1</button></li>
  <li><button type="button" class="styles.button">Knapp 2</button></li>
  <li><button type="button" class="styles.button">Knapp 3</button></li>
  <li><button type="button" class="styles.button">Knapp 4</button></li>
  <li><button type="button" class="styles.button">Knapp 5</button></li>
</menu>
</pre>
<Story />

## Position

- Bruk `data-position="[top|right|bottom|left]-[start|middle|end]"`

<pre hidden>
<button popovertarget="pop-2" type="button" class="styles.button">Knapp</button>
<div popover id="pop-2" class="styles.popover" data-position="top-end">
  Er du sikker på at du vil avslutte uten å lagre?
  <div>
    <button type="button" class="styles.button">Lagre</button>
    <button popovertarget="pop-2" popovertargetaction="hide" type="button" class="styles.button" data-variant="secondary">
      Avbryt
    </button>
  </div>
</div>
</pre>
<Story />

## Lukkeknapp
- Bruk `popovertargetaction="hide"` på `<button>` for å lage lukkeknapp:

<pre hidden>
<button popovertarget="pop-3" type="button" class="styles.button">Knapp</button>
<div popover id="pop-3" class="styles.popover">
  <button popovertarget="pop-3" popovertargetaction="hide" type="button" class="styles.button">
    Lukk
  </button>
</div>
</pre>
<Story />

## Pil

- Bruk `data-arrow` på `<button>` for å få ikon:

<pre hidden>
<button data-arrow popovertarget="pop-4" type="button" class="styles.button">Knapp</button>
<div popover id="pop-4" class="styles.popover">
  Innhold
</div>
</pre>
<Story />