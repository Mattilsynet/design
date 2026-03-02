import { attr, on, onHotReload } from "../utils";

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handlePopoverClick({ target }: Event) {
	const trigger = (target as Element)?.closest?.(`a,button,[role="button"]`);
	const id = trigger && attr(trigger, "popovertarget");
	const pop = id ? document.getElementById(id) : trigger?.closest("[popover]");

	if (id && trigger instanceof HTMLButtonElement) return; // Native support for buttons with popovertarget, only polyfill for <a> or missing popovertarget
	if (trigger && pop instanceof HTMLElement && pop.popover) {
		const action = attr(trigger, "popovertargetaction");
		const open = action === "show" || (action === "hide" ? false : undefined);
		pop.togglePopover(open);
	}
}

onHotReload("popover", () => [
	on(document, "click", handlePopoverClick), // Allow `<a>` to use `popovertarget` as well
]);
