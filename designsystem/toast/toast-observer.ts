import styles from "../styles.module.css";
import { QUICK_EVENT, attr, off, on } from "../utils";

function handleInject(event: Event & { animationName?: string }) {
	if (event.animationName !== styles._onInjectToast) return;

	const toast = event.target as HTMLDialogElement;
	const duration = Number(attr(toast, "data-duration"));

	if (duration) setTimeout(() => toast.close?.(), duration);
}

export const observe = (el: Element) =>
	on(el, "animationend", handleInject, QUICK_EVENT);
export const unobserve = (el: Element) =>
	off(el, "animationend", handleInject, QUICK_EVENT);
