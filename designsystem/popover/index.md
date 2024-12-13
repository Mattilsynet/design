# Popover <mark data-badge="Alfa"></mark>

- Legg klassen `popover`, attributten `popover` og `id` på typisk `<div>`
- Legg `popovertarget="ID"` på typisk `<button>` som trigger element
- Bruk `<menu>` med `<li><button> | <li><a>` som barn for dropdown meny
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
