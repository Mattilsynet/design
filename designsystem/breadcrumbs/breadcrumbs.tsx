import type { DSBreadcrumbsElement } from "@digdir/designsystemet-web";
import { forwardRef } from "react";
import type { CustomReactElementProps } from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type BreadcrumbsProps = CustomReactElementProps<DSBreadcrumbsElement> & {
	/**
	 * @deprecated `as` prop is no longer supported.
	 */
	as?: never; // Remove `as` prop support
};

export const Breadcrumbs = forwardRef<DSBreadcrumbsElement, BreadcrumbsProps>(
	function Breadcrumbs(rest, ref) {
		return (
			<ds-breadcrumbs
				ref={ref}
				{...toCustomElementProps(rest, styles.breadcrumbs)}
			/>
		);
	},
);
