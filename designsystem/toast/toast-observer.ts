import styles from "../styles.module.css";
import { attr, on, onLoaded } from "../utils";

const CSS_TOAST = styles.toast.split(" ")[0];
const ATTR_SORT = "data-sort";

function handleToastState({ animationName, target }: Partial<AnimationEvent>) {
	const dialog = target as HTMLDialogElement;
	if (animationName === styles._toastTimeout) dialog.close();
	if (animationName !== styles._toastOpen) return;

	const ms = Number(attr(dialog, "data-timeout"));
	dialog.style.setProperty("--mtdsc-toast-timeout", ms ? `${ms}ms` : null);
	dialog.hasAttribute(ATTR_SORT) || attr(dialog, ATTR_SORT, `${Date.now()}`);
	attr(dialog, "tabindex", "0"); // Make focusable

	// Setup layout
	[...document.querySelectorAll<HTMLDialogElement>(`.${CSS_TOAST}[open]`)]
		.sort((a, b) => Number(attr(b, ATTR_SORT)) - Number(attr(a, ATTR_SORT)))
		.reduce((top, toast) => {
			toast.style.translate = `0 ${toast === target ? 0 : top}px`;
			return top + toast.offsetHeight + 5;
		}, 0);
}

function handleToastClick({ target, clientX: x, clientY: y }: MouseEvent) {
	if (
		target instanceof HTMLDialogElement &&
		target.classList.contains(CSS_TOAST) &&
		attr(target, "data-closedby") !== "none"
	) {
		const rect = target.getBoundingClientRect();
		const toast = window.getComputedStyle(target);
		const close = window.getComputedStyle(target, "::after");
		const top = rect.top + Number.parseInt(toast.paddingTop, 10);
		const bottom = top + Number.parseInt(close.height, 10);
		const right = rect.right - Number.parseInt(toast.paddingRight, 10);
		const left = right - Number.parseInt(close.width, 10);
		const isClose = top <= y && y <= bottom && left <= x && x <= right;

		if (isClose) target.close(); // Click is on ::after element
	}
}

onLoaded(() => [
	on(document, "animationstart", handleToastState),
	on(document, "click", handleToastClick as EventListener),
]);
