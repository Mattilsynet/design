import styles from './styles.module.css';
import { IS_BROWSER, QUICK_EVENT, anchorPosition, attr, on, useId } from "./utils";

let TOOLTIP: HTMLElement | null = null;
let ANCHOR: Element | null = null;
let THROTTLE: number | ReturnType<typeof setTimeout> = 0;
let THROTTLE_LAST_CALL = Number.NEGATIVE_INFINITY;
const THROTTLE_DELAY = 100;

if (IS_BROWSER) {
  TOOLTIP = document.body.appendChild(document.createElement('div'));
  TOOLTIP.classList.add(...styles.tooltip.split(' '));
  attr(TOOLTIP, 'popover', 'manual');
  on(document, 'blur,focus,mouseout,mouseover', handleMove, QUICK_EVENT);
  on(window, 'blur', handleMove, QUICK_EVENT);
}

function handleMove({ target }: Event) {
  const wait = THROTTLE_LAST_CALL + THROTTLE_DELAY - Date.now();
  clearTimeout(THROTTLE);
  THROTTLE = setTimeout(handleMoveThrottled, Math.max(wait, 0), target);
}

// Using a throttled function to avoid performance issues
function handleMoveThrottled(target: Element | null) {
  THROTTLE_LAST_CALL = Date.now();

  if (!TOOLTIP || target === TOOLTIP) return; // Allow tooltip to be hovered, following https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
  let anchor = target?.closest?.<HTMLElement>('[data-tooltip],[data-expanded]') || null;
  
  // No need to update
  if (anchor === ANCHOR) return;

  // Do not show tooltip if boolish value
  const content = anchor?.getAttribute('data-tooltip') || anchor?.getAttribute('data-expanded') || '';
  if (!content || content === 'false' || content === 'true') anchor = null;
  
  ANCHOR?.removeAttribute('aria-labelledby'); // Unbind previous anchor
  ANCHOR = anchor; // Store new anchor - might be null if no new anchor

  ANCHOR?.setAttribute('aria-labelledby', useId(TOOLTIP));
  TOOLTIP.togglePopover(!!anchor);
  // anchorPosition(TOOLTIP, false); // Reset anchor position
  anchorPosition(TOOLTIP, anchor, anchor?.getAttribute('data-tooltip-position') || 'top');
  if (anchor) TOOLTIP.textContent = content;
}