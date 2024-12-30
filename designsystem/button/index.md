# Button <mark data-badge="Alfa"></mark>

- Legg klassen `button` på typisk `<button>` eller `<a>`
- Husk `type="button"` hvis en `<button>` gjør noe annet enn å sende skjema

<pre hidden>
<button type="button" class="styles.button">
  Knapp
</button>

<a href="https://www.mattilsynet.no/" target="_blank" class="styles.button">
  Lenkeknapp
</a>
</pre>
<Story />

## Varianter
- Bruk `data-variant="primary | secondary | tertiary"`

<pre hidden>
<button type="button" class="styles.button">
  Primary (default)
</button>
<button type="button" class="styles.button" data-variant="secondary">
  Secondary
</button>
<button type="button" class="styles.button" data-variant="tertiary">
  Tertiary
</button>
</pre>
<Story />

## Størrelser
- Bruk `data-size="sm | md | lg"`

<pre hidden>
<button type="button" class="styles.button" data-size="sm">
  Small
</button>
<button type="button" class="styles.button" data-size="md">
  Medium
</button>
<button type="button" class="styles.button" data-size="lg">
  Large
</button>
</pre>
<Story />

## Pil og popover
- Legg på `data-arrow` (høyrestilt) eller `data-arrow="left | right"`
- Lasteindikator vil erstatte pil dersom disse kombineres
- Kombiner `popovertarget` + `data-arrow` for chevron

<pre hidden>
<button type="button" class="styles.button" data-arrow>
  Knapp
</button>
<button type="button" class="styles.button" data-arrow="left">
  Knapp
</button>
<a class="styles.button" data-arrow="right">
  Lenkeknapp
</a>
<button data-arrow="popover" popovertarget="pop-1" type="button" class="styles.button">Popover</button>
<menu popover id="pop-1" class="styles.popover">
  <li><button type="button" class="styles.button">Knapp 1</button></li>
  <li><button type="button" class="styles.button">Knapp 2</button></li>
  <li><button type="button" class="styles.button">Knapp 3</button></li>
  <li><button type="button" class="styles.button">Knapp 4</button></li>
  <li><button type="button" class="styles.button">Knapp 5</button></li>
</menu>
<menu>
  
</menu>
</pre>
<Story />

## Ikoner
- [Ikon fra Aksel](https://aksel.nav.no/ikoner) kan legges inn før eller etter tekst

<pre hidden>
<button type="button" class="styles.button">
  <svg viewBox="0 0 256 256" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m128 189 54.7 33.7a8.4 8.4 0 0 0 12.5-9.1l-14.8-62.8 48.7-42a8.5 8.5 0 0 0-4.8-14.8l-64-5.2-24.6-59.6a8.4 8.4 0 0 0-15.4 0L95.6 88.8 31.7 94a8.5 8.5 0 0 0-4.8 14.8l48.7 42-14.8 62.8a8.4 8.4 0 0 0 12.5 9.1Z"/></svg>
  Ikon før
</button>
<button type="button" class="styles.button">
  Ikon etter
  <svg viewBox="0 0 256 256" aria-hidden="true"><path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="M128 224S24 168 24 102a54 54 0 0 1 54-54c22.6 0 42 12.3 50 32 8-19.7 27.4-32 50-32a54 54 0 0 1 54 54c0 66-104 122-104 122Z"/></svg>
</button>
</pre>
<Story />

## Loading
- For `<button>`: Legg på `<button aria-busy="true" disabled`
- For `<a>`: Legg på `<a aria-busy="true" tabindex="-1"`
- Lasteindikator vil erstatte pil dersom disse kombineres

<pre hidden>
<button aria-busy="true" disabled type="button" class="styles.button">
  Knapp
</button>
<a aria-busy="true" tabindex="-1" href="#" class="styles.button">
  Lenkeknapp
</a>
<button aria-busy="true" disabled type="button" class="styles.button" data-arrow="right">
  Knapp med høyrepil
</button>
</pre>
<Story />

## Handlingsmeny
- Bruk `aria-label="Knappetekst her"` i stedet for innhold
- Da får du automatisk ikon for handlingsmeny <svg style="display:inline-block;width:1em;height:1em;vertical-align:middle" aria-hidden="ture" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="16"/><circle cx="60" cy="128" r="16"/><circle cx="196" cy="128" r="16"/></svg>

<pre hidden>
<button aria-label="Handlinger" popovertarget="pop-2" type="button" class="styles.button" data-variant="secondary"></button>
<menu popover id="pop-2" class="styles.popover">
  <li><button type="button" class="styles.button">Knapp 1</button></li>
  <li><button type="button" class="styles.button">Knapp 2</button></li>
  <li><button type="button" class="styles.button">Knapp 3</button></li>
  <li><button type="button" class="styles.button">Knapp 4</button></li>
  <li><button type="button" class="styles.button">Knapp 5</button></li>
</menu>
</pre>
<Story />


## Pressed
- Bruk `<button>` med `aria-pressed="true"`
- Knappen endrer ikke stil, men du kan vise/skjule innhold ved bruk av attributten `data-pressed="true | false"`:

<pre hidden>
<button aria-pressed="false" type="button" class="styles.button" data-variant="tertiary">
  <svg data-pressed="false" viewBox="0 0 256 256" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m128 189 54.7 33.7a8.4 8.4 0 0 0 12.5-9.1l-14.8-62.8 48.7-42a8.5 8.5 0 0 0-4.8-14.8l-64-5.2-24.6-59.6a8.4 8.4 0 0 0-15.4 0L95.6 88.8 31.7 94a8.5 8.5 0 0 0-4.8 14.8l48.7 42-14.8 62.8a8.4 8.4 0 0 0 12.5 9.1Z"/></svg>
  <span data-pressed="false">Lagre favoritt</span>
  <svg data-pressed="true" viewBox="0 0 256 256" aria-hidden="true"><path d="m234.3 114.8-45 38.9 13.7 58a16.4 16.4 0 0 1-24.5 17.9L128 198.5l-50.5 31A16.4 16.4 0 0 1 53 211.8l13.8-58-45-38.8A16.5 16.5 0 0 1 31 86l59-4.8 22.7-55a16.4 16.4 0 0 1 30.3 0l22.8 55 59 4.8a16.5 16.5 0 0 1 9.3 28.9Z"/></svg>
  <span data-pressed="true">Fjern favoritt</span>
</button>
</pre>
<Story />

## Disabled
- Legg på attributt `disabled` for `<button>` eller `aria-disabled="true" tabindex="-1"` for andre elementer

<pre hidden>
<button disabled type="button" class="styles.button">
  Knapp
</button>
<a aria-disabled="true" tabindex="-1" href="#" class="styles.button">
  Lenkeknapp
</a>
</pre>
<Story />

## Tooltip <mark data-badge="Experimental"></mark>
- Bruk `data-tooltip="Hjelpetekst"`
- Teksten blir også automatisk tilgjengelig for skjermlesere
- **Merk:** Krever minst `24px / 1.5rem / 6 units` luft under for å vises

<pre hidden>
<button data-tooltip="Favoritt" type="button" class="styles.button" data-variant="tertiary">
  <svg viewBox="0 0 256 256" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m128 189 54.7 33.7a8.4 8.4 0 0 0 12.5-9.1l-14.8-62.8 48.7-42a8.5 8.5 0 0 0-4.8-14.8l-64-5.2-24.6-59.6a8.4 8.4 0 0 0-15.4 0L95.6 88.8 31.7 94a8.5 8.5 0 0 0-4.8 14.8l48.7 42-14.8 62.8a8.4 8.4 0 0 0 12.5 9.1Z"/></svg>
</button>
</pre>
<Story />