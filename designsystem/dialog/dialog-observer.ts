import styles from "../styles.module.css";
import {
	attr,
	IS_BROWSER,
	on,
	onLoaded,
	onMutation,
	QUICK_EVENT,
} from "../utils";

const CSS_DIALOG = styles.dialog.split(" ")[0];
const DIALOGS = IS_BROWSER
	? (document.getElementsByClassName(
			CSS_DIALOG,
		) as HTMLCollectionOf<HTMLDialogElement>)
	: [];

function handleDialogModal() {
	for (const dialog of DIALOGS)
		if (dialog.isConnected && dialog.showModal && dialog.close) {
			if (dialog.matches('[open]:not([data-modal="false"]):not(:modal)')) {
				attr(dialog, "open", null); // Using attribute instead of .close to avoid `close` event
				dialog.showModal();
			} else if (dialog.matches(":modal:not([open])")) {
				attr(dialog, "open", ""); // Set as open
				dialog.close(); // So we correclty can call .close, removing <dialog> from #top-layer
			}
		}
}

let START_INSIDE = false; // Prevent close if selecting text inside dialog
type Mouse = Partial<MouseEvent>;
const isInside = (el: Element, { clientX: x = 0, clientY: y = 0 }: Mouse) => {
	const { top, right, bottom, left } = el.getBoundingClientRect();
	return top <= y && y <= bottom && left <= x && x <= right;
};

function handleDialogDown(event: Event) {
	const dialog = (event.target as Element)?.closest?.("dialog");
	START_INSIDE = !!dialog && isInside(dialog, event);
}

function handleDialogClick(event: Event) {
	for (const el of DIALOGS)
		if (el.open) {
			const close = isInside(el, event)
				? (event.target as Element)?.closest?.('[data-command="close"]')
				: !START_INSIDE && attr(el, "data-closedby") === "any";

			if (close) el.close();
		}
	START_INSIDE = false; // Reset on every click
}

onLoaded(() => [
	on(document, "click", handleDialogClick, QUICK_EVENT),
	on(document, "pointerdown", handleDialogDown, QUICK_EVENT),
	onMutation(handleDialogModal, "open"),
]);
