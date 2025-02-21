import clsx from "clsx";
import {
	type JSX,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
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
		const innerRef = useRef<As>(null);
		const Tag = as || "nav";

		useImperativeHandle(ref, () => innerRef.current as As); // Forward innerRef
		useEffect(() => {
			if (innerRef.current instanceof HTMLElement) {
				const items = innerRef.current.querySelectorAll("li > :is(a,button)");
				const last = items[items.length - 1];

				for (const item of items) {
					const action = item === last ? "setAttribute" : "removeAttribute";
					item[action]("aria-current", "page");
				}
			}
		});
		useImperativeHandle(ref, () => innerRef.current as As); // Forward innerRef
		useEffect(() => {
			if (innerRef.current instanceof HTMLElement) {
				const items = innerRef.current.querySelectorAll("li > :is(a,button)");
				const last = items[items.length - 1];

				for (const item of items) {
					const action = item === last ? "setAttribute" : "removeAttribute";
					item[action]("aria-current", "page");
				}
			}
		});

		return (
			<Tag
				aria-label={rest["aria-label"] || "Du er her:"}
				className={clsx(styles.breadcrumbs, className)}
				ref={innerRef}
				{...rest}
			/>
		);
	},
) as BreadcrumbsComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
