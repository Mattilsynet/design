import { flip, type Placement, shift } from "@floating-ui/dom";
import styles from "../styles.module.css";
import { anchorPosition, attr, on, onLoaded, QUICK_EVENT } from "../utils";

const CSS_POPOVER = styles.popover.split(" ")[0];
let OPEN_POPOVERS = 0; // Speed up by only checking clicks if we have open popovers

function handlePopoverToggle({
	target: el,
	newState,
}: Event & { newState?: string }) {
	if (el instanceof HTMLElement && el.classList.contains(CSS_POPOVER)) {
		const isClosing = newState === "closed";
		const anchor = (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(
			`[popovertarget="${el.id}"]`,
		);

		OPEN_POPOVERS += isClosing ? -1 : 1;
		if (isClosing) anchorPosition(el, false);
		else if (anchor)
			anchorPosition(el, anchor, {
				placement: (attr(el, "data-position") || "bottom") as Placement,
				middleware: [flip(), shift({ padding: 10 })],
			});
	}
}

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handlePopoverLinkClick({ target }: Event) {
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
	on(document, "toggle", handlePopoverToggle, QUICK_EVENT); // Use capture since toggle does not bubble
	on(document, "click", handlePopoverLinkClick); // Allow `<a>` to use `popovertarget` as well
});
