import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
	PopoverValues,
} from "../react-types";
import styles from "../styles.module.css";

export type PopoverProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<
		As,
		{
			"data-position"?: "top" | "bottom" | "left" | "right";
			popover?: PopoverValues;
		}
	>;

type PopoverComponent = <As extends React.ElementType = "div">(
	props: PopoverProps<As>,
) => JSX.Element;

export const Popover: PopoverComponent = forwardRef<null>(function Popover<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: PopoverProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return (
		<Tag
			popover="auto"
			className={clsx(styles.popover, className)}
			ref={ref}
			{...rest}
		/>
	);
}) as PopoverComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
