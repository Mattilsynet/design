import styles from "../styles.module.css";
import {
	anchorPosition,
	attr,
	isBrowser,
	on,
	onLoaded,
	QUICK_EVENT,
} from "../utils";

const CSS_POPOVER = styles.popover.split(" ")[0];
const TARGET = "popovertarget";
const POPOVERS = isBrowser()
	? document.getElementsByClassName(CSS_POPOVER)
	: [];

type EventToggle = Event & Partial<ToggleEvent>;

function handlePopoverToggle({ target: el, newState }: EventToggle) {
	if (el instanceof HTMLElement && el.classList.contains(CSS_POPOVER)) {
		const anchor = document.querySelector(`[${TARGET}="${el.id}"]`);

		if (newState === "closed") anchorPosition(el, false);
		else if (anchor)
			anchorPosition(el, anchor, {
				contain:
					attr(el, "data-overscroll") === "contain" &&
					(({ availableHeight }) => {
						el.style.maxHeight = `${Math.max(50, availableHeight)}px`;
					}),
			});
	}
}

function handlePopoverBeforetoggle({ target: el, newState }: EventToggle) {
	if (
		newState === "open" &&
		el instanceof HTMLElement &&
		el.classList.contains(CSS_POPOVER) &&
		attr(el, "popover") !== "manual"
	)
		attr(el, "popover", "manual"); // Make manual to prevent closing when clicking scrollbar
}

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handlePopoverClick(event: Event) {
	const el = (event.target as Element)?.closest?.("a,button");
	const id = el && attr(el, TARGET);
	const pop = id ? document.getElementById(id) : el?.closest(`.${CSS_POPOVER}`);

	// Manually close popovers where click was outside
	for (const open of POPOVERS)
		if (pop !== open && !open.contains(event.target as Node))
			open.hasAttribute("popover") && (open as HTMLElement).hidePopover();

	if (pop?.classList.contains(CSS_POPOVER) && el) {
		const action = attr(el, `${TARGET}action`);
		const open = action === "show" || (action === "hide" ? false : undefined);
		const isButton = el instanceof HTMLButtonElement;

		// Popover can be disconneted by click handler deeper down in the DOM three before reaching document
		if (isButton && !action && pop.contains(el)) return; // Require "popovertargetaction" attribute to make buttons inside popover toggle
		if (pop instanceof HTMLElement && pop.isConnected) {
			if (isButton && id) return; // Let native handle it if properly connected
			if (pop.hasAttribute("popover")) return pop.togglePopover(open);
			console.error(`Element "${pop.id}" is missing "popover" attribute`);
		}
	}
}

function handlePopoverESC(event: Partial<KeyboardEvent>) {
	if (event.key === "Escape" && event.target instanceof Element) {
		const id = event.target.closest(`[popover],[${TARGET}]`);
		const el = id && document.getElementById(attr(id, TARGET) || id.id);
		if (el instanceof HTMLElement) el.hidePopover();
		if (el) event.preventDefault?.(); // Prevent minimize fullscreen Safari
	}
}

// TODO: ESC-button

onLoaded(() => [
	on(document, "click", handlePopoverClick), // Allow `<a>` to use `popovertarget` as well
	on(document, "toggle", handlePopoverToggle, QUICK_EVENT), // Use capture since toggle does not bubble
	on(document, "beforetoggle", handlePopoverBeforetoggle, QUICK_EVENT), // Use capture since toggle does not bubble
	on(document, "keydown", handlePopoverESC),
]);
