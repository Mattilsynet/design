import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";
import "@u-elements/u-details";

export type DetailsProps = React.ComponentPropsWithoutRef<"details">;
const DetailsComp = forwardRef<HTMLDetailsElement, DetailsProps>(
	function Details({ className, ...rest }, ref) {
		return (
			<u-details class={clsx(styles.details, className)} ref={ref} {...rest} />
		);
	},
);

export type SummaryProps = React.ComponentPropsWithoutRef<"summary">;
const Summary = forwardRef<HTMLElement, SummaryProps>(function Summary(
	{ className, ...rest },
	ref,
) {
	return <u-summary class={className} ref={ref} {...rest} />;
});

export const Details = Object.assign(DetailsComp, { Summary });
