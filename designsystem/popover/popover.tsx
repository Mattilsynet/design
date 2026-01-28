import type { Placement } from "@floating-ui/dom";
import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type PopoverProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<
		As,
		{
			/**
			 * @deprecated Use `data-placement` instead.
			 */
			"data-position"?: Placement;
			"data-placement"?: Placement;
			"data-overscroll"?: "contain";
			popover?: React.HTMLAttributes<HTMLElement>["popover"];
		}
	>;

type PopoverComponent = <As extends React.ElementType = "div">(
	props: PopoverProps<As>,
) => JSX.Element;

export const Popover: PopoverComponent = forwardRef<null>(function Popover<
	As extends React.ElementType = "div",
>(
	{ as, "data-position": placement, className, ...rest }: PopoverProps<As>,
	ref?: PolymorphicRef<As>,
) {
	const Tag = as || "div";

	return (
		<Tag
			className={clsx(styles.popover, className)}
			data-placement={placement} // Backward compatibility
			suppressHydrationWarning // Client side attributes changes when positioning is calculated
			popover="auto"
			ref={ref}
			{...rest}
		/>
	);
}) as PopoverComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
