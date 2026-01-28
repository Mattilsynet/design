import type { DSErrorSummaryElement } from "@digdir/designsystemet-web";
import { forwardRef } from "react";
import type { CustomReactElementProps } from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type ErrorsummaryProps = CustomReactElementProps<DSErrorSummaryElement>;

export const Errorsummary = forwardRef<
	DSErrorSummaryElement,
	ErrorsummaryProps
>(function Errorsummary(rest, ref) {
	return (
		<ds-error-summary
			ref={ref}
			{...toCustomElementProps(rest, styles.errorsummary)}
		/>
	);
});
