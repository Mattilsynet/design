import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type DividerProps = React.ComponentPropsWithoutRef<"hr"> & {
	"data-gap"?:
		| "0"
		| "1"
		| "2"
		| "3"
		| "4"
		| "5"
		| "6"
		| "7"
		| "8"
		| "9"
		| "10"
		| "11"
		| "12"
		| "13"
		| "14"
		| "15"
		| "18"
		| "22"
		| "26"
		| "30"
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 18
		| 22
		| 26
		| 30;
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
	{ className, ...rest },
	ref,
) {
	return (
		// biome-ignore lint/a11y/noAriaHiddenOnFocusable: This is a decorative element
		<hr
			aria-hidden="true"
			className={clsx(styles.divider, className)}
			ref={ref}
			{...rest}
		/>
	);
});
