import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type FieldsetProps = React.ComponentPropsWithoutRef<"fieldset">;

export const FieldsetComp = forwardRef<HTMLFieldSetElement, FieldsetProps>(
	function Fieldset({ className, ...rest }, ref) {
		return (
			<fieldset
				suppressHydrationWarning // Since we will get aria-labelledby
				className={clsx(styles.fieldset, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
);

export type FieldsetLegendProps = React.ComponentPropsWithoutRef<"legend">;
const FieldsetLegend = forwardRef<HTMLLegendElement, FieldsetLegendProps>(
	function FieldsetLegend(rest, ref) {
		return <legend suppressHydrationWarning ref={ref} {...rest} />;
	},
);

export type FieldsetDescriptionProps = React.ComponentPropsWithoutRef<"p">;
const FieldsetDescription = forwardRef<
	HTMLParagraphElement,
	FieldsetDescriptionProps
>(function FieldsetDescription(rest, ref) {
	return (
		<p suppressHydrationWarning data-field="description" ref={ref} {...rest} />
	);
});

export const Fieldset = Object.assign(FieldsetComp, {
	Legend: FieldsetLegend,
	Description: FieldsetDescription,
});
