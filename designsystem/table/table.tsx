import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type TableProps = React.ComponentPropsWithoutRef<"table">;

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
	{ className, ...rest },
	ref,
) {
	return (
		<table className={clsx(styles.table, className)} ref={ref} {...rest} />
	);
});
