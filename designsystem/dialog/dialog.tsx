import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type DialogProps = React.ComponentPropsWithoutRef<"dialog"> & {
	"data-placement"?: "center" | "top" | "bottom" | "left" | "right";
	/**
	 * @deprecated Use 'closedby' instead
	 */
	"data-closedby"?: "any" | "closerequest";
	/**
	 * @deprecated Use '<button command="show-modal" commandfor="DIALOG-ID">' instead
	 */
	"data-modal"?: boolean | "true" | "false";
	/**
	 * @deprecated Use '<button command="show-modal" commandfor="DIALOG-ID">' instead
	 */
	modal?: boolean;
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
	function Dialog({ className, modal = true, ...rest }, ref) {
		return (
			<dialog
				className={clsx(styles.dialog, className)}
				data-modal={rest["data-modal"] ?? modal}
				suppressHydrationWarning // Needed due to closedby polyfill
				ref={ref}
				{...rest}
			/>
		);
	},
);
