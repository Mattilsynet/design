import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type SharedProps = {
	"data-align"?: "normal" | "stretch" | "start" | "center" | "end";
	"data-center"?: "sm" | "md" | "lg" | "xl" | "2xl";
	"data-gap"?:
		| "0"
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
		| "13"
		| "14"
		| "15"
		| "18"
		| "22"
		| "26"
		| "30"
		| 0
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
		| 12
		| 13
		| 14
		| 15
		| 18
		| 22
		| 26
		| 30
		// Backwards compatibility:
		| "none"
		| "sm"
		| "md"
		| "lg"
		| "xl";
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
	"data-fixed"?: boolean;
	"data-items"?:
		| "auto"
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

/**
 * Prose
 */
export type ProseProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As>;

type ProseComponent = <As extends React.ElementType = "div">(
	props: ProseProps<As>,
) => JSX.Element;

export const Prose: ProseComponent = forwardRef<null>(function Prose<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: ProseProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.prose, className)} ref={ref} {...rest} />;
}) as ProseComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

/**
 * App
 */
export type AppProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As>;

type AppComponent = <As extends React.ElementType = "div">(
	props: AppProps<As>,
) => JSX.Element;

export const App: AppComponent = forwardRef<null>(function App<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: AppProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.app, className)} ref={ref} {...rest} />;
}) as AppComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
