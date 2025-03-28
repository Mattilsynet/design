import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type ButtonBaseProps<Href> = {
	"data-arrow"?: "left" | "right" | true;
	"data-color"?: "main" | "danger";
	"data-justify"?: "start" | "center" | "right";
	"data-nowrap"?: boolean;
	"data-variant"?: "primary" | "secondary" | "tertiary";
	href?: Href;
};

export type ButtonProps<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "button",
> = PolymorphicComponentPropWithRef<As, ButtonBaseProps<Href>>;

type ButtonComponent = <
	Href,
	As extends React.ElementType = Href extends string ? "a" : "button",
>(
	props: ButtonProps<Href, As>,
) => JSX.Element;

export const Button: ButtonComponent = forwardRef<null>(function Button<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "button",
>({ as, className, ...rest }: ButtonProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "button");

	return <Tag className={clsx(styles.button, className)} ref={ref} {...rest} />;
}) as ButtonComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
