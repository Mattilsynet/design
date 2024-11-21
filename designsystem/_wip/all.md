---
title: Alle komponenter
---

# Alle komponenter

## Button

<Story layout="grid">
  <button class="button">Primær</button>
  <button class="button" data-variant="secondary">Sekundær</button>
  <button class="button" data-variant="tertiary">Tertiær</button>
  <a class="button">Lenke</a>
  <button class="button" aria-busy="true">Laster</button>
  <button class="button" disabled>Disabled</button>
  <button class="button" data-size="sm">Small</button>
</Story>

## Details
<Story layout="padded">
<u-details class="details">
  <u-summary>Hei</u-summary>
  <p>Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.</p>
  <p>Hvis smitte av disse sykdommene kommer inn i landet kan de spre seg uhyre og gjøre dyr, og i noen tilfeller mennesker, alvorlig syke. Noen av sykdommene kan også gjøre mennesker syke i ulik grad. Et utbrudd av slike dyresykdommer kan innebære svært store konsekvenser, både for produsenter, myndigheter, industrien og befolkningen.</p>
  <ul>
    <li>Punkt 1</li>
    <li>Punkt 2</li>
  </ul>
</u-details>
<u-details class="details">
  <u-summary>Hei</u-summary>
  <p>Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.</p>
  <p>Hvis smitte av disse sykdommene kommer inn i landet kan de spre seg uhyre og gjøre dyr, og i noen tilfeller mennesker, alvorlig syke. Noen av sykdommene kan også gjøre mennesker syke i ulik grad. Et utbrudd av slike dyresykdommer kan innebære svært store konsekvenser, både for produsenter, myndigheter, industrien og befolkningen.</p>
  <ul>
    <li>Punkt 1</li>
    <li>Punkt 2</li>
  </ul>
</u-details>
<u-details class="details">
  <u-summary>Hei</u-summary>
  <p>Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.</p>
  <p>Hvis smitte av disse sykdommene kommer inn i landet kan de spre seg uhyre og gjøre dyr, og i noen tilfeller mennesker, alvorlig syke. Noen av sykdommene kan også gjøre mennesker syke i ulik grad. Et utbrudd av slike dyresykdommer kan innebære svært store konsekvenser, både for produsenter, myndigheter, industrien og befolkningen.</p>
  <ul>
    <li>Punkt 1</li>
    <li>Punkt 2</li>
  </ul>
</u-details>
</Story>

## Alert
<Story layout="grid" aspect="4/3">
<div class="alert">
  Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.
</div>
<div class="alert" data-severity="success">
  Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.
</div>
<div class="alert" data-severity="warning">
  Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.
</div>
<div class="alert" data-severity="error">
  Norge er i stor grad forskånet for de aller mest alvorlige smittsomme dyresykdommene.
</div>
</Story>


## Link
<Story layout="center">
<a href="#">Link</a>
</Story>


## Input
<Story layout="padded" aspect="9 / 16">
<label>Text<input type="text" class="input" /></label>
<label>
  Required <mark>Feltet er påkrevd</mark>
  <br><input class="input" type="text" size="30" required />
</label>
<br>
<label>Disabled<input type="text" class="input" disabled value="Disabled" /></label>
<label>
  Select
  <select class="input">
    <option>Alternative 1</option>
    <option>Alternative 2</option>
    <option>Alternative 3</option>
    <option>Alternative 4</option>
  </select>
</label>
<label>Invalid
  <input type="text" class="input" placeholder="Name" aria-invalid="true" />
</label>
<label>Textarea<textarea rows="3" class="input"></textarea></label>
<fieldset class="fieldset">
  <legend>Checkboxes</legend>
  <label><input type="checkbox" class="input" />Default</label>
  <br><label><input type="checkbox" class="input" checked />Checked</label>
  <br><label><input type="checkbox" class="input" disabled />Disabled</label>
  <br><label><input type="checkbox" class="input" disabled checked />Disabled checked</label>
</fieldset>
<fieldset class="fieldset">
  <legend>Radios</legend>
  <label><input type="radio" class="input" name="radios-2" />Default</label>
  <br><label><input type="radio" class="input" name="radios-2" checked />Checked</label>
  <br><label><input type="radio" class="input" disabled />Disabled</label>
  <br><label><input type="radio" class="input" disabled checked />Disabled checked</label>
</fieldset>
<label><input type="checkbox" class="input" switch /> Switch</label>
</Story>


## Dropdown
<Story layout="padded">
<button class="button" popovertarget="my-dropdown">Dropdown</button>
<mt-floating class="dropdown" popover id="my-dropdown">
  Hei
</mt-floating>
</Story>


## Spinner
<Story layout="center">
<span class="spinner" aria-label="Laster..."></span>
</Story>


## Table
<Story layout="padded" aspect="9 / 16">
<mt-table>
  <table class="table">
    <caption>Example table</caption>
    <thead>
      <tr><th>First name</th><th>Last name</th><th data-numeric>Age</th><th data-numeric>Visits</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Antoni</th><td>Foyston</td><td data-numeric>74</td><td data-numeric>128</td></tr>
      <tr><th scope="row">Jenine</th><td>Healey</td><td data-numeric>22</td><td data-numeric>194</td></tr>
      <tr><th scope="row">Leigh</th><td>Klein</td><td data-numeric>26</td><td data-numeric>114</td></tr>
      <tr><th scope="row">Zara</th><td>Greenrodd</td><td data-numeric>28</td><td data-numeric>36</td></tr>
    </tbody>
  </table>
</mt-table>
<br>
<br>
<mt-table>
   <table class="table" data-variant="zebra">
    <caption>Example table</caption>
    <thead>
      <tr><th>First name</th><th>Last name</th><th data-numeric>Age</th><th data-numeric>Visits</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Antoni</th><td>Foyston</td><td data-numeric>74</td><td data-numeric>128</td></tr>
      <tr><th scope="row">Jenine</th><td>Healey</td><td data-numeric>22</td><td data-numeric>194</td></tr>
      <tr><th scope="row">Leigh</th><td>Klein</td><td data-numeric>26</td><td data-numeric>114</td></tr>
      <tr><th scope="row">Zara</th><td>Greenrodd</td><td data-numeric>28</td><td data-numeric>36</td></tr>
    </tbody>
  </table>
</mt-table>
</Story>


## Modal
<Story layout="padded">
<button class="button" onclick="document.getElementById('mt-modal').showModal()">Open</button>
<dialog class="modal" id="mt-modal">
  <form method="dialog">
    <button aria-label="Lukk"></button>
  </form>
  Modal
</dialog>
</Story>