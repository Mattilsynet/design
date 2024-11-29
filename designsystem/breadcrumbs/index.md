# Breadcrumbs <mark data-badge="Alfa"></mark>

- Bruk klassen `breadcrumbs` på `<nav>` med `aria-label="Du er her"`
- Legg `<ol>` inni, med `<li><a>` som barn
- Siste `<a>` skal ha `aria-current="page"`
- Hvis `<a>` ligger direkte i `<nav>` vil denne være [tilbakeknapp](#tilbakeknapp)

<Story>
<nav class="styles.breadcrumbs" aria-label="Du er her:">
  <a href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
  <ol>
    <li><a href="#">Nivå 1</a></li>
    <li><a href="#">Nivå 2</a></li>
    <li><a href="#">Nivå 3</a></li>
    <li><a href="#" aria-current="page">Nivå 4</a></li>
  </ol>
</nav>
</Story>

## Tilbakeknapp
- Tilbakeknapp vises alltid dersom kun `<a>` er barn av `<nav>`
- Tilbakeknapp vises kun på mobil dersom `<a>` og `<ol>` er barn av `<nav>`
<Story>
Tilbakeknapp på både mobil og desktop:
<nav class="styles.breadcrumbs" aria-label="Du er her:">
  <a href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
</nav>
<br />
Tilbakeknapp på kun mobil:
<nav class="styles.breadcrumbs" aria-label="Du er her:">
  <a href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
  <ol>
    <li><a href="#">Nivå 1</a></li>
    <li><a href="#">Nivå 2</a></li>
    <li><a href="#">Nivå 3</a></li>
    <li><a href="#" aria-current="page">Nivå 4</a></li>
  </ol>
</nav>
<br />
Ingen tilbakeknapp:
<nav class="styles.breadcrumbs" aria-label="Du er her:">
  <ol>
    <li><a href="#">Nivå 1</a></li>
    <li><a href="#">Nivå 2</a></li>
    <li><a href="#">Nivå 3</a></li>
    <li><a href="#" aria-current="page">Nivå 4</a></li>
  </ol>
</nav>
</Story>