import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
	Sizes,
} from "../react-types";
import styles from "../styles.module.css";

type CardBaseProps<Href> = {
	"data-pad"?: Sizes;
	href?: Href;
};

export type CardProps<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "div",
> = PolymorphicComponentPropWithRef<As, CardBaseProps<Href>>;

type CardComponent = <
	Href,
	As extends React.ElementType = Href extends string ? "a" : "div",
>(
	props: CardProps<Href, As>,
) => JSX.Element;

export const Card: CardComponent = forwardRef<null>(function Card<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "div",
>({ as, className, ...rest }: CardProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "div");

	return <Tag className={clsx(styles.card, className)} ref={ref} {...rest} />;
}) as CardComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type GroupProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, { "data-pad"?: Sizes }>;

type GroupComponent = <As extends React.ElementType = "div">(
	props: GroupProps<As>,
) => JSX.Element;

export const Group: GroupComponent = forwardRef<null>(function Group<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: GroupProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.group, className)} ref={ref} {...rest} />;
}) as GroupComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
