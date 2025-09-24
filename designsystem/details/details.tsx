import { forwardRef } from "react";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type DetailsProps = React.ComponentPropsWithoutRef<"details"> & {
	"data-variant"?: "default" | "card";
};
const DetailsComp = forwardRef<HTMLDetailsElement, DetailsProps>(
	function Details(props, ref) {
		return (
			<u-details ref={ref} {...toCustomElementProps(props, styles.details)} />
		);
	},
);

export type SummaryProps = React.ComponentPropsWithoutRef<"summary">;
const DetailsSummary = forwardRef<HTMLElement, SummaryProps>(
	function DetailsSummary(props, ref) {
		return <u-summary ref={ref} {...toCustomElementProps(props)} />;
	},
);

export const Details = Object.assign(DetailsComp, { Summary: DetailsSummary });
