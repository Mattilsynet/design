import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type StepsProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<
		As,
		{
			"data-direction"?: "right" | "up" | "down";
			"data-fade"?: "true" | "false" | "start" | "end";
		}
	>;

type StepsComponent = <As extends React.ElementType = "div">(
	props: StepsProps<As>,
) => JSX.Element;

export const Steps: StepsComponent = forwardRef<null>(function Steps<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: StepsProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.steps, className)} ref={ref} {...rest} />;
}) as StepsComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
