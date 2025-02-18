import { forwardRef } from "react";
import styles from "../styles.module.css";

export type ChipProps = React.ComponentPropsWithoutRef<"label">;

export const Chip = forwardRef<HTMLLabelElement, ChipProps>(function Chip(
	{ className, ...rest },
	ref,
) {
	// TODO: Inputs
	return (
		<label className={`${styles.chip} ${className}`} ref={ref} {...rest} />
	);
});
