"use client";
import type { DSSuggestionElement } from "@digdir/designsystemet-web";
import type { Placement } from "@floating-ui/dom";
import clsx from "clsx";
import type { JSX } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { HelpText } from "../helptext/helptext";
import { Input, type InputProps } from "../input/input";
import type {
	CustomReactElementProps,
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";
import { Validation } from "../validation/validation";

type FieldBaseProps = {
	count?: number;
	description?: React.ReactNode;
	error?: React.ReactNode; // Kept for backwards compatibility
	helpText?: React.ReactNode;
	helpTextLabel?: string;
	label?: React.ReactNode;
	options?: string[] | FieldSuggestionSelected;
	prefix?: string;
	readOnly?: boolean; // Allow readoOnly also on <select>
	suffix?: string;
	validation?: React.ReactNode;
};

export type FieldProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, FieldBaseProps>;

type FieldComponent = <As extends React.ElementType = "div">(
	props: FieldProps<As>,
) => JSX.Element;

const toOption = (
	o: FieldSuggestionSelected[number] | string,
): FieldSuggestionSelected[number] =>
	typeof o === "string" ? { label: o, value: o } : o;

export const FieldComp: FieldComponent = forwardRef<null>(function Field<
	As extends React.ElementType = "div",
>(
	{
		"data-size": size,
		"data-validation": dataValidation,
		as,
		className,
		count,
		description,
		error,
		helpText,
		helpTextLabel,
		label,
		prefix,
		style,
		suffix,
		validation: validationContent,
		...rest
	}: FieldProps<As>,
	ref?: PolymorphicRef<As>,
) {
	const Tag = as || "ds-field";
	const affixes = !!suffix || !!prefix;
	const validation = validationContent || error; // error kept for backwards compatibility
	const shared = {
		"data-size": size,
		"data-validation": dataValidation,
		class: clsx(styles.field, className),
		suppressHydrationWarning: true,
		style,
	};

	// Render options if select
	if (as === "select" && !rest.children)
		Object.assign(rest, {
			options: undefined, // Ensure options is not passed to DOM
			children: (
				<>
					{(rest.options as FieldBaseProps["options"])
						?.map(toOption)
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
		<ds-field {...shared}>
			{!!label && <FieldLabel>{label}</FieldLabel>}
			{!!helpText && <HelpText aria-label={helpTextLabel}>{helpText}</HelpText>}
			{!!description && <FieldDescription>{description}</FieldDescription>}
			{affixes ? (
				<FieldAffixes>
					{!!prefix && <span>{prefix}</span>}
					<Tag
						className={typeof as === "string" ? styles.input : undefined}
						suppressHydrationWarning
						ref={ref}
						{...rest}
					/>
					{!!suffix && <span>{suffix}</span>}
				</FieldAffixes>
			) : (
				<Tag
					className={typeof as === "string" ? styles.input : undefined}
					suppressHydrationWarning
					ref={ref}
					{...rest}
				/>
			)}
			{!!validation && <Validation>{validation}</Validation>}
			{!!count && <FieldCount data-limit={count} />}
		</ds-field>
	) : (
		<ds-field ref={ref} {...shared} {...rest} />
	);
}) as FieldComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export type FieldAffixProps = React.ComponentPropsWithoutRef<"div">;
const FieldAffixes = forwardRef<HTMLDivElement, FieldAffixProps>(
	function FieldAffixes({ className, ...rest }, ref) {
		return (
			<div className={clsx(styles.affixes, className)} ref={ref} {...rest} />
		);
	},
);

export type FieldDatalistProps = React.ComponentPropsWithoutRef<"datalist"> & {
	"data-nofilter"?: boolean;
	/**
	 * @deprecated Use `data-placement` instead.
	 */
	"data-position"?: Placement;
	"data-placement"?: Placement;
};

const FieldDatalist = forwardRef<HTMLDataListElement, FieldDatalistProps>(
	function FieldDatalist(
		{ "data-position": placement, "data-nofilter": filter, ...rest },
		ref,
	) {
		return (
			<u-datalist
				data-placement={placement} // Backward compatibility
				data-nofilter={!!filter || undefined} // Ensure data-nofilter is set correctly
				ref={ref}
				{...toCustomElementProps(rest)}
			/>
		);
	},
);

export type FieldOptionProps = React.ComponentPropsWithoutRef<"option">;
const FieldOption = forwardRef<HTMLOptionElement, FieldOptionProps>(
	function FieldOption(props, ref) {
		return <u-option ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type FieldComboboxSelected = FieldSuggestionSelected; // Backwards compatibility
export type FieldComboboxProps = FieldSuggestionProps; // Backwards compatibility

export type FieldSuggestionSelected = {
	label: string;
	value: string;
	children?: React.ReactNode;
}[];
export type FieldSuggestionProps = Omit<
	CustomReactElementProps<DSSuggestionElement>,
	"onChange" | "onInput"
> & {
	"data-creatable"?: boolean;
	"data-multiple"?: boolean;
	onAfterChange?: (e: CustomEvent<HTMLDataElement>) => void; // Backwards compatibility
	onAfterSelect?: (e: CustomEvent<HTMLDataElement>) => void; // Custom event to handle before change
	onBeforeChange?: (e: CustomEvent<HTMLDataElement>) => void; // Backwards compatibility
	onBeforeMatch?: (e: CustomEvent<HTMLOptionElement>) => void; // Custom event to handle before change
	onBeforeSelect?: (e: CustomEvent<HTMLDataElement>) => void; // Custom event to handle before change
	onSelectedChange?: (selected: FieldSuggestionSelected) => void; // Allow onChange to be a function that returns void
	options?: FieldSuggestionSelected;
	selected?: FieldSuggestionSelected; // Allow value to be a string or an array of strings for multiple select
} & Pick<
		InputProps,
		| "disabled"
		| "name"
		| "onChange"
		| "onInput"
		| "placeholder"
		| "readOnly"
		| "type"
		| "value"
	> & // Allow input props to be passed down
	Pick<
		FieldDatalistProps,
		"data-position" | "data-placement" | "data-nofilter"
	>; // Allow datalist props to be passed down

const FieldSuggestion = forwardRef<
	DSSuggestionElement,
	FieldSuggestionProps | FieldSuggestionProps
>(function FieldSuggestion(
	{
		"aria-required": required,
		"data-position": position,
		"data-placement": placement,
		"data-nofilter": nofilter,
		"data-multiple": multiple,
		onAfterChange, // Backwards compatibility
		onAfterSelect,
		onBeforeChange, // Backwards compatibility
		onBeforeMatch,
		onBeforeSelect,
		onSelectedChange,
		onInput,
		onChange,
		children,
		disabled,
		name,
		options,
		placeholder,
		readOnly,
		selected,
		type,
		...props
	},
	ref,
) {
	const innerRef = useRef<DSSuggestionElement>(null);
	const onSelected = useRef(onSelectedChange);
	onSelected.current = onSelectedChange; // Sync the latest onSelectedChange function

	// Deprecated props
	if (onAfterChange) {
		onAfterSelect = onAfterChange;
		window.dsWarnings === false ||
			console.warn(
				`\x1B[1m@mattilsynet/design - deprecation warning:\x1B[m onAfterChange is deprecated, please use onAfterSelect instead`,
			);
	}

	if (onBeforeChange) {
		onBeforeSelect = onBeforeChange;
		window.dsWarnings === false ||
			console.warn(
				`\x1B[1m@mattilsynet/design - deprecation warning:\x1B[m onBeforeChange is deprecated, please use onBeforeSelect instead`,
			);
	}

	// Using useEffect for React 18 and lower compatibility
	useImperativeHandle(ref, () => innerRef.current as DSSuggestionElement); // Forward innerRef
	useEffect(() => {
		const self = innerRef.current;
		const handleChange = (event: CustomEvent<HTMLDataElement>) => {
			const handleSelected = onSelected.current;
			if (!onSelected) return; // No onSelectedChange function provided, let ds-suggestion handle it
			event.preventDefault();
			const { isConnected: remove, textContent, value } = event.detail;
			const label = textContent?.trim() || "";
			const prev = selected || [];

			if (remove) handleSelected?.(prev.filter((i) => i.value !== value));
			else if (multiple) handleSelected?.([...prev, { value, label }]);
			else handleSelected?.([{ value, label }]);
		};

		self?.addEventListener("comboboxbeforeselect", handleChange);
		return () =>
			self?.removeEventListener("comboboxbeforeselect", handleChange);
	}, [multiple, selected]);

	return (
		<ds-suggestion
			data-multiple={multiple || undefined}
			{...toCustomElementProps(
				{
					oncomboboxbeforeselect: onBeforeSelect,
					oncomboboxbeforematch: onBeforeMatch,
					oncomboboxafterselect: onAfterSelect,
					ref: innerRef,
					...props,
				},
				styles.suggestion,
			)}
		>
			{selected?.map(({ children, label, value }) => (
				<data key={value} value={value} suppressHydrationWarning>
					{children ?? label}
				</data>
			))}
			{children || (
				<>
					<Input
						aria-required={required}
						disabled={disabled}
						name={name}
						onInput={onInput}
						onChange={onChange}
						placeholder={placeholder}
						readOnly={readOnly}
						type={type}
					/>
					<del aria-label="Fjern tekst" suppressHydrationWarning />
				</>
			)}
			{!!options && (
				<FieldDatalist
					data-nofilter={nofilter}
					data-placement={placement || position}
				>
					{options.map(toOption).map(({ children, label, value }) => (
						<FieldOption key={value} value={value} label={label}>
							{children ?? label}
						</FieldOption>
					))}
				</FieldDatalist>
			)}
		</ds-suggestion>
	);
});

export type FieldLabelProps = React.ComponentPropsWithoutRef<"label">;
const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
	function FieldLabel(rest, ref) {
		return <label suppressHydrationWarning ref={ref} {...rest} />;
	},
);

export type FieldDescriptionProps = React.ComponentPropsWithoutRef<"p">;
const FieldDescription = forwardRef<
	HTMLParagraphElement,
	FieldDescriptionProps
>(function FieldDescription(rest, ref) {
	return (
		<div
			suppressHydrationWarning
			data-field="description"
			ref={ref}
			{...rest}
		/>
	);
});

export type FieldCountProps = React.ComponentPropsWithoutRef<"p"> & {
	/**
	 * @deprecated Use "data-limit" instead
	 */
	"data-count"?: number;
	"data-limit": number;
};
const FieldCount = forwardRef<HTMLParagraphElement, FieldCountProps>(
	function FieldCount(
		{ "data-count": count, "data-limit": limit, ...rest },
		ref,
	) {
		return (
			<Validation
				data-field="counter"
				data-limit={limit || count}
				ref={ref}
				{...rest}
			/>
		);
	},
);

export const Field = Object.assign(FieldComp, {
	Affixes: FieldAffixes,
	/**
	 * @deprecated Use Field.Suggestion instead
	 */
	Combobox: FieldSuggestion, // Backwards compatibility
	Suggestion: FieldSuggestion,
	Datalist: FieldDatalist,
	Option: FieldOption,
	Description: FieldDescription,
	Label: FieldLabel,
	Count: FieldCount,
});
