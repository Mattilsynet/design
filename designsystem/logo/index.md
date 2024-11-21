---
title: Logo
---

# Logo <mark data-badge="Alfa"></mark>

- Legg klassenavnet `logo` på typisk `<h1>` eller `<a>`
- Legg inn navn på din applikasjon som innhold
- Usynlg prefiks tekst "Mattilsynet" blir automatisk lagt inn for skjermlesere
- Bruk `&nbsp;` istedenfor mellomrom, eksempel: `Min&nbsp;admin`
- Logo følger tekststørrelse og tekstfarge (burde være `#054449`)
- Ved lite plass blir "Mattilsynet" skjult visuelt, og deretter applikasjonsnavn:

<Story layout="rows">
<h1 class="styles.logo"></h1>
<a class="styles.logo" href="/">Applikasjonsnavn</a>

<div class="demo-resize">
  <h1 class="styles.logo">Resize&nbsp;Demo</h1>
</div>
</Story>