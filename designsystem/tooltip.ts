import styles from './styles.module.css';
import { IS_BROWSER, QUICK_EVENT, anchorPosition, attr, on, useId } from "./utils";

const POSITION_CSS_PROPERTY = '--mtds-tooltip-position';
const THROTTLE_DELAY = 100;
let ANCHOR: Element | null = null;
let LAST_CALL = Number.NEGATIVE_INFINITY;
let THROTTLE: number | ReturnType<typeof setTimeout> = 0;
let TOOLTIP: HTMLElement | null = null;

if (IS_BROWSER) {
  TOOLTIP = document.body.appendChild(document.createElement('div'));
  TOOLTIP.classList.add(...styles.tooltip.split(' '));
  attr(TOOLTIP, 'popover', 'manual');
  on(document, 'blur,focus,mouseout,mouseover', handleMove, QUICK_EVENT);
  on(window, 'blur', handleMove, QUICK_EVENT);
}

function handleMove({ target }: Event) {
  const wait = LAST_CALL + THROTTLE_DELAY - Date.now();
  clearTimeout(THROTTLE);
  THROTTLE = setTimeout(handleMoveThrottled, Math.max(wait, 0), target);
}

// Using a throttled function to avoid performance issues
function handleMoveThrottled(target: Element | null) {
  LAST_CALL = Date.now();

  if (!TOOLTIP || target === TOOLTIP) return; // Allow tooltip to be hovered, following https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
  let anchor = target?.closest?.<HTMLElement>('[data-tooltip],[data-expanded]') || null;
  
  // No need to update
  if (anchor === ANCHOR) return;

  // Do not show tooltip if boolish value
  const content = anchor?.getAttribute('data-tooltip') || anchor?.getAttribute('data-expanded') || TOOLTIP.textContent || '';
  const position = anchor?.getAttribute('data-tooltip-position') || window.getComputedStyle(anchor || document.body).getPropertyValue(POSITION_CSS_PROPERTY) || 'top';
  if (!content || content === 'false' || content === 'true') anchor = null;
  
  ANCHOR?.removeAttribute('aria-labelledby'); // Unbind previous anchor
  ANCHOR = anchor; // Store new anchor - might be null if no new anchor

  ANCHOR?.setAttribute('aria-labelledby', useId(TOOLTIP));
  TOOLTIP.togglePopover(!!anchor);
  TOOLTIP.replaceChildren(content);
  anchorPosition(TOOLTIP, false); // Reset anchor position
  anchorPosition(TOOLTIP, anchor, position);
}