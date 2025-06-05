import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type HeadingSizes = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type HeadingProps<As extends React.ElementType = "h2"> =
	PolymorphicComponentPropWithRef<
		As,
		{
			"data-size"?: HeadingSizes;
			"data-justify"?: "start" | "center";
		}
	>;

type HeadingComponent = <As extends React.ElementType = "h2">(
	props: HeadingProps<As>,
) => JSX.Element;

export const Heading: HeadingComponent = forwardRef<null>(function Heading<
	As extends React.ElementType = "h2",
>({ as, className, ...rest }: HeadingProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "h2";

	return (
		<Tag className={clsx(styles.heading, className)} ref={ref} {...rest} />
	);
}) as HeadingComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type MutedProps<As extends React.ElementType = "small"> =
	PolymorphicComponentPropWithRef<As>;

type MutedComponent = <As extends React.ElementType = "small">(
	props: MutedProps<As>,
) => JSX.Element;

export const Muted: MutedComponent = forwardRef<null>(function Muted<
	As extends React.ElementType = "small",
>({ as, className, ...rest }: MutedProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "small";
	return <Tag className={clsx(styles.muted, className)} ref={ref} {...rest} />;
}) as MutedComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type IngressProps<As extends React.ElementType = "span"> =
	PolymorphicComponentPropWithRef<As>;

type IngressComponent = <As extends React.ElementType = "span">(
	props: MutedProps<As>,
) => JSX.Element;

export const Ingress: IngressComponent = forwardRef<null>(function Ingress<
	As extends React.ElementType = "span",
>({ as, className, ...rest }: IngressProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "span";
	return (
		<Tag className={clsx(styles.ingress, className)} ref={ref} {...rest} />
	);
}) as IngressComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type InfoProps<As extends React.ElementType = "span"> =
	PolymorphicComponentPropWithRef<As>;

type InfoComponent = <As extends React.ElementType = "span">(
	props: MutedProps<As>,
) => JSX.Element;

export const Info: InfoComponent = forwardRef<null>(function Info<
	As extends React.ElementType = "span",
>({ as, className, ...rest }: InfoProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "span";
	return <Tag className={clsx(styles.info, className)} ref={ref} {...rest} />;
}) as InfoComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
