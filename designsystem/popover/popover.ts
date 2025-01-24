import styles from '../styles.module.css';
import { IS_BROWSER, QUICK_EVENT, off, on } from '../utils';

export function observe(el: Node) {
  on(el, 'click', handleLinkClick); // Allow `<a>` to use `popovertarget` as well
  on(el, 'toggle', handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
  on(window, 'load,resize,scroll', updatePositions, QUICK_EVENT); // Use capture since toggle does not bubble
  on(document, 'DOMContentReady', updatePositions, QUICK_EVENT); // Use capture since toggle does not bubble
  document.fonts.ready.then(updatePositions); // Inital render and when fonts load
}
export function unobserve(el: Node) {
  off(el, 'click', handleLinkClick);
  off(el, 'toggle', handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
}

const CSS_POPOVER = styles.popover.split(' ')[0];
const SCROLLER = IS_BROWSER ? document.createElement('div') : null // Used to ensure we have scrollability under
const POPPING = new Map<Element, () => void>(); // Store current open poppers and their update functions
SCROLLER?.setAttribute('style', 'position:absolute;padding:1px');

function handleToggle ({ target: el, newState }: Event & { newState?: string }){
  if (el instanceof HTMLElement && el.classList.contains(CSS_POPOVER)) {
    const anchor = (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(`[popovertarget="${el.id}"]`);
    const isOver = el.getAttribute('data-position') === 'over';
    
    if (newState === 'closed') POPPING.delete(el);
    else if (anchor) POPPING.set(el, () => place(anchor, el, isOver));
    document.body.append(SCROLLER || ''); // Ensure we have the scroller
    updatePositions();
  }
}

function updatePositions() {
  for (const [_, updatePosition] of POPPING) updatePosition();
}

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handleLinkClick (event: Event){
  const link = event.target instanceof Element && event.target.closest('a');
  if (link) {
    const root = link.getRootNode() as ShadowRoot;
    const target = root.getElementById?.(link.getAttribute('popovertarget') || '') || link.closest(`.${CSS_POPOVER}`);
    const action = link.getAttribute('popovertargetaction') || 'toggle';

    if (!event.defaultPrevented) target?.togglePopover(action === 'show' || (action === 'hide' ? false : undefined));
  }
}

function place (anchor: HTMLElement | null, popper: HTMLElement, isOver = false) {
  if (!anchor) return;
  const { offsetWidth: popperW, offsetHeight: popperH } = popper;
  const { offsetWidth: anchorW, offsetHeight: anchorH } = anchor;
  const { width, height, left, top } = anchor.getBoundingClientRect();
  const anchorX = Math.round(left - (anchorW - width) / 2); // Correct for CSS transform scale
  const anchorY = Math.round(top - (anchorH - height) / 2); // Correct for CSS transform scale
  const hasSpaceUnder = anchorY + anchorH + popperH < window.innerHeight;
  const hasSpaceOver = anchorY - popperH > 0
  const placeUnder = (!isOver && hasSpaceUnder) || !hasSpaceOver // Always place under when no hasSpaceOver, as no OS can scroll further up than 0
  const scroll = placeUnder ? window.scrollY + anchorY + anchorH + popperH + 30 : 0

  popper.style.left = `${Math.round(Math.min(Math.max(10, anchorX), window.innerWidth - popperW - 10))}px`
  popper.style.top = `${Math.round(placeUnder ? anchorY + anchorH : anchorY - popperH)}px`
  SCROLLER?.style.setProperty('top', `${Math.round(scroll)}px`);
}
