import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type LayoutProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As>;

type LayoutComponent = <As extends React.ElementType = "div">(
	props: LayoutProps<As>,
) => JSX.Element;

export type FlexProps<As extends React.ElementType = "div"> = LayoutProps<As>;
export const Flex: LayoutComponent = forwardRef<null>(function Flex<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: LayoutProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.flex, className)} ref={ref} {...rest} />;
}) as LayoutComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type GridProps<As extends React.ElementType = "div"> = LayoutProps<As>;
export const Grid: LayoutComponent = forwardRef<null>(function Grid<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: LayoutProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.grid, className)} ref={ref} {...rest} />;
}) as LayoutComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
