import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type PrintProps<As extends React.ElementType = "section"> =
	PolymorphicComponentPropWithRef<
		As,
		{
			"data-variant"?: "front" | "back";
		}
	>;

type PrintComponent = <As extends React.ElementType = "section">(
	props: PrintProps<As>,
) => JSX.Element;

export const Print: PrintComponent = forwardRef<null>(function Print<
	As extends React.ElementType = "section",
>({ as, className, ...rest }: PrintProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "section";

	return <Tag className={clsx(styles.print, className)} ref={ref} {...rest} />;
}) as PrintComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
