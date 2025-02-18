import { forwardRef } from "react";
import styles from "../styles.module.css";

export type FieldsetProps = React.ComponentPropsWithoutRef<"fieldset">;

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
	function Fieldset({ className, ...rest }, ref) {
		return (
			<fieldset
				className={`${styles.fieldset} ${className}`}
				ref={ref}
				{...rest}
			/>
		);
	},
);
