import styles from "../styles.module.css";
import {
	IS_BROWSER,
	QUICK_EVENT,
	attr,
	createOptimizedMutationObserver,
	on,
	onLoaded,
} from "../utils";

const CSS_DIALOG = styles.dialog.split(" ")[0];
const DIALOGS = IS_BROWSER
	? (document.getElementsByClassName(
			CSS_DIALOG,
		) as HTMLCollectionOf<HTMLDialogElement>)
	: [];
const PREVENT_EVENT = (event: Event) => {
	event.stopImmediatePropagation();
	event.stopPropagation();
};

const handleModal = () => {
	for (const dialog of DIALOGS)
		if (dialog.matches('[open]:not([data-modal="false"]):not(:modal)')) {
			dialog.addEventListener("close", PREVENT_EVENT, QUICK_EVENT); // Prevent closing events due to swapping to modal
			dialog.close();
			dialog.showModal();
			window.requestAnimationFrame(
				() => dialog.removeEventListener("close", PREVENT_EVENT, QUICK_EVENT), // Re-enable closing events
			);
		}
};

const handleClick = ({ clientX: x, clientY: y, target: el }: MouseEvent) => {
	if (el instanceof HTMLDialogElement && attr(el, "data-closedby") === "any") {
		const { top, right, bottom, left } = el.getBoundingClientRect();
		const isInside = top <= y && y <= bottom && left <= x && x <= right;

		if (!isInside) el.close();
	} else if (
		el instanceof Element &&
		el.closest('button[data-command="close"]')
	) {
		el?.closest("dialog")?.close();
	}
};

onLoaded(() => {
	on(document, "click", handleClick as EventListener, QUICK_EVENT);
	createOptimizedMutationObserver(handleModal).observe(
		document.documentElement,
		{
			attributeFilter: ["open"],
			attributes: true,
			childList: true,
			subtree: true,
		},
	);
});
