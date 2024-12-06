# Autolayout <button class="styles.button" data-badge="Alfa"></button>

- Bruk klassen `autolayout` for `display: flex | grid` med superkrefter
- `data-align="stretch | start | center | end"`
- `data-justify="start | center | end | space-between | space-around | space-evenly"`
- `data-align-content="start | center | end | space-between | space-around | space-evenly"`
- `data-gap="sm | md | lg"`

<pre hidden>
<div class="styles.autolayout">
  <button class="styles.button">Action 1</button>
  <button class="styles.button">Action som er lengre 2</button>
  <button class="styles.button">Action 3</button>
  <button class="styles.button">Action 4</button>
  <button class="styles.button">Action 5</button>
  <button class="styles.button">Action 6</button>
</div>
<div style="outline: 1px solid" class="styles.autolayout" data-grid="fit">
  <div style="outline: 1px solid">Child 1</div>
  <div style="outline: 1px solid">Child 2</div>
</div>
<div style="outline: 1px solid" class="styles.autolayout" data-grid="4.8" data-gap="lg">
  <div style="outline: 1px solid">
    Sidebar
    <div style="outline: 1px solid" class="styles.autolayout" data-grid="fit" data-gap="none">
      <div style="outline: 1px solid">Child 1</div>
      <div style="outline: 1px solid">Child 2</div>
    </div>
  </div>
  <div style="outline: 1px solid" class="styles.autolayout" data-grid="md" data-gap="md">
    <div style="outline: 1px solid">Child 1</div>
    <div style="outline: 1px solid" class="styles.autolayout" data-grid="xs">
      <div style="outline: 1px solid">Child 2-1</div>
      <div style="outline: 1px solid">Child 2-2</div>
      <div style="outline: 1px solid">Child 2-3</div>
      <div style="outline: 1px solid">Child 2-4</div>
      <div style="outline: 1px solid">Child 2-5</div>
      <div style="outline: 1px solid">Child 2-6</div>
    </div>
    <div style="outline: 1px solid">Child 3</div>
    <div style="outline: 1px solid">Child 4</div>
  </div>
</div>
</pre>
<Story />