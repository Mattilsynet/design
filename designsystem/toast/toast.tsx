import clsx from "clsx";
import { createRoot } from "react-dom/client";
import styles from "../styles.module.css";
import { IS_BROWSER } from "../utils";
import type { ToastOptions } from "./toast-helper";

declare global {
	interface Window {
		_mtdsReactToasts?: {
			set: (id: string, jsx: React.ReactNode) => void;
			delete: (event: React.AnimationEvent<HTMLDialogElement>) => void;
		};
	}
}

// Ensure only a single toast master is created
if (IS_BROWSER && !window._mtdsReactToasts) {
	const node = document.body.appendChild(document.createElement("div"));
	const root = createRoot(node);
	const toasts = new Map<string, React.ReactNode>();
	const render = () => root.render(Array.from(toasts.values() || []));

	window._mtdsReactToasts = {
		set: (id, jsx) => toasts.set(id, jsx) && render(),
		delete: ({ animationName, currentTarget }) => {
			if (animationName !== styles._toastClose) return;
			toasts.delete(currentTarget.id);
			render();
		},
	};
}

export function toast(content: React.ReactNode, opt: ToastOptions = {}) {
	const id = opt.id || `${Date.now()}`;
	window._mtdsReactToasts?.set(
		id,
		<dialog
			aria-busy={opt.busy}
			className={clsx(styles.toast, opt.className)}
			data-closedby={opt.closedby}
			data-color={opt.color}
			data-timeout={opt.timeout}
			id={id}
			key={id}
			onAnimationEnd={window._mtdsReactToasts.delete}
			open={opt.open ?? true}
		>
			{content}
		</dialog>,
	);

	return id;
}
