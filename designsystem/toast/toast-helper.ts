import clsx from "clsx";
import styles from "../styles.module.css";
import { attr, on, tag } from "../utils";

export type ToastOptions = {
	className?: string;
	closedby?: "none";
	color?: "main" | "neutral" | "success" | "danger" | "info" | "warning";
	icon?: boolean | "none";
	timeout?: number | false;
	busy?: boolean;
	open?: boolean;
	id?: string;
};

export function toast(content: string, opt: ToastOptions = {}) {
	const dialog = document.getElementById(opt.id || "") || tag("dialog");

	attr(dialog, "aria-busy", opt.busy ? "true" : null);
	attr(dialog, "class", clsx(styles.toast, opt.className));
	attr(dialog, "closedby", opt.closedby || null);
	attr(dialog, "data-color", opt.color || null);
	attr(dialog, "data-icon", `${opt.icon ?? ""}` || null);
	attr(dialog, "data-timeout", `${opt.timeout ?? ""}` || null);
	attr(dialog, "id", opt.id || `${Date.now()}`);
	attr(dialog, "open", opt.open === false ? null : "");

	dialog.innerHTML = content;
	on(dialog, "animationend", handleToastClose, { once: true });
	document.body.appendChild(dialog);
	return dialog.id;
}

function handleToastClose({ animationName, target }: Partial<AnimationEvent>) {
	if (animationName === styles._toastClose)
		(target as HTMLDialogElement).remove();
}

// Expose toast.danger, toast.info, toast.success etc.
toast.success = (content: string, opt?: ToastOptions) =>
	toast(content, { color: "success", ...opt });
toast.danger = (content: string, opt?: ToastOptions) =>
	toast(content, { color: "danger", ...opt });
toast.info = (content: string, opt: ToastOptions) =>
	toast(content, { color: "info", ...opt });
toast.warning = (content: string, opt?: ToastOptions) =>
	toast(content, { color: "warning", ...opt });
toast.neutral = (content: string, opt?: ToastOptions) =>
	toast(content, { color: "neutral", ...opt });
toast.promise = async function promise<T>(
	action: () => Promise<T>,
	props: ToastOptions & {
		loading: string;
		success: string;
		error: string;
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
