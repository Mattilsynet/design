import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, type = "text", ...rest },
	ref,
) {
	return (
		<input
			className={clsx(styles.input, className)}
			type={type}
			ref={ref}
			{...rest}
		/>
	);
});
