import styles from '../styles.module.css';
import { IS_BROWSER, QUICK_EVENT, off, on } from '../utils';

export function observe(el: Node) {
  on(el, 'click', handleLinkClick); // Allow `<a>` to use `popovertarget` as well
  on(el, 'toggle', handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
}
export function unobserve(el: Node) {
  off(el, 'click', handleLinkClick);
  off(el, 'toggle', handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
}

type Toggle = Event & { newState?: string };
const CSS_POPOVER = styles.popover.split(' ')[0];
const SCROLLER = IS_BROWSER ? document.createElement('div') : null // Used to ensure we have scrollability under
if (SCROLLER) SCROLLER.style.cssText = 'position:absolute;padding:1px';

function handleToggle ({ target: el, newState }: Toggle){
  const isPopping = newState === 'open' && el instanceof HTMLElement && el.classList.contains(CSS_POPOVER);
  const anchor = isPopping && (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(`[popovertarget="${el.id}"]`);

  if (anchor) {
    const isOver = el.getAttribute('data-position') === 'over';
    const update = () => place(anchor, el, isOver);
    const removeEvent = ({ newState }: Toggle) => {
      if (newState === 'open') return;
      off(document, 'DOMContentReady', update, QUICK_EVENT);
      off(el, 'toggle', removeEvent, QUICK_EVENT);
      off(window, 'load,resize,scroll', update, QUICK_EVENT);
      SCROLLER?.remove();
    }

    document.body.append(SCROLLER || '');
    document.fonts.ready.then(update); // Inital render and when fonts load
    on(window, 'load,resize,scroll', update, QUICK_EVENT);
    on(document, 'DOMContentReady', update, QUICK_EVENT);
    on(el, 'toggle', removeEvent, QUICK_EVENT);
  }
}

// Polyfill popovertarget for <a> (not supported by native)
function handleLinkClick ({ target }: Event){
  const el = target instanceof Element && target.closest('a[popovertarget]');

  if (el) {
    const root = el.getRootNode() as ShadowRoot;
    const target = root.getElementById?.(el.getAttribute('popovertarget') || '');
    const action = el.getAttribute('popovertargetaction') || 'toggle';

    target?.togglePopover(action === 'show' || (action === 'hide' ? false : undefined));
  }
}

function place (anchor: HTMLElement | null, poppe: HTMLElement, isOver = false) {
  const { innerWidth: winW, innerHeight: winH, scrollY: winY, scrollX: winX } = window;
  const { offsetWidth: popperW, offsetHeight: popperH } = poppe;
  let anchorX = -winX;
  let anchorY = -winY;
  let el = anchor;

  do {
    anchorX += el?.offsetLeft || 0;
    anchorY += el?.offsetTop || 0;
    el = (el?.offsetParent || null) as HTMLElement | null;
  } while (el);

  const anchorBottom = anchorY + (anchor?.offsetHeight || 0);
  const hasSpaceUnder = anchorBottom + popperH < winH;
  const hasSpaceOver = anchorY - popperH > 0
  const placeUnder = (!isOver && hasSpaceUnder) || !hasSpaceOver // Always place under when no hasSpaceOver, as no OS can scroll further up than 0
  const scroll = placeUnder ? winY + anchorBottom + popperH + 30 : 0

  poppe.style.left = `${Math.round(Math.min(Math.max(10, anchorX), winW - popperW - 10))}px`
  poppe.style.top = `${Math.round(placeUnder ? anchorBottom : anchorY - popperH)}px`
  SCROLLER?.style.setProperty('top', `${Math.round(scroll)}px`);
}
