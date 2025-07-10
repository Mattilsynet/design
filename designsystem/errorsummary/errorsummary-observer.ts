import styles from "../styles.module.css";
import { attr, on, onLoaded, QUICK_EVENT } from "../utils";

function handleInject(event: Event & { animationName?: string }) {
	if (event.animationName !== styles._errorsummary) return;
	const first = (event.target as Element)?.firstElementChild;

	if (first instanceof HTMLHeadingElement) {
		attr(first, "tabindex", "-1");
		first.focus(); // Autofocus first heading
	}
}

onLoaded(() => on(document, "animationend", handleInject, QUICK_EVENT));
