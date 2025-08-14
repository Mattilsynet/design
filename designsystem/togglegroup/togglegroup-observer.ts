import styles from "../styles.module.css";
import { on, onLoaded } from "../utils";

const CSS_TOGGLEGROUP = `.${styles.togglegroup.split(" ")[0]}`;

// Prevent browsers from showing default validation bubbles
function handleTogglegroupKeydown(event: Event & Partial<KeyboardEvent>) {
	const { key, target: el } = event;
	const group = el instanceof HTMLInputElement && el.closest(CSS_TOGGLEGROUP);

	if (!group) return;
	if (key === "Enter") el.click();
	if (key?.startsWith("Arrow")) {
		event.preventDefault();
		const inputs = group.getElementsByTagName("input");
		const index = [...inputs].indexOf(el);
		const move = key.match(/Arrow(Right|Down)/) ? 1 : -1;
		inputs[(inputs.length + index + move) % inputs.length]?.focus();
	}
}

onLoaded(() => on(document, "keydown", handleTogglegroupKeydown));
