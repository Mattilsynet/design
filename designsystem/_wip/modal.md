---
title: Modal
---

# Modal

<Story>
<button type="button" class="ds-paragraph ds-paragraph--md ds-line-height--sm ds-btn ds-focus ds-btn--md ds-btn--primary ds-btn--accent" aria-expanded="false" aria-haspopup="dialog" onclick="document.querySelector('dialog').show()">
  Open Modal
</button>
<dialog class="ds-modal">
  <div class="ds-modal__header">
    <h2 class="ds-heading ds-heading--xs">Modal header</h2>
    <button type="button" class="ds-paragraph ds-paragraph--md ds-line-height--sm ds-btn ds-focus ds-btn--md ds-btn--tertiary ds-btn--neutral ds-btn--icon-only ds-modal__header__button" name="close" title="close modal">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-labelledby="title-rag" font-size="1.5em"><title id="title-rag">close modal</title><path fill="currentColor" d="M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94z"></path></svg>
    </button>
  </div>
  <div class="ds-modal__content">
    <p class="ds-paragraph ds-paragraph--md ds-line-height--md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus sunt et.</p>
  </div>
  <footer class="ds-modal__footer">Modal footer</footer>
</dialog>
</Story>