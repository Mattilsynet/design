---
title: Button
---

# Button <mark data-badge="Alfa"></mark>

- Legg klassenavnet `button` på typisk `<button>` eller `<a>`
- Husk `type="button"` hvis en `<button>` gjør noe annet enn å sende skjema

<Story layout="grid">
<button type="button" class="styles.button">
  Knapp
</button>

<a href="https://www.mattilsynet.no/" target="_blank" class="styles.button">
  Lenkeknapp
</a>
</Story>

## Varianter
- Bruk `data-variant="primary | secondary | tertiary"`

<Story layout="grid">
<button type="button" class="styles.button">
  Primary (default)
</button>
<button type="button" class="styles.button" data-variant="secondary">
  Secondary
</button>
<button type="button" class="styles.button" data-variant="tertiary">
  Tertiary
</button>
</Story>

## Størrelser
- Bruk `data-size="sm | md | lg"`

<Story layout="grid">
<button type="button" class="styles.button" data-size="sm">
  Small
</button>
<button type="button" class="styles.button" data-size="md">
  Medium
</button>
<button type="button" class="styles.button" data-size="lg">
  Large
</button>
</Story>


## Ikoner
- [Ikon fra Aksel](https://aksel.nav.no/ikoner) kan legges inn før eller etter tekst

<Story layout="grid">
<button type="button" class="styles.button">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2.3a.8.8 0 0 1 .7.4l2.7 5.6 6.2.9a.8.8 0 0 1 .4 1.2l-4.4 4.4 1 6.2a.8.8 0 0 1-1 .8l-5.6-3-5.5 3a.8.8 0 0 1-1.1-.8l1-6.2L2 10.4a.8.8 0 0 1 .4-1.2l6.2-1 2.7-5.5a.8.8 0 0 1 .7-.5m0 2.5L9.7 9.3a.8.8 0 0 1-.5.4l-5.1.7L7.8 14a.8.8 0 0 1 .2.7l-.9 5 4.6-2.4a.8.8 0 0 1 .6 0l4.6 2.4-.9-5a.8.8 0 0 1 .2-.7l3.7-3.6-5-.7a.8.8 0 0 1-.6-.4z" clip-rule="evenodd"/></svg>
  Ikon før
</button>
<button type="button" class="styles.button">
  Ikon etter
  <svg width="1em" height="1em" viewBox="0 0 24 24" focusable="false" role="img"><path fill="currentColor" d="M14.087 6.874a.752.752 0 0 0-.117 1.156l3.22 3.22H5a.75.75 0 0 0 0 1.5h12.19l-3.22 3.22a.75.75 0 0 0 1.06 1.06l4.5-4.5a.75.75 0 0 0 0-1.06l-4.5-4.5a.75.75 0 0 0-.943-.096"></path></svg>
</button>
</Story>


## Loading
- Legg på `aria-busy="true"  tabindex="-1"`

<Story layout="grid">
<button aria-busy="true" tabindex="-1" type="button" class="styles.button">
  Knapp
</button>
<a aria-busy="true" tabindex="-1" href="#" class="styles.button">
  Lenkeknapp
</a>
</Story>


## Disabled
- Legg på `disabled` for `<button>` eller `aria-disabled="true" tabindex="-1"` for andre elementer

<Story layout="grid">
<button disabled type="button" class="styles.button">
  Knapp
</button>
<a aria-disabled="true" tabindex="-1" href="#" class="styles.button">
  Lenkeknapp
</a>
</Story>