import type { ReactUtags, UHTMLTagsElement } from "@u-elements/u-tags";
import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import { HelpText } from "../react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

type FieldBaseProps = {
	count?: number;
	description?: React.ReactNode;
	error?: React.ReactNode; // Kept for backwards compatibility
	helpText?: React.ReactNode;
	helpTextLabel?: string;
	label?: React.ReactNode;
	options?: Array<string | { label: string; value: string }>;
	prefix?: string;
	suffix?: string;
	validation?: React.ReactNode;
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
		helpText,
		helpTextLabel,
		label,
		options,
		prefix,
		style,
		suffix,
		validation,
		...rest
	}: FieldProps<As>,
	ref?: PolymorphicRef<As>,
) {
	const Tag = as || "div";
	const affixes = !!suffix || !!prefix;
	const valid = validation || error; // error kept for backwards compatibility
	const shared = {
		"data-size": size,
		className: clsx(styles.field, className),
		style,
	};

	// Render options if select
	if (as === "select" && !rest.children)
		Object.assign(rest, {
			children: (
				<>
					{options
						?.map((o) => (typeof o === "string" ? { label: o, value: o } : o))
						.map(({ label, value }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
				</>
			),
		});

	// Using suppressHydrationWarning to avoid Next.js vs field-observer.ts hydration conflict
	return as ? (
		<div {...shared}>
			{!!label && <label suppressHydrationWarning>{label}</label>}
			{!!helpText && <HelpText aria-label={helpTextLabel}>{helpText}</HelpText>}
			{!!description && <p>{description}</p>}
			{affixes ? (
				<FieldAffixes>
					{!!prefix && <span>{prefix}</span>}
					<Tag className={styles.input} ref={ref} {...rest} />
					{!!suffix && <span>{suffix}</span>}
				</FieldAffixes>
			) : (
				<Tag
					className={styles.input}
					suppressHydrationWarning
					ref={ref}
					{...rest}
				/>
			)}
			{!!valid && <div className={styles.validation}>{valid}</div>}
			{!!count && <p data-count={count} />}
		</div>
	) : (
		<div ref={ref} {...shared} {...rest} />
	);
}) as FieldComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

const FieldAffixes = forwardRef<HTMLDivElement, FieldProps>(
	function FieldAffixes({ className, ...rest }, ref) {
		return (
			<div className={clsx(styles.affixes, className)} ref={ref} {...rest} />
		);
	},
);

export type FieldDatalistProps = React.ComponentPropsWithoutRef<"datalist">;

const FieldDatalist = forwardRef<HTMLDataListElement, FieldDatalistProps>(
	function FieldDatalist(props, ref) {
		return <u-datalist ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type FieldOptionProps = React.ComponentPropsWithoutRef<"option">;

const FieldOption = forwardRef<HTMLOptionElement, FieldOptionProps>(
	function FieldOption(props, ref) {
		return <u-option ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type FieldTagsProps = ReactUtags;

const FieldTags = forwardRef<UHTMLTagsElement, FieldTagsProps>(
	function FieldTags(props, ref) {
		return <u-tags ref={ref} {...toCustomElementProps(props)} />;
	},
);

export const Field = Object.assign(FieldComp, {
	Affixes: FieldAffixes,
	Datalist: FieldDatalist,
	Tags: FieldTags,
	Option: FieldOption,
});
