import { flip, type Placement, shift, size } from "@floating-ui/dom";
import styles from "../styles.module.css";
import { anchorPosition, attr, on, onLoaded, QUICK_EVENT } from "../utils";

const CSS_POPOVER = styles.popover.split(" ")[0];
const CSS_AUTO = `_mtds-popover-auto`;

type EventToggle = Event & Partial<ToggleEvent>;

function handlePopoverToggle({ target: el, newState }: EventToggle) {
	if (el instanceof HTMLElement && el.classList.contains(CSS_POPOVER)) {
		const isClosing = newState === "closed";
		const isContain = attr(el, "data-overscroll") === "contain";
		const padding = Number(attr(el, "data-inset")) || 20;
		const anchor = (el.getRootNode() as ShadowRoot)?.querySelector<HTMLElement>(
			`[popovertarget="${el.id}"]`,
		);

		if (isClosing) anchorPosition(el, false);
		else if (anchor)
			anchorPosition(el, anchor, {
				placement: (attr(el, "data-position") || "bottom") as Placement,
				middleware: [flip(), shift({ padding })].concat(
					isContain
						? size({
								padding,
								apply({ availableHeight }) {
									el.style.maxHeight = `${Math.max(50, availableHeight)}px`;
								},
							})
						: [],
				),
			});
	}
}

function handlePopoverBeforetoggle({ target: el, newState }: EventToggle) {
	if (
		newState === "open" &&
		el instanceof HTMLElement &&
		el.classList.contains(CSS_POPOVER) &&
		attr(el, "popover") !== "manual"
	) {
		el.classList.add(CSS_AUTO);
		attr(el, "popover", "manual"); // Make manual to prevent closing when clicking scrollbar
	}
}

// Polyfill popovertarget for <a> (not supported by native)
// and automatically assume popovertarget is the closest parent popover
// but respect the popovertarget and popovertargetaction attribute
function handlePopoverLinkClick(event: Event) {
	const el = (event.target as Element)?.closest?.("a,button");
	const id = el && attr(el, "popovertarget");
	const pop = id ? document.getElementById(id) : el?.closest(`.${CSS_POPOVER}`);

	// Manually close popovers where click was outside
	for (const open of document.getElementsByClassName(CSS_AUTO))
		if (!open.contains(event.target as Node) && pop !== open)
			(open as HTMLElement).hidePopover();

	if (pop?.classList.contains(CSS_POPOVER) && el) {
		const action = attr(el, "popovertargetaction");
		const open = action === "show" || (action === "hide" ? false : undefined);

		// Popover can be disconneted by click handler deeper down in the DOM three before reaching document
		if (el instanceof HTMLButtonElement && !action && pop.contains(el)) return; // Require "popovertargetaction" attribute to make buttons inside popover toggle
		if (pop instanceof HTMLElement && pop.isConnected) {
			event.preventDefault(); // Prevent browser popover API since we are doing it ourselves
			if (pop.hasAttribute("popover")) return pop.togglePopover(open);
			console.error(`Element "${pop.id}" is missing "popover" attribute`);
		}
	}
}

onLoaded(() => {
	on(document, "click", handlePopoverLinkClick); // Allow `<a>` to use `popovertarget` as well
	on(document, "toggle", handlePopoverToggle, QUICK_EVENT); // Use capture since toggle does not bubble
	on(document, "beforetoggle", handlePopoverBeforetoggle, QUICK_EVENT); // Use capture since toggle does not bubble
});
