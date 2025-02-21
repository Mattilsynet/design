import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type PaginationProps = React.ComponentPropsWithoutRef<"nav">;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
	function Pagination({ className, ...rest }, ref) {
		return (
			<nav
				aria-label={rest["aria-label"] || "Pagination"}
				className={clsx(styles.pagination, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
);
