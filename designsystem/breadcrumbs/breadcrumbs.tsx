import {
	type JSX,
	forwardRef,
	// useEffect,
	// useImperativeHandle,
	// useRef,
} from "react";
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
		// const innerRef = useRef<HTMLDialogElement>(null);

		// useImperativeHandle(ref, () => innerRef.current as HTMLDialogElement); // Forward innerRef
		// useEffect(() => {
		// 	const lis = innerRef.current?.getElementsByTagName("li");
		// 	if (lis) for(const li as lis) {
		// 		li.setAttribute("role", "none"); // Remove role from li
		// 		li.firstElementChild?.setAttribute("role", "listitem"); //
		// 	}
		// 	const items = innerRef.current?.getElementsByTagName("li");
		// 	const last = items?.[items.length - 1].firstElementChild;

		// 	if (last instanceof HTMLElement) last.focus(); // Focus first link
		// });

		return (
			<Tag
				aria-label={rest["aria-label"] || "Du er her:"}
				className={`${styles.breadcrumbs} ${className}`}
				ref={ref}
				{...rest}
			/>
		);
	},
) as BreadcrumbsComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
