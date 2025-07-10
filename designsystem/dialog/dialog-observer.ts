import styles from "../styles.module.css";
import {
	attr,
	createOptimizedMutationObserver,
	IS_BROWSER,
	on,
	onLoaded,
	QUICK_EVENT,
} from "../utils";

const CSS_DIALOG = styles.dialog.split(" ")[0];
const DIALOGS = IS_BROWSER
	? (document.getElementsByClassName(
			CSS_DIALOG,
		) as HTMLCollectionOf<HTMLDialogElement>)
	: [];

const handleModal = () => {
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
