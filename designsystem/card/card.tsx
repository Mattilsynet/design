import clsx from "clsx";
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
	props: CardProps<Href, As>,
) => JSX.Element;

const CardComp: CardComponent = forwardRef<null>(function Card<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "div",
>({ as, className, ...rest }: CardProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "div");

	return <Tag className={clsx(styles.card, className)} ref={ref} {...rest} />;
}) as CardComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type GroupProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As>;

type GroupComponent = <As extends React.ElementType = "div">(
	props: GroupProps<As>,
) => JSX.Element;

export const Group: GroupComponent = forwardRef<null>(function Group<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: GroupProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.group, className)} ref={ref} {...rest} />;
}) as GroupComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type CardDetailsProps = React.ComponentPropsWithoutRef<"details">;
const CardDetails = forwardRef<HTMLDetailsElement, CardDetailsProps>(
	function CardDetails({ className, ...rest }, ref) {
		return (
			<u-details class={clsx(styles.card, className)} ref={ref} {...rest} />
		);
	},
);

export type CardSummaryProps = React.ComponentPropsWithoutRef<"summary">;
const CardSummary = forwardRef<HTMLElement, CardSummaryProps>(
	function CardSummary({ className, ...rest }, ref) {
		return <u-summary class={className} ref={ref} {...rest} />;
	},
);

export const Card = Object.assign(CardComp, {
	Details: CardDetails,
	Summary: CardSummary,
});
