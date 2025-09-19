import clsx from "clsx";
import styles from "../styles.module.css";
import { attr } from "../utils";

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
	const dialog =
		document.getElementById(opt.id || "") || document.createElement("dialog");

	attr(dialog, "aria-busy", opt.busy ? "true" : null);
	attr(dialog, "class", clsx(styles.toast, opt.className));
	attr(dialog, "data-closedby", opt.closedby || null);
	attr(dialog, "data-color", opt.color || null);
	attr(dialog, "data-icon", `${opt.icon ?? ""}` || null);
	attr(dialog, "data-timeout", `${opt.timeout ?? ""}` || null);
	attr(dialog, "id", opt.id || `${Date.now()}`);
	attr(dialog, "open", opt.open === false ? null : "");

	dialog.innerHTML = content;
	dialog.addEventListener("animationend", handleToastClose, { once: true });
	document.body.appendChild(dialog);
	return dialog.id;
}

function handleToastClose({ animationName, target }: Partial<AnimationEvent>) {
	if (animationName === styles._toastClose)
		(target as HTMLDialogElement).remove();
}
