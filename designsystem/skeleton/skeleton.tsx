import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type Variants = "circle" | "text" | "rectangle";
type SkeletonBaseProps<Variant extends Variants> = {
	"data-variant"?: Variant;
};

export type SkeletonProps<
	Variant extends Variants,
	As extends React.ElementType = Variant extends "text" ? "span" : "div",
> = PolymorphicComponentPropWithRef<As, SkeletonBaseProps<Variant>>;

type SkeletonComponent = <
	Variant extends Variants,
	As extends React.ElementType = Variant extends "text" ? "span" : "div",
>(
	props: SkeletonProps<Variant, As>,
) => JSX.Element;

export const Skeleton: SkeletonComponent = forwardRef<null>(function Skeleton<
	Variant extends Variants,
	As extends React.ElementType = Variant extends "text" ? "span" : "div",
>(
	{ as, className, ...rest }: SkeletonProps<Variant, As>,
	ref?: PolymorphicRef<As>,
) {
	const Tag = as || (rest.href ? "span" : "div");

	return (
		<Tag className={clsx(styles.skeleton, className)} ref={ref} {...rest} />
	);
}) as SkeletonComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
