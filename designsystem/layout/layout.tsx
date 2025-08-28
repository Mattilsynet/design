import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
	Sizes,
} from "../react-types";
import styles from "../styles.module.css";

type GapOld = "none" | "xs" | "sm" | "md" | "lg" | "xl";

type SharedProps = {
	"data-align"?: "normal" | "stretch" | "start" | "center" | "end";
	"data-align-content"?:
		| "start"
		| "center"
		| "end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	"data-center"?: "sm" | "md" | "lg" | "xl" | "2xl";
	"data-gap"?: Sizes | GapOld;
	"data-row-gap"?: Sizes;
	"data-column-gap"?: Sizes;
	"data-nowrap"?: boolean;
	"data-justify"?:
		| "start"
		| "center"
		| "end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	"data-fixed"?: boolean;
	"data-items"?:
		| "auto"
		| "full"
		| "50"
		| "100"
		| "150"
		| "200"
		| "250"
		| "300"
		| "350"
		| "400"
		| "450"
		| "500"
		| 50
		| 100
		| 150
		| 200
		| 250
		| 300
		| 350
		| 400
		| 450
		| 500;
};

/**
 * Flex
 */
export type FlexProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, SharedProps>;

type FlexComponent = <As extends React.ElementType = "div">(
	props: FlexProps<As>,
) => JSX.Element;

export const Flex: FlexComponent = forwardRef<null>(function Flex<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: FlexProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.flex, className)} ref={ref} {...rest} />;
}) as FlexComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

/**
 * Grid
 */
export type GridProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, SharedProps>;

type GridComponent = <As extends React.ElementType = "div">(
	props: GridProps<As>,
) => JSX.Element;

export const Grid: GridComponent = forwardRef<null>(function Grid<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: GridProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.grid, className)} ref={ref} {...rest} />;
}) as GridComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
