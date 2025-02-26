import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type SpinnerProps = React.ComponentPropsWithoutRef<"span"> & {
	"data-size"?: "xs" | "sm" | "md" | "lg";
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
	function Spinner({ className, ...rest }, ref) {
		return (
			<span className={clsx(styles.spinner, className)} ref={ref} {...rest} />
		);
	},
);
