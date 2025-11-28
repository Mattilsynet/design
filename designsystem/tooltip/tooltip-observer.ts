import { flip, type Placement, shift } from "@floating-ui/dom";
import styles from "../styles.module.css";
import {
	anchorPosition,
	attr,
	isBrowser,
	on,
	onLoaded,
	onMutation,
	QUICK_EVENT,
	tag,
} from "../utils";

const ESC = "Escape";
const THROTTLE_DELAY = 300;
const TOOLTIP_ID = "mtds-tooltip";
const TOOLTIP = isBrowser()
	? document.getElementById(TOOLTIP_ID) ||
		tag("div", {
			class: styles._tooltip,
			id: TOOLTIP_ID,
			popover: "manual",
		})
	: null;

let ANCHOR: Element | null = null;
let LAST_CALL = Number.NEGATIVE_INFINITY;
let THROTTLE: number | ReturnType<typeof setTimeout> = 0;

function handleTipToggle({ target, type, key }: Event & { key?: string }) {
	if (type === "keydown" && key !== ESC) return; // Allow ESC dismiss to follow https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
	const wait = LAST_CALL + THROTTLE_DELAY - Date.now();
	clearTimeout(THROTTLE);
	THROTTLE = setTimeout(
		handleMoveThrottled,
		Math.max(wait, 0),
		key === ESC ? null : target,
	);
}

// Using a throttled function to avoid performance issues
function handleMoveThrottled(target: Element | null) {
	LAST_CALL = Date.now();

	// Build and append tooltip if not existing
	if (!TOOLTIP || target === TOOLTIP) return; // Allow tooltip to be hovered, following https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
	if (!TOOLTIP?.isConnected) document.body.append(TOOLTIP); // Ensure connected
	let anchor = target?.closest?.<Element>("[data-tooltip]") || null;

	// No need to update
	if (anchor === ANCHOR) return;

	const text = (anchor && attr(anchor, "data-tooltip")) || "";
	const position =
		(anchor && attr(anchor, "data-tooltip-position")) ||
		window
			.getComputedStyle(anchor || document.body)
			.getPropertyValue("--mtds-tooltip-position")
			?.trim() ||
		"top"; // Position can both be set by attribute or CSS custom property

	const isHidden =
		!text || text === "false" || text === "true" || position === "none";

	if (isHidden) anchor = null; // Do not show tooltip if boolish value
	if (anchor) TOOLTIP.textContent = text; // Only update content if new anchor

	anchorPosition(TOOLTIP, false); // Reset anchor position

	ANCHOR = anchor; // Store new anchor - might be null if no new anchor
	TOOLTIP.hidePopover(); // Hide tooltip so it can be placed on top-layer on next show
	TOOLTIP.togglePopover(!!anchor);
	anchorPosition(TOOLTIP, anchor || false, {
		strategy: "fixed",
		placement: position as Placement,
		middleware: [flip(), shift({ padding: 10 })],
	});
}

function handleTipLabels() {
	document.querySelectorAll("[data-tooltip]").forEach((el) => {
		const empty = !el?.textContent?.trim();
		const text = attr(el, "data-tooltip");
		attr(el, `aria-${empty ? "label" : "description"}`, text);
	});
}

onLoaded(() => [
	on(document, "blur,focus,mouseout,mouseover", handleTipToggle, QUICK_EVENT),
	on(window, "keydown", handleTipToggle, QUICK_EVENT),
	on(window, "blur", handleTipToggle, QUICK_EVENT),
	onMutation(handleTipLabels, "data-tooltip"),
]);
