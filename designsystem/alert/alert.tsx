import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type AlertProps<As extends React.ElementType = "output"> =
	PolymorphicComponentPropWithRef<As>;

type AlertComponent = <As extends React.ElementType = "output">(
	props: AlertProps<As>,
) => JSX.Element;

export const Alert: AlertComponent = forwardRef<null>(function Alert<
	As extends React.ElementType = "output",
>({ as, className, ...rest }: AlertProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "output";

	return <Tag className={`${styles.alert} ${className}`} ref={ref} {...rest} />;
}) as AlertComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
