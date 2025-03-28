import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type ErrorsummaryProps = React.ComponentPropsWithoutRef<"div">;

export const Errorsummary = forwardRef<HTMLDivElement, ErrorsummaryProps>(
	function Errorsummary({ className, ...rest }, ref) {
		return (
			<div
				className={clsx(styles.errorsummary, className)}
				role="alert"
				ref={ref}
				{...rest}
			/>
		);
	},
);
