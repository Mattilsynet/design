import styles from "../styles.module.css";
import { anchorPosition, attr, on, onLoaded, QUICK_EVENT } from "../utils";

const CSS_POPOVER = styles.popover.split(" ")[0];
let OPEN_POPOVERS = 0; // Speed up by only checking clicks if we have open popovers

function handleToggle({ target: el, newState }: Event & { newState?: string }) {
	if (el instanceof HTMLElement && el.classList.contains(CSS_POPOVER)) {
		const anchor = (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(
			`[popovertarget="${el.id}"]`,
		);

		if (newState === "closed") {
			OPEN_POPOVERS -= 1;
			anchorPosition(el, false);
		} else if (anchor) {
			OPEN_POPOVERS += 1;
			anchorPosition(el, anchor, attr(el, "data-position") || "bottom");
		}
	}
}

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handleLinkClick({ target }: Event) {
	const close =
		OPEN_POPOVERS && (target as Element)?.closest?.("a,[popovertargetaction]");

	if (close) {
		const action = attr(close, "popovertargetaction") || "toggle";
		const open = action === "show" || (action === "hide" ? false : undefined);
		const target = document.getElementById(attr(close, "popovertarget") || "");
		const popover = (target || close).closest<HTMLElement>(`.${CSS_POPOVER}`);

		// Popover can be disconneted by click handler deeper down in the DOM three before reaching document
		if (popover?.isConnected && popover?.togglePopover)
			popover.togglePopover(open);
	}
}

onLoaded(() => {
	on(document, "toggle", handleToggle, QUICK_EVENT); // Use capture since toggle does not bubble
	on(document, "click", handleLinkClick); // Allow `<a>` to use `popovertarget` as well
});
