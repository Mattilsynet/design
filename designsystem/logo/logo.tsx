import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type LogoBaseProps<Href> = {
	"data-color"?: "orange" | "blue";
	href?: Href;
};

export type LogoProps<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
> = PolymorphicComponentPropWithRef<As, LogoBaseProps<Href>>;

type LogoComponent = <
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
>(
	props: LogoProps<Href, As>,
) => JSX.Element;

export const Logo: LogoComponent = forwardRef<null>(function Logo<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
>({ as, className, ...rest }: LogoProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "span");

	return <Tag className={clsx(styles.logo, className)} ref={ref} {...rest} />;
}) as LogoComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
