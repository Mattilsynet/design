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
	"data-gap"?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
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
			"data-fixed"?: boolean;
			"data-items"?:
				| "auto"
				| "5ch"
				| "10ch"
				| "15ch"
				| "20ch"
				| "25ch"
				| "30ch"
				| "35ch"
				| "40ch"
				| "45ch"
				| "50ch";
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
