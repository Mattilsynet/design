import { forwardRef } from "react";
import styles from "../styles.module.css";

export type ErrorsummaryProps = React.ComponentPropsWithoutRef<"div">;

export const Errorsummary = forwardRef<HTMLDivElement, ErrorsummaryProps>(
	function Errorsummary({ className, ...rest }, ref) {
		// TODO: Autofocus
		return (
			<div
				className={`${styles.errorsummary} ${className}`}
				role="alert"
				ref={ref}
				{...rest}
			/>
		);
	},
);
