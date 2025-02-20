import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type ValidationProps = React.ComponentPropsWithoutRef<"div">;

export const Validation = forwardRef<HTMLDivElement, ValidationProps>(
	function Validation({ className, ...rest }, ref) {
		return (
			<div className={clsx(styles.validation, className)} ref={ref} {...rest} />
		);
	},
);
