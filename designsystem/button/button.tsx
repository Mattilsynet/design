import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type ButtonBaseProps<Href> = {
	"data-arrow"?: "left" | "right" | true;
	"data-justify"?: "start" | "center" | "end" | "right" | "left";
	"data-nowrap"?: boolean;
	"data-variant"?: "primary" | "secondary" | "tertiary";
	"data-command"?: string;
	href?: Href;
	popovertarget?: string;
	popovertargetaction?: string;
};

export type ButtonProps<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "button",
> = PolymorphicComponentPropWithRef<As, ButtonBaseProps<Href>>;

type ButtonElement = ButtonProps<null, "button">;
type ButtonComponent = <
	Href,
	As extends React.ElementType = Href extends string ? "a" : "button",
>(
	props: ButtonProps<Href, As>,
) => JSX.Element;

export const Button: ButtonComponent = forwardRef<null>(function Button<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "button",
>(
	{ as, className, type, ...rest }: ButtonProps<Href, As>,
	ref?: PolymorphicRef<As>,
) {
	const Tag = as || (rest.href ? "a" : "button");

	if (Tag === "button" && (rest as ButtonElement)["aria-busy"])
		(rest as ButtonElement).disabled = true; // Automatically disable button if aria-busy is set

	return (
		<Tag
			suppressHydrationWarning // aria-label might change on client when using data-tooltip
			className={clsx(styles.button, className)}
			type={type ?? (Tag === "button" ? Tag : undefined)} // Default to type="button" if not set and tag is button
			ref={ref}
			{...rest}
		/>
	);
}) as ButtonComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
