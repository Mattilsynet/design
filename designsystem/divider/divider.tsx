import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type DividerProps = React.ComponentPropsWithoutRef<"hr"> & {
	"data-gap"?: "none" | "xs" | "sm" | "md" | "lg" | false;
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
