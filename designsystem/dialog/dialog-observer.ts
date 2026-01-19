import styles from "../styles.module.css";
import {
	attr,
	deprecate,
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
	for (const dialog of DIALOGS) {
		if (dialog.getAttribute("data-variant") === "drawer")
			deprecate(
				'<dialog data-variant="drawer">',
				'<dialog data-placement="center|left|right|top|bottom">',
				dialog,
			);
		if (dialog.isConnected && dialog.showModal && dialog.close) {
			const closedby = attr(dialog, "data-closedby");
			if (closedby) {
				attr(dialog, "closedby", closedby);
				deprecate(
					`<dialog data-closedby="${closedby}">`,
					`<dialog closedby="${closedby}">`,
					dialog,
				);
			}
			if (dialog.matches('[open]:not([data-modal="false"]):not(:modal)')) {
				deprecate(
					'<dialog data-modal="true">',
					'.showModal() or <button command="show-modal" commandfor="DIALOG-ID"></button>',
				);
				attr(dialog, "open", null); // Using attribute instead of .close to avoid `close` event
				dialog.showModal();
			} else if (dialog.matches(":modal:not([open])")) {
				attr(dialog, "open", ""); // Set as open
				dialog.close(); // So we correctly can call .close, removing <dialog> from #top-layer
			}
		}
	}
}

function handleDialogCloseClick({ target: el }: Event) {
	for (const dialog of DIALOGS)
		if (dialog.open && dialog.contains(el as Node)) {
			if ((el as Element)?.closest?.('[data-command="close"]')) dialog.close();
		}
}

const deprecations = new WeakSet();
function handleCommandDepreactions() {
	document.querySelectorAll("[data-command]").forEach((el) => {
		if (deprecations.has(el)) return;
		const command = attr(el, "data-command");
		deprecations.add(el);

		if (command === "row")
			deprecate(
				`<${el.nodeName.toLowerCase()} data-command="${command}">`,
				`<tr data-clickdelegatefor="${el.nodeName}-ID">`,
				el,
			);
		else
			deprecate(
				`<button data-command="${command}">`,
				`<button command="${command?.replace("toggle-app-expanded", "show-modal")}" commandfor="TARGET-ID">`,
				el,
			);
	});
}

// Polyfill closedby in Safari functionaliy in Safari
// Also in Safari 26.2 where `closedBy` property is supported natively,
// but no corresponding functionality/behavior is implemented.
let DOWN_INSIDE = false; // Prevent close if selecting text inside dialog
function handleClosedbyAny({
	type,
	target: el,
	clientX: x = 0,
	clientY: y = 0,
}: Partial<MouseEvent>) {
	if (type === "pointerdown") {
		const r = (el as Element)?.closest?.("dialog")?.getBoundingClientRect();
		const isInside =
			r && r.top <= y && y <= r.bottom && r.left <= x && x <= r.right;

		DOWN_INSIDE = !!isInside;
	} else {
		const isDialog = el instanceof HTMLDialogElement;
		const isClose = isDialog && !DOWN_INSIDE && attr(el, "closedby") === "any";

		DOWN_INSIDE = false; // Reset on every pointerup
		if (isClose) requestAnimationFrame(() => el.open && el.close()); // Close if browser did not do it
	}
}

onLoaded(() => [
	on(document, "click", handleDialogCloseClick, QUICK_EVENT),
	on(document, "pointerdown,pointerup", handleClosedbyAny, QUICK_EVENT),
	onMutation(handleDialogModal, ["open", "data-drawer"]),
	onMutation(handleCommandDepreactions, "data-command"),
]);
