import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type DialogProps = React.ComponentPropsWithoutRef<"dialog"> & {
	"data-closedby"?: "any" | "closerequest";
	"data-modal"?: boolean | "true" | "false";
	modal?: boolean; // Ketp for backwards compatibility
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
	function Dialog({ className, modal = true, ...rest }, ref) {
		return (
			<dialog
				className={clsx(styles.dialog, className)}
				data-modal={rest["data-modal"] ?? modal}
				ref={ref}
				{...rest}
			/>
		);
	},
);
