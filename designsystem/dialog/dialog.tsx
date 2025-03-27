"use client";
import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "../styles.module.css";

export type DialogProps = React.ComponentPropsWithoutRef<"dialog"> & {
	"data-closedby"?: "any" | "closerequest";
	modal: boolean;
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
	function Dialog({ className, open, modal = true, ...rest }, ref) {
		const innerRef = useRef<HTMLDialogElement>(null);

		useImperativeHandle(ref, () => innerRef.current as HTMLDialogElement); // Forward innerRef
		useEffect(() => {
			const action = open ? (modal ? "showModal" : "show") : "close";
			innerRef.current?.[action]();
		}, [open, modal]);

		return (
			<dialog
				className={clsx(styles.dialog, className)}
				ref={innerRef}
				{...rest}
			/>
		);
	},
);
