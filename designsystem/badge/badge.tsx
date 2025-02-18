import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type BadgeProps<As extends React.ElementType = "span"> =
	PolymorphicComponentPropWithRef<As>;

type BadgeComponent = <As extends React.ElementType = "span">(
	props: BadgeProps<As>,
) => JSX.Element;

export const Badge: BadgeComponent = forwardRef<null>(function Badge<
	As extends React.ElementType = "span",
>({ as, className, ...rest }: BadgeProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "span";

	return <Tag className={`${styles.badge} ${className}`} ref={ref} {...rest} />;
}) as BadgeComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
