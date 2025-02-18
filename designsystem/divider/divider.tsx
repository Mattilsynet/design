import { forwardRef } from "react";
import styles from "../styles.module.css";

export type DividerProps = React.ComponentPropsWithoutRef<"hr">;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
	{ className, ...rest },
	ref,
) {
	return (
		// biome-ignore lint/a11y/noAriaHiddenOnFocusable: This is a decorative element
		<hr
			aria-hidden="true"
			className={`${styles.divider} ${className}`}
			ref={ref}
			{...rest}
		/>
	);
});
