import clsx from "clsx";
import { forwardRef } from "react";
import { Button } from "../button/button";
import styles from "../styles.module.css";
import { pagination } from "./pagination-helper";

export type PaginationProps = Omit<
	React.ComponentPropsWithoutRef<"nav">,
	"children"
> &
	(
		| {
				children?: never;
				current: number;
				show?: number;
				total: number;
				props: (props: {
					page: number;
					type: "prev" | "next" | "page";
				}) => Parameters<typeof Button>[0];
		  }
		| {
				children: React.ReactNode;
				current?: never;
				show?: never;
				total?: never;
				props?: never;
		  }
	);

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
	function Pagination(
		{ children, className, current, total, show = 7, props, ...rest },
		ref,
	) {
		const { pages, next, prev } = pagination({ current, total, show });

		return (
			<nav
				aria-label={rest["aria-label"] || "Pagination"}
				className={clsx(styles.pagination, className)}
				ref={ref}
				{...rest}
			>
				{children || (
					<ul>
						<li>
							<Button
								aria-disabled={!prev}
								{...props?.({ page: prev, type: "prev" })}
							/>
						</li>
						{pages.map(({ key, page, current }) => (
							<li key={key}>
								{!!page && (
									<Button
										aria-current={current}
										{...{ children: page }}
										{...props?.({ page, type: "page" })}
									/>
								)}
							</li>
						))}
						<li>
							<Button
								aria-disabled={!next}
								{...props?.({ page: next, type: "next" })}
							/>
						</li>
					</ul>
				)}
			</nav>
		);
	},
);
