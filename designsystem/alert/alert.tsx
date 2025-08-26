import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type AlertProps<As extends React.ElementType = "output"> =
	PolymorphicComponentPropWithRef<
		As,
		{ "data-color"?: "info" | "success" | "warning" | "danger" | "neutral" }
	>;

type AlertComponent = <As extends React.ElementType = "output">(
	props: AlertProps<As>,
) => JSX.Element;

export const Alert: AlertComponent = forwardRef<null>(function Alert<
	As extends React.ElementType = "output",
>({ as, className, ...rest }: AlertProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "output";

	if (!rest.role && Tag !== "output") Object.assign(rest, { role: "alert" }); // Ensure role is set to 'alert' if not <output>

	return <Tag className={clsx(styles.alert, className)} ref={ref} {...rest} />;
}) as AlertComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
