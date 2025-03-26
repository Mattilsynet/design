import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type ToastProps = React.ComponentPropsWithoutRef<"dialog">;

export const Toast = forwardRef<HTMLDialogElement, ToastProps>(function Toast(
	{ className, children, ...rest },
	ref,
) {
	return (
		<dialog className={clsx(styles.toast, className)} ref={ref} {...rest} />
	);
});
