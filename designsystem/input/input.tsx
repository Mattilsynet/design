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
			suppressHydrationWarning // Prevent hydration mismatch for SSR caused by field-observer.ts
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
			<select
				className={clsx(styles.input, className)}
				suppressHydrationWarning // Prevent hydration mismatch for SSR caused by field-observer.ts
				ref={ref}
				{...rest}
			/>
		);
	},
);

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	function Textarea({ className, ...rest }, ref) {
		return (
			<textarea
				className={clsx(styles.input, className)}
				suppressHydrationWarning // Prevent hydration mismatch for SSR caused by field-observer.ts
				ref={ref}
				{...rest}
			/>
		);
	},
);
