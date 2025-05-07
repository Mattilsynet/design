import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type TogglegroupProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As>;

type TogglegroupComponent = <As extends React.ElementType = "div">(
	props: TogglegroupProps<As>,
) => JSX.Element;

export const Togglegroup: TogglegroupComponent = forwardRef<null>(
	function Togglegroup<As extends React.ElementType = "div">(
		{ as, className, ...rest }: TogglegroupProps<As>,
		ref?: PolymorphicRef<As>,
	) {
		const Tag = as || "div";

		return (
			<Tag
				className={clsx(styles.togglegroup, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
) as TogglegroupComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
