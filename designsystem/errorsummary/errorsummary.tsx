import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "../styles.module.css";

export type ErrorsummaryProps = React.ComponentPropsWithoutRef<"div">;

export const Errorsummary = forwardRef<HTMLDivElement, ErrorsummaryProps>(
	function Errorsummary({ className, ...rest }, ref) {
		const innerRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(ref, () => innerRef.current as HTMLDivElement); // Forward innerRef
		useEffect(() => {
			const first = innerRef.current?.firstElementChild;

			if (first instanceof HTMLHeadingElement) {
				first.setAttribute("tabindex", "-1");
				first.focus(); // Autofocus first heading
			}
		}, []);

		return (
			<div
				className={`${styles.errorsummary} ${className}`}
				role="alert"
				ref={innerRef}
				{...rest}
			/>
		);
	},
);
