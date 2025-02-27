import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "../styles.module.css";
import { attr } from "../utils";

export type ErrorsummaryProps = React.ComponentPropsWithoutRef<"div">;

export const Errorsummary = forwardRef<HTMLDivElement, ErrorsummaryProps>(
	function Errorsummary({ className, ...rest }, ref) {
		const innerRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(ref, () => innerRef.current as HTMLDivElement); // Forward innerRef
		useEffect(() => {
			const first = innerRef.current?.firstElementChild;

			if (first instanceof HTMLHeadingElement) {
				attr(first, "tabindex", "-1");
				first.focus(); // Autofocus first heading
			}
		}, []);

		return (
			<div
				className={clsx(styles.errorsummary, className)}
				role="alert"
				ref={innerRef}
				{...rest}
			/>
		);
	},
);
