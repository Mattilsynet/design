import { IS_BROWSER, QUICK_EVENT, on } from "../utils";

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

if (IS_BROWSER) {
  toggleExpaned(window.localStorage.getItem(KEY_TOGGLE) !== "false");
  on(document, "click", handleToggleClick, QUICK_EVENT);
}