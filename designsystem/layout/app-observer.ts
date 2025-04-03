import styles from '../styles.module.css';
import { IS_BROWSER, QUICK_EVENT, on } from "../utils";

// Setting app-expanded state on the root element for less flash of unstyled content
const MOBILE_NAV_BREAKPOINT = 960;
const CSS_SHEET = IS_BROWSER ? new CSSStyleSheet() : null;
const CSS_NAV = `.${styles.app} > nav, .${styles.app} nav:has(+ main)`;
const CSS_TOGGLE = '[data-command="toggle-app-expanded"]';
const CSS_EXPANDED = '--mtds-app-expanded';
const KEY_EXPANDED = 'mtds-app-menu';

const handleToggleClick = (event: Event) => {
  if (event.target instanceof Element) {
    if (event.target.closest(CSS_TOGGLE)) {
      event.preventDefault(); // Ensure button does not cause submit even if forgetting `type="button"`
      if (!document.startViewTransition) setExpanded(!getExpanded());
      else document.startViewTransition(() => setExpanded(!getExpanded()));
    }
    if (window.innerWidth <= MOBILE_NAV_BREAKPOINT && event.target.matches(CSS_NAV)) {
      console.log(event.target)
    }
  }
};

const getExpanded = () =>
  window.localStorage.getItem(KEY_EXPANDED) !== 'false';

const setExpanded = (state: boolean) => {
  CSS_SHEET?.replaceSync(`:root { ${CSS_EXPANDED}: var(${CSS_EXPANDED}--${state}) }`);
  window.localStorage.setItem(KEY_EXPANDED, `${state}`);
};

if (IS_BROWSER) {
  if (CSS_SHEET)
    document.adoptedStyleSheets?.push(CSS_SHEET); // Avoid Next.js hydration conflich with adoptedStyleSheets (if available)

  setExpanded(getExpanded()); // Sync UI with store
  on(document, "click", handleToggleClick, QUICK_EVENT);
}