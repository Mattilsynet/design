import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, attr, debounce, on } from "../utils";

const CSS_BREADCRUMBS = styles.breadcrumbs.split(" ")[0];
const BREADCRUMBS = IS_BROWSER && document.getElementsByClassName(CSS_BREADCRUMBS);

function handleInject(event: Event & { animationName?: string }) {
  if (!BREADCRUMBS || event.animationName !== styles._onInjectCrumb) return;
  for (const breadcumbs of BREADCRUMBS)
    breadcumbs.querySelectorAll('li a').forEach((crumb, index, { length }) => {
      attr(crumb, 'aria-current', index === length - 1 ? 'page' : null);
    });
}

if (IS_BROWSER)
  on(document, 'animationend', debounce(handleInject, 100), QUICK_EVENT);