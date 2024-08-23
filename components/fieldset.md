---
title: Fieldset
---

# Fieldset

<Story>
<fieldset aria-describedby="fieldset-description-:r9r:" class="ds-fieldset ds-fieldset--spacing">
  <legend class="ds-label ds-label--md ds-font-weight--medium ds-fieldset__legend">
    <span class="ds-fieldset__legend__content">Skriv inn dine svar</span>
  </legend>
  <div id="fieldset-description-:r9r:" class="ds-paragraph ds-paragraph--md ds-line-height--sm ds-fieldset__description ds-font-weight--regular">
    Gi en kort beskrivelse i begge feltene
  </div>
  <div class="ds-paragraph ds-paragraph--md ds-line-height--md ds-textfield ds-textfield--md">
    <label class="ds-label ds-label--md ds-font-weight--medium ds-textfield__label" for="textfield-:r9s:">
      <span>Kort beskrivelse</span>
    </label>
    <div class="ds-textfield__field">
      <input class="ds-textfield__input ds-focus" type="text" size="20" id="textfield-:r9s:">
    </div>
    <div class="ds-textfield__error-message" id="textfield-error-:r9s:" aria-live="polite" aria-relevant="additions removals"></div>
  </div>
  <div class="ds-paragraph ds-paragraph--md ds-line-height--md ds-textarea ds-textarea--md">
    <label class="ds-label ds-label--md ds-font-weight--medium ds-textarea__label" for="textarea-:r9u:">
      <span>Lang beskrivelse</span>
    </label>
    <textarea class="ds-textarea__input ds-focus" id="textarea-:r9u:"></textarea>
    <div class="ds-textarea__error-message" id="textarea-error-:r9u:" aria-live="polite" aria-relevant="additions removals"></div>
  </div>
  <div id="fieldset-error-:r9r:" aria-live="polite" aria-relevant="additions removals" class="ds-fieldset__error-message"></div>
</fieldset>

<fieldset class="ds-fieldset">
  <legend>Skriv inn dine svar</legend>
  <p>Gi en kort beskrivelse i begge feltene</p>
  <form-field>
    <label class="ds-label">
      Kort beskrivelse
    </label>
    <input class="ds-input" type="text" size="20">
    <div class="ds-textfield__error-message" id="textfield-error-:r9s:" aria-live="polite" aria-relevant="additions removals"></div>
  </form-field>
  <div class="ds-paragraph ds-paragraph--md ds-line-height--md ds-textarea ds-textarea--md">
    <label class="ds-label ds-label--md ds-font-weight--medium ds-textarea__label" for="textarea-:r9u:">
      <span>Lang beskrivelse</span>
    </label>
    <textarea class="ds-textarea__input ds-focus" id="textarea-:r9u:"></textarea>
    <div class="ds-textarea__error-message" id="textarea-error-:r9u:" aria-live="polite" aria-relevant="additions removals"></div>
  </div>
  <div id="fieldset-error-:r9r:" aria-live="polite" aria-relevant="additions removals" class="ds-fieldset__error-message"></div>
</fieldset>
</Story>