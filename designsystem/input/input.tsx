import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import styles from "../styles.module.css";

export type InputProps = React.ComponentPropsWithoutRef<"input">;
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, type = "text", ...rest },
	ref,
) {
	const innerRef = useRef<HTMLInputElement>(null);

	// Update counters and field sizing
	useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
	useEffect(() => {
		innerRef.current?.dispatchEvent(new CustomEvent("ds-field-update"));
		rest.value; // Prevent biome from linting "unused variable"
	}, [rest.value]);

	return (
		<input
			className={clsx(styles.input, className)}
			suppressHydrationWarning // Prevent hydration mismatch for SSR caused by field-observer.ts
			type={type}
			ref={innerRef}
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
		const innerRef = useRef<HTMLTextAreaElement>(null);

		// Update counters and field sizing
		useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);
		useEffect(() => {
			innerRef.current?.dispatchEvent(new CustomEvent("ds-field-update"));
			rest.value; // Prevent biome from linting "unused variable"
		}, [rest.value]);

		return (
			<textarea
				className={clsx(styles.input, className)}
				ref={innerRef}
				suppressHydrationWarning // Prevent hydration mismatch for SSR caused by field-observer.ts
				{...rest}
			/>
		);
	},
);
