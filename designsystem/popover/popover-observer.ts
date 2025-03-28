import styles from "../styles.module.css";
import { IS_BROWSER, QUICK_EVENT, anchorPosition, attr, on } from "../utils";

const CSS_POPOVER = styles.popover.split(" ")[0];

function handleToggle({ target: el, newState }: Event & { newState?: string }) {
  if (el instanceof HTMLElement && el.classList.contains(CSS_POPOVER)) {
    const anchor = (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(
      `[popovertarget="${el.id}"]`
    );

    if (newState === "closed") anchorPosition(el, false);
    else if (anchor)
      anchorPosition(el, anchor, attr(el, "data-position") || "bottom");
  }
}

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handleLinkClick({ target }: Event) {
  const link = (target as Element)?.closest?.("a");
  if (link) {
    const root = link.getRootNode() as ShadowRoot;
    const target =
      root.getElementById?.(attr(link, "popovertarget") || "") ||
      link.closest(`.${CSS_POPOVER}`);
    const action = attr(link, "popovertargetaction") || "toggle";

    target?.togglePopover(
      action === "show" || (action === "hide" ? false : undefined)
    );
  }
}

if (IS_BROWSER) {
  on(document, "beforetoggle", handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
  on(document, "click", handleLinkClick); // Allow `<a>` to use `popovertarget` as well
}