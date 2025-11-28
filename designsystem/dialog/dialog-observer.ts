import styles from "../styles.module.css";
import {
	attr,
	isBrowser,
	on,
	onLoaded,
	onMutation,
	QUICK_EVENT,
} from "../utils";

const CSS_DIALOG = styles.dialog.split(" ")[0];
const DIALOGS = isBrowser()
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

function handleDialogClick({ target: el }: Event) {
	for (const dialog of DIALOGS)
		if (dialog.open) {
			const isChildNode = dialog !== el && dialog.contains(el as Node);
			const isClose = isChildNode
				? (el as Element)?.closest?.('[data-command="close"]')
				: !START_INSIDE && attr(dialog, "data-closedby") === "any";

			if (isClose) dialog.close();
		}
	START_INSIDE = false; // Reset on every click
}

onLoaded(() => [
	on(document, "click", handleDialogClick, QUICK_EVENT),
	on(document, "pointerdown", handleDialogDown, QUICK_EVENT),
	onMutation(handleDialogModal, "open"),
]);
