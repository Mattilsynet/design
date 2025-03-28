import { IS_BROWSER, QUICK_EVENT, on } from "../utils";

// Setting app-expanded state on the root element for less flash of unstyled content
const CSS_TOGGLE = '--mtds-app-expanded';
const KEY_TOGGLE = 'mtds-app-menu';

const handleToggleClick = ({ target: el }: Event) => {
  if ((el as Element)?.closest('[data-command="toggle-app-expanded"]')) {
    if (!document.startViewTransition) setExpanded(!getExpanded());
    else document.startViewTransition(() => setExpanded(!getExpanded()));
  }
};

const getExpanded = () =>
  !document.documentElement.style.getPropertyValue(CSS_TOGGLE)?.includes('--false');

const setExpanded = (state: boolean) => {
  document.documentElement.style.setProperty(CSS_TOGGLE, `var(${CSS_TOGGLE}--${state})`);
  window.localStorage.setItem(KEY_TOGGLE, `${state}`);
};

if (IS_BROWSER) {
  // TODO: Need to find solution for https://mattilsynet-hq.slack.com/archives/C03FAJ7N1EU/p1743170420896739?thread_ts=1743169208.287529&cid=C03FAJ7N1EU
  // const store = window.localStorage.getItem(KEY_TOGGLE);
  // setExpanded(store ? store === 'true' : getExpanded());
  on(document, "click", handleToggleClick, QUICK_EVENT);
}