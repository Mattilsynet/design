import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type TagProps<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
> = PolymorphicComponentPropWithRef<As>;

type TagComponent = <
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
>(
	props: TagProps<Href, As>,
) => JSX.Element;

export const Tag: TagComponent = forwardRef<null>(function Tag<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
>({ as, className, ...rest }: TagProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "span");

	return <Tag className={clsx(styles.tag, className)} ref={ref} {...rest} />;
}) as TagComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
