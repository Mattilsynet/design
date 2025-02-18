import { forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type LinkProps<As extends React.ElementType = "a"> =
	PolymorphicComponentPropWithRef<As>;

type LinkComponent = <As extends React.ElementType = "a">(
	props: LinkProps<As>,
) => React.ReactElement | null;

export const Link: LinkComponent = forwardRef<null>(function Link<
	As extends React.ElementType = "a",
>({ as, className, ...rest }: LinkProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "a";
	return <Tag className={`${styles.link} ${className}`} {...rest} ref={ref} />;
}) as LinkComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
