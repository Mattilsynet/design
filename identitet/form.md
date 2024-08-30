---
title: Form og animasjon
---

# Form og animasjon

## Avrundet form

Mattilsynet jobber via tre hovedroller - veileder, myndighetsutøver og beredskapsaktør. De visuelle elementene våre skal kommunisere disse rollene. De vinkelrette hjørnene på tekstboksene speiler myndighetsrollen og beredskapsrollen og det avrundende hjørnet - den mykere formen - speiler veilederrollen.

## Rette og runde hjørner sammen

Ved kombinasjon tekstboks og fotoboks skal den ene boksen ha ett avrundet hjørne og den andre rettvinklede hjørner. Avrundingen er hentet fra frøformen i logosymbolet, og skal alltid være nederst i høyre hjørne.


<style module>
  .card { display: flex; flex-wrap: wrap; overflow: hidden; border-bottom-right-radius: 4rem; font-size: 1rem; margin: 3rem 0 }
  .card > * { flex: 1 1 10rem; width: 50%; height: auto; object-fit: cover }
  .card > div { padding: 2.5rem; background: var(--mt-granskog); color: var(--mt-gaasunge) }
  .card--light > div { background: var(--mt-gaasunge); color: var(--mt-mork-granskog) }
  .card__title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem }
</style>
<div :class="$style.card">
  <div>
    <div :class="$style.card__title">Øremerking av svin</div>
    Alle svin skal merkes med et øremerke som er godkjent av Mattilsynet. Dette gjelder også svin i dyrehold som er hobbypreget.
  </div>
  <img alt="" src="/form-1.png" />
</div>
<div>
  <div :class="`${$style.card} ${$style['card--light']} vp-raw`" style="max-width: 25rem">
    <img alt="" src="/form-2.png" />
    <div>
      Aktuelt
      <div :class="$style.card__title">Svinepest i Sverige &rarr;</div>
    </div>
  </div>
</div>

## Animasjon

Under arbeid