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

export type SummaryProps = React.ComponentPropsWithoutRef<"summary">;

export const Summary = forwardRef<HTMLElement, SummaryProps>(function Summary(
	{ className, ...rest },
	ref,
) {
	return <u-summary class={className} ref={ref} {...rest} />;
});
