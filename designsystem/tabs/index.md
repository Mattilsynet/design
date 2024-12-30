# Tabs <mark data-badge="Alfa"></mark>

- Legg klassen `tabs` på [`<u-tabs>`](https://u-elements.github.io/u-elements/elements/u-tabs) fra [u-elements](https://u-elements.github.io/u-elements/elements/u-tabs)
- Legg `aria-selected="true"` på ønsket åpen fane

<pre hidden>
<u--tabs class="styles.tabs">
  <u--tablist>
    <u--tab aria-selected="true">Tab 1</u--tab>
    <u--tab>Tab 2</u--tab>
    <u--tab>Tab 3</u--tab>
  </u--tablist>
  <u--tabpanel>Panel 1 with <a href="#">link</a></u--tabpanel>
  <u--tabpanel>Panel 2 with <a href="#">link</a></u--tabpanel>
  <u--tabpanel>Panel 3 with <a href="#">link</a></u--tabpanel>
</u--tabs>
</pre>
<Story />

## Størrelser
- Bruk `data-size="sm | md | lg"`

<pre hidden>
<u--tabs class="styles.tabs" data-size="sm">
  <u--tablist>
    <u--tab aria-selected="true">Tab 1</u--tab>
    <u--tab>Tab 2</u--tab>
    <u--tab>Tab 3</u--tab>
  </u--tablist>
  <u--tabpanel>Panel 1 with <a href="#">link</a></u--tabpanel>
  <u--tabpanel>Panel 2 with <a href="#">link</a></u--tabpanel>
  <u--tabpanel>Panel 3 with <a href="#">link</a></u--tabpanel>
</u--tabs>
</pre>
<Story />