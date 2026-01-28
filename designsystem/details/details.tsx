import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type DetailsProps = React.ComponentPropsWithoutRef<"details"> & {
	"data-align"?: "start" | "center";
	"data-variant"?: "default" | "card";
};
const DetailsComp = forwardRef<HTMLDetailsElement, DetailsProps>(
	function Details({ className, ...rest }, ref) {
		return (
			<details
				ref={ref}
				className={clsx(styles.details, className)}
				{...rest}
			/>
		);
	},
);

export type SummaryProps = React.ComponentPropsWithoutRef<"summary">;
const DetailsSummary = forwardRef<HTMLElement, SummaryProps>(
	function DetailsSummary(rest, ref) {
		return <summary ref={ref} suppressHydrationWarning {...rest} />;
	},
);

export const Details = Object.assign(DetailsComp, { Summary: DetailsSummary });
