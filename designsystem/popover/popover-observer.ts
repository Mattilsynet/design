import { attr, on, onHotReload } from "../utils";

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handlePopoverClick({ target }: Event) {
	const a = (target as Element)?.closest?.("a");
	const id = a && attr(a, "popovertarget");
	const pop = id ? document.getElementById(id) : a?.closest("[popover]");

	if (a && pop instanceof HTMLElement && pop.popover) {
		const action = attr(a, "popovertargetaction");
		const open = action === "show" || (action === "hide" ? false : undefined);
		pop.togglePopover(open);
	}
}

onHotReload("popover", () => [
	on(document, "click", handlePopoverClick), // Allow `<a>` to use `popovertarget` as well
]);
