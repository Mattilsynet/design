import clsx from "clsx";
import { forwardRef } from "react";
import type { InputProps } from "../react";
import styles from "../styles.module.css";

export type TogglegroupProps = React.ComponentPropsWithoutRef<"fieldset"> & {
	"data-toggle-group"?: string;
	"aria-label"?: string;
};
export type TogglegroupItemProps = Omit<
	React.ComponentPropsWithoutRef<"label">,
	"onChange"
> &
	Pick<InputProps, "defaultChecked" | "checked" | "onChange" | "value"> &
	Required<Pick<InputProps, "name">>; // Make name required

const TogglegroupComp = forwardRef<HTMLFieldSetElement, TogglegroupProps>(
	function Togglegroup(
		{
			"aria-label": label,
			"data-toggle-group": toggleGroupLabel,
			className,
			...rest
		},
		ref,
	) {
		return (
			<fieldset
				className={clsx(styles.togglegroup, className)}
				aria-label={label || toggleGroupLabel || "Valgknapper"}
				// @ts-expect-error focusgroup is not yet recognized by React type definitions for HTML elements.
				focusgroup="radiogroup"
				ref={ref}
				{...rest}
			/>
		);
	},
);
const TogglegroupItem = forwardRef<HTMLLabelElement, TogglegroupItemProps>(
	function TogglegroupItem(
		{ children, checked, defaultChecked, value, name, onChange, ...rest },
		ref,
	) {
		return (
			<label className={styles.button} ref={ref} {...rest}>
				<input
					{...{ type: "radio", checked, defaultChecked, value, name, onChange }}
				/>
				{children}
			</label>
		);
	},
);

export const Togglegroup = Object.assign(TogglegroupComp, {
	Item: TogglegroupItem,
});
