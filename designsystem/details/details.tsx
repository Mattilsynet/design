import { forwardRef } from "react";
import styles from "../styles.module.css";
import "@u-elements/u-details";

export type DetailsProps = React.ComponentPropsWithoutRef<"details">;

export const Details = forwardRef<HTMLDetailsElement, DetailsProps>(
	function Details({ className, ...rest }, ref) {
		return (
			<u-details class={`${styles.details} ${className}`} ref={ref} {...rest} />
		);
	},
);
