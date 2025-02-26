import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type SharedProps = {
	"data-align"?: "stretch" | "start" | "center" | "end";
	"data-center"?: "sm" | "md" | "lg" | "xl" | "2xl";
	"data-gap"?: "none" | "xs" | "sm" | "md" | "lg" | false;
	"data-justify"?:
		| "start"
		| "center"
		| "end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	"data-justify-content"?:
		| "start"
		| "center"
		| "end"
		| "space-between"
		| "space-around"
		| "space-evenly";
};

export type FlexProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, SharedProps>;

export type GridProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<
		As,
		SharedProps & {
			"data-grid"?:
				| "1"
				| "2"
				| "3"
				| "4"
				| "5"
				| "6"
				| "7"
				| "8"
				| "9"
				| "10"
				| "11"
				| "12"
				| "fit"
				| "fit-lg"
				| "fit-md"
				| "fit-sm"
				| "fit-xs"
				| "lg"
				| "md"
				| "sm"
				| "xs"
				| 1
				| 2
				| 3
				| 4
				| 5
				| 6
				| 7
				| 8
				| 9
				| 10
				| 11
				| 12;
		}
	>;

type FlexComponent = <As extends React.ElementType = "div">(
	props: FlexProps<As>,
) => JSX.Element;

type GridComponent = <As extends React.ElementType = "div">(
	props: GridProps<As>,
) => JSX.Element;

export const Flex: FlexComponent = forwardRef<null>(function Flex<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: FlexProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.flex, className)} ref={ref} {...rest} />;
}) as FlexComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export const Grid: GridComponent = forwardRef<null>(function Grid<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: GridProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.grid, className)} ref={ref} {...rest} />;
}) as GridComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
