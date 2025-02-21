import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type { InputProps } from "../input/input";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type FieldBaseProps = InputProps & {
	"data-size"?: string;
	className?: InputProps["className"];
	style?: InputProps["style"];
	label?: React.ReactNode;
	description?: React.ReactNode;
	prefix?: string;
	suffix?: string;
	error?: React.ReactNode;
	count?: number;
};

export type FieldProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, FieldBaseProps>;

type FieldComponent = <As extends React.ElementType = "div">(
	props: FieldProps<As>,
) => JSX.Element;

export const FieldComp: FieldComponent = forwardRef<null>(function Field<
	As extends React.ElementType = "div",
>(
	{
		"data-size": size,
		as,
		className,
		count,
		description,
		error,
		label,
		prefix,
		style,
		suffix,
		...rest
	}: FieldProps<As>,
	ref?: PolymorphicRef<As>,
) {
	const Tag = as || "div";

	if (!as)
		return (
			<div className={clsx(styles.field, className)} ref={ref} {...rest} />
		);

	const affixes = !!suffix || !!prefix;
	const input = (
		<Tag className={styles.input} aria-invalid={!!error} ref={ref} {...rest} />
	);

	return (
		<Field className={className} data-size={size} style={style}>
			{!!label && <label>{label}</label>}
			{!!description && <p>{description}</p>}
			{affixes ? (
				<FieldAffixes>
					{!!prefix && <span>{prefix}</span>}
					{input}
					{!!suffix && <span>{suffix}</span>}
				</FieldAffixes>
			) : (
				input
			)}
			{!!error && <div className={styles.validation}>{error}</div>}
			{!!count && <p data-count={count} />}
		</Field>
	);
}) as FieldComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

const FieldAffixes = forwardRef<HTMLDivElement, FieldProps>(
	function FieldAffixes({ className, ...rest }, ref) {
		return (
			<div className={clsx(styles.affixes, className)} ref={ref} {...rest} />
		);
	},
);

export const Field = Object.assign(FieldComp, {
	Affixes: FieldAffixes,
});
