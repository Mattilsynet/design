import type { DSPaginationElement } from "@digdir/designsystemet-web";
import { pagination } from "@digdir/designsystemet-web";
import { forwardRef } from "react";
import { Button } from "../button/button";
import type { CustomReactElementProps } from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type PaginationProps = Omit<
	CustomReactElementProps<DSPaginationElement>,
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

export const Pagination = forwardRef<DSPaginationElement, PaginationProps>(
	function Pagination(
		{ children, current, total, show = 7, props, ...rest },
		ref,
	) {
		const { pages, next, prev } = pagination({ current, total, show });

		return (
			<ds-pagination
				ref={ref}
				{...toCustomElementProps(rest, styles.pagination)}
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
			</ds-pagination>
		);
	},
);
