import { IS_BROWSER, QUICK_EVENT, on } from "../utils";

// Setting app-expanded state on the root element for less flash of unstyled content
const CSS_TOGGLE = '--mtds-app-expanded';
const KEY_TOGGLE = 'mtds-app-menu';

const handleToggleClick = ({ target: el }: Event) => {
  if ((el as Element)?.closest('[data-command="toggle-app-expanded"]')) {
    if (!document.startViewTransition) setExpaned(!getExpanded());
    else document.startViewTransition(() => setExpaned(!getExpanded()));
  }
};

const getExpanded = () =>
  !document.documentElement.style.getPropertyValue(CSS_TOGGLE)?.includes('--false');

const setExpaned = (state: boolean) => {
  document.documentElement.style.setProperty(CSS_TOGGLE, `var(${CSS_TOGGLE}--${state})`);
  window.localStorage.setItem(KEY_TOGGLE, `${state}`);
};

if (IS_BROWSER) {
  const store = window.localStorage.getItem(KEY_TOGGLE);
  setExpaned(store ? store === 'true' : getExpanded());
  on(document, "click", handleToggleClick, QUICK_EVENT);
}