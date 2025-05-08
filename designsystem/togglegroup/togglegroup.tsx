import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type TogglegroupProps = React.ComponentPropsWithoutRef<"fieldset">;
export type TogglegroupItemProps = Omit<
	React.ComponentPropsWithoutRef<"label">,
	"onChange"
> &
	Pick<
		React.ComponentPropsWithoutRef<"input">,
		"defaultChecked" | "checked" | "onChange"
	> & { name: string; value: string }; // Make name and value required

const TogglegroupComp = forwardRef<HTMLFieldSetElement, TogglegroupProps>(
	function Togglegroup({ className, ...rest }, ref) {
		return (
			<fieldset
				className={clsx(styles.togglegroup, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
);
const TogglegroupItem = forwardRef<HTMLLabelElement, TogglegroupItemProps>(
	function TogglegroupItem(
		{ children, checked, defaultChecked, name, onChange, ...rest },
		ref,
	) {
		return (
			<label ref={ref} {...rest}>
				<input type="radio" {...{ checked, defaultChecked, name, onChange }} />
				{children}
			</label>
		);
	},
);

export const Togglegroup = Object.assign(TogglegroupComp, {
	Item: TogglegroupItem,
});
