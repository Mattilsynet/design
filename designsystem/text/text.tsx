import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type MutedProps<As extends React.ElementType = "small"> =
	PolymorphicComponentPropWithRef<As>;

export type IngressProps<As extends React.ElementType = "span"> =
	PolymorphicComponentPropWithRef<As>;

type MutedComponent = <As extends React.ElementType = "small">(
	props: MutedProps<As>,
) => JSX.Element;

type IngressComponent = <As extends React.ElementType = "span">(
	props: MutedProps<As>,
) => JSX.Element;

export const Muted: MutedComponent = forwardRef<null>(function Muted<
	As extends React.ElementType = "small",
>({ as, className, ...rest }: MutedProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "small";
	return <Tag className={clsx(styles.muted, className)} ref={ref} {...rest} />;
}) as MutedComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export const Ingress: IngressComponent = forwardRef<null>(function Ingress<
	As extends React.ElementType = "span",
>({ as, className, ...rest }: IngressProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "span";
	return (
		<Tag className={clsx(styles.ingress, className)} ref={ref} {...rest} />
	);
}) as IngressComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
