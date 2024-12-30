# Table <mark data-badge="Alfa"></mark>

- Legg klassen `table` på `<table>`
- Bruk `<thead>` med `<tr><th>` som barn for topplinje
- Bruk `<tbody>` med `<tr><td>` som barn for rader
- Bruk `aria-label` for å navngi tabellen for skjermlesere

<pre hidden>
<table class="styles.table" aria-label="Example table">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Horisontale tittler
- Bruk `<th scope="row">` som første barn i en rad for å få horisontal overskrift

<pre hidden>
<table class="styles.table" aria-label="Table with horizontal titles">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Antoni</th><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><th scope="row">Jenine</th><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><th scope="row">Leigh</th><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><th scope="row">Zara</th><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Like bredder
- Tabeller tilpasser kolonnebredder automatisk etter innhold
- Dette kan være upraktisk når innholdet endrer seg/sorteres/pagineres
- Bruk `data-fixed` på `<table>` for like/satte bredder
- Bruk evt. `style="width: X"` på `<th>` for å sette bredde på gitte kolonner

<pre hidden>
<table class="styles.table" data-fixed aria-label="Table with fixed widths">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Numeriske verider
- Bruk `data-numeric` for å få høyrestilte tall med lik bredde.

<pre hidden>
<table class="styles.table" aria-label="Table with numeric values">
  <thead>
    <tr><th>First name</th><th>Last name</th><th data-numeric>Age</th><th data-numeric>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td data-numeric>74</td><td data-numeric>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td data-numeric>22</td><td data-numeric>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td data-numeric>26</td><td data-numeric>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td data-numeric>28</td><td data-numeric>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Sortering
- Bruk `<th aria-sort="none | ascending | descending | other">`
- Bruk `<button type="button">`eller `<a>` i `<th>` for client/server sorting
- Bruk [TanStack Table](https://tanstack.com/table/latest) eller annen valgfri kode for å utføre sorteringen
- Se også [like bredder](#like-bredder)

<pre hidden>
<table class="styles.table" aria-label="Sortable table">
  <thead>
    <tr>
      <th aria-sort="descending"><button type="button">First name</button></th>
      <th aria-sort="none"><button type="button">Last name</button></th>
      <th aria-sort="none"><button type="button">Age</button></th>
      <th aria-sort="none"><button type="button">Visits</button></th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Bunnlinje
- Bruk `<tfoot>` med `<tr><th>` som barn for bunnlinje

<pre hidden>
<table class="styles.table" aria-label="Table with footer">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
  <tfoot>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </tfoot>
</table>
</pre>
<Story />

## Størrelser
- Bruk `data-size="sm | md | lg"`

<pre hidden>
<table data-size="sm" class="styles.table" aria-label="Small table">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Ekspandering
- Legg `<button aria-expanded="true | false">` som barn av `td` eller `th`
- Legg til en rad etter `<tr><td colspan="x">`, hvor `x` er antall kolonner

<pre hidden>
<table class="styles.table" aria-label="Small table">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><button type="button" class="styles.button" aria-expanded="false">Antoni</button></td>
      <td>Foyston</td>
      <td>74</td>
      <td>128</td>
    </tr>
    <tr>
      <td colspan="4">
        Content here
      </td>
    </tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />

## Checkbox
- Legg et [Field](/designsystem/field/) i `td` med `<input type="checkbox">` og `label`

<pre hidden>
<table class="styles.table" aria-label="Small table">
  <thead>
    <tr>
      <th>
        <div class="styles.field">
          <input type="checkbox" class="styles.input"><label>First name</label>
        </div>
      </th>
      <th>Last name</th>
      <th>Age</th>
      <th>Visits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="styles.field">
          <input type="checkbox" class="styles.input"><label>Antoni</label>
        </div>
      </td>
      <td>Foyston</td>
      <td>74</td>
      <td>128</td>
    </tr>
    <tr>
      <td>
        <div class="styles.field">
          <input type="checkbox" class="styles.input"><label>Jenine</label>
        </div>
      </td>
      <td>Healey</td>
      <td>22</td>
      <td>194</td>
    </tr>
    <tr>
      <td>
        <div class="styles.field">
          <input type="checkbox" class="styles.input"><label>Leigh</label>
        </div>
      </td>
      <td>Klein</td>
      <td>26</td>
      <td>114</td>
    </tr>
    <tr>
      <td>
        <div class="styles.field">
          <input type="checkbox" class="styles.input"><label>Zara</label>
        </div>
      </td>
      <td>Greenrodd</td>
      <td>28</td>
      <td>36</td>
    </tr>
  </tbody>
</table>
</pre>
<Story />

## Paginering

- Tabell kan brukes sammen med [Pagination](/designsystem/pagination/)

<pre hidden>
<table class="styles.table" aria-label="Pagination table">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
<br />
<nav data-size="sm" aria-label="Sidenavigering" class="styles.pagination">
  <ul>
    <li><button type="button" class="styles.button" aria-disabled="true"></button></li>
    <li><button type="button" class="styles.button" aria-current="page">1</button></li>
    <li><button type="button" class="styles.button">2</button></li>
    <li><button type="button" class="styles.button">3</button></li>
    <li><button type="button" class="styles.button">4</button></li>
    <li></li>
    <li><button type="button" class="styles.button">10</button></li>
    <li><button type="button" class="styles.button"></button></li>
  </ul>
</nav>
</pre>
<Story />


## Mobil: Scroll

- Plasser tabellen inni en `<figure>` for å få scroll på mobil
- Bruk `data-nowrap` hvor du vil på/inni tabellen for å hindre linjeskift

<pre hidden>
<figure>
  <table class="styles.table" aria-label="Mobile scrollable table" data-nowrap>
    <thead>
      <tr><th>First name</th><th>Last name</th><th>Description</th><th>Age</th><th>Visits</th></tr>
    </thead>
    <tbody>
      <tr><td>Antoni</td><td>Foyston</td><td>Lorem ipsum dolor sit amet consectetur.</td><td>74</td><td>128</td></tr>
      <tr><td>Jenine</td><td>Healey</td><td>Lorem ipsum dolor sit amet consectetur.</td><td>22</td><td>194</td></tr>
      <tr><td>Leigh</td><td>Klein</td><td>Lorem ipsum dolor sit amet consectetur.</td><td>26</td><td>114</td></tr>
      <tr><td>Zara</td><td>Greenrodd</td><td>Lorem ipsum dolor sit amet consectetur.</td><td>28</td><td>36</td></tr>
    </tbody>
  </table>
</figure>
</pre>
<Story />

## Mobile: Divide <mark data-badge="Experimental"></mark>

- Legg `data-divide` på `<table>` for todelt uttegning opp til `960px`
- **Merk:** todeling krever at du har importert javascript pakken: `import "@mattilsynet/design"`

<pre hidden>
<table class="styles.table" data-divide aria-label="Mobile divided table">
  <thead>
    <tr><th>First name</th><th>Last name</th><th>Age</th><th>Visits</th></tr>
  </thead>
  <tbody>
    <tr><td>Antoni</td><td>Foyston</td><td>74</td><td>128</td></tr>
    <tr><td>Jenine</td><td>Healey</td><td>22</td><td>194</td></tr>
    <tr><td>Leigh</td><td>Klein</td><td>26</td><td>114</td></tr>
    <tr><td>Zara</td><td>Greenrodd</td><td>28</td><td>36</td></tr>
  </tbody>
</table>
</pre>
<Story />