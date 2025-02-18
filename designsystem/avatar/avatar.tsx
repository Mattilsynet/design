import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type AvatarBaseProps<Href> = {
	href?: Href;
};

export type AvatarProps<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
> = PolymorphicComponentPropWithRef<As, AvatarBaseProps<Href>>;

type AvatarComponent = <
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
>(
	props: AvatarProps<As>,
) => JSX.Element;

export const Avatar: AvatarComponent = forwardRef<null>(function Avatar<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "span",
>({ as, className, ...rest }: AvatarProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest.href ? "a" : "span");

	return (
		<Tag className={`${styles.avatar} ${className}`} ref={ref} {...rest} />
	);
}) as AvatarComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
