import styles from "../styles.module.css";
import { QUICK_EVENT, attr, off, on } from "../utils";

const CSS_APP = styles.app.split(" ")[0];
const CSS_TOGGLE = `.${CSS_APP} > header + :not(main) > button:empty:first-child`;
const KEY_TOGGLE = 'mtds-app-menu';

const handleToggleClick = ({ target: el }: Event) => {
  const btn =
    (el as Element)?.nodeName === "BUTTON" &&
    (el as Element)?.closest(CSS_TOGGLE);

  if (!btn) return;

  const nav = btn.closest(`.${CSS_APP} > *`);
  const isExpanded = `${nav && attr(nav, "data-expanded") === "false"}`;
  const toggle = () => nav && attr(nav, "data-expanded", isExpanded);

  store(KEY_TOGGLE, isExpanded);

  if (!document.startViewTransition) toggle();
  else document.startViewTransition(() => toggle());
};

function store (key: string, val?: string) {
  try {
    if (val) window.localStorage.setItem(key, val);
    else return window.localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

export function observe(el: Element) {
  // TODO: Load local storage value
  on(el, "click", handleToggleClick, QUICK_EVENT);
}

export function unobserve(el: Element) {
  off(el, "click", handleToggleClick, QUICK_EVENT);
}