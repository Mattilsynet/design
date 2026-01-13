"use client";
import clsx from "clsx";
import { createRoot } from "react-dom/client";
import styles from "../styles.module.css";
import { isBrowser, tag } from "../utils";
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
if (isBrowser() && !window._mtdsReactToasts) {
	const root = createRoot(document.body.appendChild(tag("div")));
	const toasts = new Map<string, React.ReactNode>();
	const render = () => root.render(Array.from(toasts.values() || []));

	// Expose methods to add/remove toasts from the root container
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
			closedby={opt.closedby}
			data-color={opt.color}
			data-timeout={opt.timeout}
			id={id}
			key={id}
			onAnimationEnd={window._mtdsReactToasts.delete}
			open={opt.open ?? true}
			suppressHydrationWarning // Needed due to closedby polyfill
		>
			{content}
		</dialog>,
	);

	return id;
}

// Expose toast.danger, toast.info, toast.success etc.
toast.success = (content: React.ReactNode, opt?: ToastOptions) =>
	toast(content, { color: "success", ...opt });
toast.danger = (content: React.ReactNode, opt?: ToastOptions) =>
	toast(content, { color: "danger", ...opt });
toast.info = (content: React.ReactNode, opt?: ToastOptions) =>
	toast(content, { color: "info", ...opt });
toast.warning = (content: React.ReactNode, opt?: ToastOptions) =>
	toast(content, { color: "warning", ...opt });
toast.neutral = (content: React.ReactNode, opt?: ToastOptions) =>
	toast(content, { color: "neutral", ...opt });
toast.promise = async function promise<T>(
	action: () => Promise<T>,
	props: ToastOptions & {
		loading: React.ReactNode;
		success: React.ReactNode;
		error: React.ReactNode;
	},
): Promise<T> {
	const { loading, success, error, ...opt } = props;
	const id = toast(loading, { busy: true, ...opt });
	try {
		const result = await action();
		toast.success(success, { id, busy: false });
		return result;
	} catch (_error) {
		toast.danger(error, { id, busy: false });
		throw _error;
	}
};
