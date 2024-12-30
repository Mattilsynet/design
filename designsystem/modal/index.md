# Modal <mark data-badge="Alfa"></mark>

- Legg klassen `modal` på `<dialog>`
- Åpne med metoden [`.showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)

<pre hidden>
<button class="styles.button" type="button" onclick="this.nextElementSibling.showModal()">Open</button>
<dialog class="styles.modal" id="mt-modal">
  <form method="dialog"><button class="styles.button" aria-label="Lukk"></button></form>
  Modal content here
</dialog>
</pre>
<Story />

## Lukke knapp

- Legg `<form method="dialog"><button aria-label="Lukk"></button></form>` inni for lukke-knapp
- Legg evt. til flere knapper for lukking

<pre hidden>
<button class="styles.button" type="button" onclick="this.nextElementSibling.showModal()">Open</button>
<dialog class="styles.modal" id="mt-modal">
  <form method="dialog"><button class="styles.button" aria-label="Lukk"></button></form>
  Modal content here
  <br />
  <br />
  <div style="display: flex; gap: .5rem">
    <form method="dialog"><button class="styles.button" data-variant="secondary">Avbryt</button></form>
    <button type="button" class="styles.button">Lagre</button>
  </div>
</dialog>
</pre>
<Story />