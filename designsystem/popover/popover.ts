import { type NanoPopPosition, reposition } from 'nanopop';
import styles from '../styles.module.css';
import { IS_BROWSER, QUICK_EVENT, off, on } from '../utils';

const CSS_POPOVER = styles.popover.split(' ')[0];
const CONTAINER = { toJSON: () => '', bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0 };
const POSITIONS = /(top|right|bottom|left)-(start|middle|end)/;
type Toggle = Event & { newState?: string };

if (IS_BROWSER) observe(document);

// Not exposed as a hook, as it is nice to allow consuming components to use it as a callback
export function anchorPosition(anchor: HTMLElement, popover: HTMLElement) {
  const position = (popover.getAttribute('data-position') || 'bottom-start') as NanoPopPosition;
  if (!POSITIONS.test(position)) return console.error(`Found invalid data-position="${position}"\n- It must be [top|right|bottom|left]-[start|middle|end]\n- Found on element:`, popover);

  const update = () =>
    reposition(anchor, popover, {
      container: { ...CONTAINER, bottom: window.innerHeight, right: window.innerWidth },
      margin: 4, // Margin between the popper element and the reference
      padding: 16, // Minimum space between the popper and the container
      position // [top|right|bottom|left]-[start|middle|end]
    });

  const removeEvent = ({ newState }: Toggle) => {
    if (newState === 'open') return;
    off(document, 'DOMContentReady', update, QUICK_EVENT);
    off(popover, 'toggle', removeEvent, QUICK_EVENT);
    off(window, 'load,resize,scroll', update, QUICK_EVENT);
  }
  

  document.fonts.ready.then(update); // Inital render and when fonts load
  on(document, 'DOMContentReady', update, QUICK_EVENT);
  on(popover, 'toggle', removeEvent, QUICK_EVENT);
  on(window, 'load,resize,scroll', update, QUICK_EVENT);
}

function handleToggle ({ target: el, newState }: Toggle){
  const isPopping = newState === 'open' && el instanceof HTMLElement && el.classList.contains(CSS_POPOVER);
  const anchor = isPopping && (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(`[popovertarget="${el.id}"]`);

  if (anchor) anchorPosition(anchor, el);
}

export function observe(el: Node) {
  on(el, 'toggle', handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
}
export function unobserve(el: Node) {
  off(el, 'toggle', handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
}