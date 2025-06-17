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
			suppressHydrationWarning // Prevent hydration mismatch for SSR due to field-observer.ts
			className={clsx(styles.input, className)}
			type={type}
			ref={ref}
			{...rest}
		/>
	);
});

export type SelectProps = React.ComponentPropsWithoutRef<"select">;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	function Select({ className, ...rest }, ref) {
		return (
			<select className={clsx(styles.input, className)} ref={ref} {...rest} />
		);
	},
);
