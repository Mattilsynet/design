import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type BreadcrumbsProps<As extends React.ElementType = "nav"> =
	PolymorphicComponentPropWithRef<As, { "aria-label"?: string }>;

type BreadcrumbsComponent = <As extends React.ElementType = "nav">(
	props: BreadcrumbsProps<As>,
) => JSX.Element;

export const Breadcrumbs: BreadcrumbsComponent = forwardRef<null>(
	function Breadcrumbs<As extends React.ElementType = "nav">(
		{ as, className, ...rest }: BreadcrumbsProps<As>,
		ref?: PolymorphicRef<As>,
	) {
		const Tag = as || "nav";

		return (
			<Tag
				aria-label={rest["aria-label"] || "Du er her:"}
				className={clsx(styles.breadcrumbs, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
) as BreadcrumbsComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
