import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type HeadingProps<As extends React.ElementType = "h2"> =
	PolymorphicComponentPropWithRef<As>;

type HeadingComponent = <As extends React.ElementType = "h2">(
	props: HeadingProps<As>,
) => JSX.Element;

export const Heading: HeadingComponent = forwardRef<null>(function Heading<
	As extends React.ElementType = "h2",
>({ as, className, ...rest }: HeadingProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "h2";

	return (
		<Tag className={`${styles.heading} ${className}`} ref={ref} {...rest} />
	);
}) as HeadingComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
