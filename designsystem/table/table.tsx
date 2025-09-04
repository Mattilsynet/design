import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type TableProps = React.ComponentPropsWithoutRef<"table"> & {
	"data-align"?: "start" | "center";
	"data-border"?: boolean | "true" | "false" | "none";
	"data-fixed"?: boolean;
	"data-mobile"?: "divided" | "spaced" | "stacked";
};

export type ThSortableProps = Omit<
	React.ComponentPropsWithoutRef<"th">,
	"aria-sort" | "onClick"
> & {
	onClick: React.ComponentPropsWithoutRef<"button">["onClick"];
	"aria-sort"?:
		| ""
		| "acending"
		| "asc"
		| "desc"
		| "descending"
		| "down"
		| "false"
		| "none"
		| "up"
		| false
		| null;
};

type SORT_KEYS = keyof typeof SORT;
const SORT = {
	"": "none",
	asc: "ascending",
	ascending: "ascending",
	desc: "descending",
	descending: "descending",
	down: "descending",
	false: "none",
	none: "none",
	null: "none",
	up: "ascending",
} as const;

const TableComp = forwardRef<HTMLTableElement, TableProps>(function Table(
	{ className, ...rest },
	ref,
) {
	return (
		<table className={clsx(styles.table, className)} ref={ref} {...rest} />
	);
});

export const Table = Object.assign(TableComp, {
	ThSortable: forwardRef<HTMLTableCellElement, ThSortableProps>(
		function ThSortable(
			{ "aria-sort": sort, children, onClick, ...rest },
			ref,
		) {
			return (
				<th
					ref={ref}
					aria-sort={onClick ? SORT[`${sort}` as SORT_KEYS] : undefined}
					{...rest}
				>
					{onClick ? (
						<button type="button" onClick={onClick}>
							{children}
						</button>
					) : (
						children
					)}
				</th>
			);
		},
	),
});
