import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type CardBaseProps<Href> = {
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
	props: CardProps<As>,
) => JSX.Element;

export const Card: CardComponent = forwardRef<null>(function Card<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "div",
>({ as, className, ...rest }: CardProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "div");

	return <Tag className={`${styles.card} ${className}`} ref={ref} {...rest} />;
}) as CardComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
