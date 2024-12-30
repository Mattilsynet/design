# Pagination <mark data-badge="Alfa"></mark>

- Bruk klassen `pagination` på `<nav>` med `aria-label="Sidenavigering"`
- Legg `<ul><li>` inni, med `<a class="button">` eller `<button type="button" class="button">` som barn
- Legg inn tom `<li>` der du ønsker ellipsis (&hellip;)
- Legg `aria-current="page"` på valgt side
- Legg `aria-disabled="true"` på ugyldig forrige/neste

<pre hidden>
<nav aria-label="Sidenavigering" class="styles.pagination">
  <ul>
    <li><a class="styles.button" aria-disabled="true">Forrige</a></li>
    <li><a href="?p=1" class="styles.button" aria-current="page">1</a></li>
    <li><a href="?p=2" class="styles.button">2</a></li>
    <li><a href="?p=3" class="styles.button">3</a></li>
    <li><a href="?p=4" class="styles.button">4</a></li>
    <li></li>
    <li><a href="?p=10" class="styles.button">10</a></li>
    <li><a href="?p=2" class="styles.button">Neste</a></li>
  </ul>
</nav>
</pre>
<Story />

## Knapper

- Bruk `<button type="button">` istedenfor `<a>` dersom du bygger en SPA

<pre hidden>
<nav aria-label="Sidenavigering" class="styles.pagination">
  <ul>
    <li><button type="button" class="styles.button" aria-disabled="true">Forrige</button></li>
    <li><button type="button" class="styles.button" aria-current="page">1</button></li>
    <li><button type="button" class="styles.button">2</button></li>
    <li><button type="button" class="styles.button">3</button></li>
    <li><button type="button" class="styles.button">4</button></li>
    <li></li>
    <li><button type="button" class="styles.button">10</button></li>
    <li><button type="button" class="styles.button">Neste</button></li>
  </ul>
</nav>
</pre>
<Story />

## Størrelser
- Bruk `data-size="sm | md | lg"`

<pre hidden>
<nav data-size="sm" aria-label="Sidenavigering" class="styles.pagination">
  <ul>
    <li><button type="button" class="styles.button"></button></li>
    <li><button type="button" class="styles.button">1</button></li>
    <li><button type="button" class="styles.button">2</button></li>
    <li><button type="button" class="styles.button">3</button></li>
    <li><button type="button" class="styles.button" aria-current="page">4</button></li>
    <li></li>
    <li><button type="button" class="styles.button">10</button></li>
    <li><button type="button" class="styles.button"></button></li>
  </ul>
</nav>
</pre>
<Story />

## Javascript-hjelper

1. Bruk JS-hjelperen for å generere steg og tilhørende attributter:
    ```tsx
    import { pagination } from '@mattilsynet/design';

    const { pages, next, prev } = pagination({
      current: 1,
      total: 20,
      show: 7,
    })
    ```
2. Du får et hendig `object` i retur, som kan brukes til å generere HTML:
    ```ts
    {
      prev: number | false; // Previous page or false if no previous
      next: number | false; // Next page or false if no next
      pages: Array<{
        current: 'page' | false; // Value of `aria-current`
        page: string;     // Page number or empty if ellipsis
        key: string;      // Unique child key for React/frameworks
      }>
    }
    ```
3. Eksempel på bruk i `React`:
    ```tsx
    const { pages, next, prev } = pagination({
      current: 1,
      total: 20,
      show: 7,
    })
    <nav className={styles.pagination}>
      <ul>
        <li>
          <a
            aria-disabled={!prev}
            className={styles.button}
            href={prev ? `?p=${prev}` : null}
          >
            Forrige
          </a>
        </li>
        {pages.map(({ current, key, page }) => (
          <li key={key}>
            {page &&
              <a
                aria-current={current}
                className={styles.button}
                href={`?p=${page}`}
              >
                {page}
              </a>
            }
          </li>
        ))}
        <li>
          <a
            aria-disabled={!next}
            className={styles.button}
            href={next ? `?p=${next}` : null}
          >
            Neste
          </a>
        </li>
      </ul>
    </nav>
    ```