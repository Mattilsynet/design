import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type FieldsetProps = React.ComponentPropsWithoutRef<"fieldset">;

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
	function Fieldset({ className, ...rest }, ref) {
		return (
			<fieldset
				className={clsx(styles.fieldset, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
);
