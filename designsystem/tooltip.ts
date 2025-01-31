import styles from './styles.module.css';
import { IS_BROWSER, QUICK_EVENT, anchorPosition, attr, on } from "./utils";

let ANCHOR: Element | null = null;
let DEBOUNCE: number | ReturnType<typeof setTimeout> = 0;
let TOOLTIP: HTMLElement | null = null;

if (IS_BROWSER) {
  TOOLTIP = document.body.appendChild(document.createElement('div'));
  TOOLTIP.classList.add(...styles.tooltip.split(' '));
  attr(TOOLTIP, 'popover', 'manual');
  on(document, 'mousemove', handleMove, QUICK_EVENT);
}

function handleMove({ target }: Event) {
  clearTimeout(DEBOUNCE);
  DEBOUNCE = setTimeout(handleMoveDebounced, 20, target);
}

function handleMoveDebounced(target: Element | null) {
  if (!TOOLTIP || target === TOOLTIP) return; // Allow tooltip to be hovered, following https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
  const anchor = target?.closest?.<HTMLElement>('[data-tooltip]');
  
  if (!anchor && ANCHOR) {
    anchorPosition(TOOLTIP, false);
    TOOLTIP?.hidePopover();
    ANCHOR = null;
  } else if (anchor && anchor !== ANCHOR) {
    ANCHOR = anchor;
    TOOLTIP.textContent = anchor.getAttribute('data-tooltip') || '';
    TOOLTIP.showPopover();
    anchorPosition(TOOLTIP, false); // Reset position
    anchorPosition(TOOLTIP, anchor, 'top');
  }
}