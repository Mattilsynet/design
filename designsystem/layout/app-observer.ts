import { QUICK_EVENT, off, on } from "../utils";

// Setting app-expanded state on the root element for less flash of unstyled content
const CSS_TOGGLE = '--mtds-app-expanded';
const KEY_TOGGLE = 'mtds-app-menu';

const handleToggleClick = ({ target: el }: Event) => {
  if ((el as Element)?.closest('[data-command="toggle-app-expanded"]')) {
    if (!document.startViewTransition) toggleExpaned();
    else document.startViewTransition(() => toggleExpaned());
  }
};

const toggleExpaned = (force?: boolean) => {
  const html = document.documentElement;
  const isExpanded = force ?? !!html.style.getPropertyValue(CSS_TOGGLE)?.includes('--false');
  html.style.setProperty(CSS_TOGGLE, `var(${CSS_TOGGLE}--${isExpanded})`);
  window.localStorage.setItem(KEY_TOGGLE, `${isExpanded}`);
};

export function observe(el: Element) {
  toggleExpaned(window.localStorage.getItem(KEY_TOGGLE) !== "false");
  on(el, "click", handleToggleClick, QUICK_EVENT);
}

export function unobserve(el: Element) {
  off(el, "click", handleToggleClick, QUICK_EVENT);
}