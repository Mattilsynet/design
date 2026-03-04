import styles from "../styles.module.css";
import { attr, on, onHotReload } from "../utils";

const CSS_POPOVER = styles.popover.split(" ")[0];

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handlePopoverClick({ target }: Event) {
	const trigger = (target as Element)?.closest?.(`a,button,[role="button"]`);
	const isButton = trigger instanceof HTMLButtonElement;
	const id = trigger && attr(trigger, "popovertarget");
	const pop = id ? document.getElementById(id) : trigger?.closest("[popover]");

	if (id && isButton) return; // Native support for buttons with popovertarget, only polyfill for <a> or missing "popovertarget"
	if (pop?.classList.contains(CSS_POPOVER) && trigger) {
		const action = attr(trigger, "popovertargetaction");
		const open = action === "show" || (action === "hide" ? false : undefined);

		// Popover can be disconneted by click handler deeper down in the DOM three before reaching document
		if (isButton && !action && pop.contains(trigger)) return; // Require "popovertargetaction" attribute to make buttons inside popover toggle
		if (pop instanceof HTMLElement && pop.popover) pop.togglePopover(open);
	}
}

onHotReload("popover", () => [
	on(document, "click", handlePopoverClick), // Allow `<a>` to use `popovertarget` as well
]);
