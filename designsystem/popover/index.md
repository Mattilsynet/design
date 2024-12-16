# Popover <mark data-badge="Alfa"></mark>

- Legg klassen `popover`, attributten `popover` og `id` på typisk `<div>`
- Legg `popovertarget="ID"` på typisk `<button>` som trigger element
- Bruk `<menu>` med `<li><button> | <li><a>` som barn for dropdown meny
- Plassiering vil automatisk tilpasse seg scroll og tilgjengelig plass
- **Merk:** automatisk posisjonering krever at du har importert javascript pakken: `import "@mattilsynet/design"`


<pre hidden>
<button popovertarget="my-popover" type="button" class="styles.button">Knapp</button>
<menu popover id="my-popover" class="styles.popover">
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
<button popovertarget="my-pop-2" type="button" class="styles.button">Knapp</button>
<div popover id="my-pop-2" class="styles.popover" data-position="top-end">
  Er du sikker på at du vil avslutte uten å lagre?
  <div>
    <button type="button" class="styles.button">Lagre</button>
    <button type="button" class="styles.button" data-variant="secondary">Avslutt</button>
  </div>
</div>
</pre>
<Story />