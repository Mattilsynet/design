import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type ChipBaseProps<Removable> = {
	href?: Removable;
	"data-removable"?: boolean;
};

export type ChipProps<
	Removable,
	As extends React.ElementType = Removable extends true ? "button" : "label",
> = PolymorphicComponentPropWithRef<As, ChipBaseProps<Removable>>;

type ChipComponent = <
	Removable,
	As extends React.ElementType = Removable extends true ? "button" : "label",
>(
	props: ChipProps<Removable, As>,
) => JSX.Element;

export const Chip: ChipComponent = forwardRef<null>(function Chip<
	Href,
	As extends React.ElementType = Href extends string ? "a" : "div",
>({ as, className, ...rest }: ChipProps<Href, As>, ref?: PolymorphicRef<As>) {
	const Tag = as || (rest["data-removable"] ? "button" : "label");

	return <Tag className={clsx(styles.chip, className)} ref={ref} {...rest} />;
}) as ChipComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
