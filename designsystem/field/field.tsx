import type {
	ReactUcombobox,
	UHTMLComboboxElement,
} from "@u-elements/u-combobox";
import clsx from "clsx";
import {
	forwardRef,
	type JSX,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import { HelpText, Input } from "../react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";
import { type AnchorPosition, toCustomElementProps } from "../utils";

type FieldBaseProps = {
	count?: number;
	description?: React.ReactNode;
	error?: React.ReactNode; // Kept for backwards compatibility
	helpText?: React.ReactNode;
	helpTextLabel?: string;
	label?: React.ReactNode;
	options?: string[] | FieldComboboxSelected;
	prefix?: string;
	readOnly?: boolean; // Allow readoOnly also on <select>
	suffix?: string;
	validation?: React.ReactNode;
	value?: React.ComponentPropsWithRef<"input">["value"];
	onInput?: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => void;
};

export type FieldProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As, FieldBaseProps>;

type FieldComponent = <As extends React.ElementType = "div">(
	props: FieldProps<As>,
) => JSX.Element;

const toOption = (
	o: FieldComboboxSelected[number] | string,
): FieldComboboxSelected[number] =>
	typeof o === "string" ? { label: o, value: o } : o;

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
					className={typeof as === "string" ? styles.input : undefined}
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
	"data-position"?: AnchorPosition;
};

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

export type FieldComboboxSelected = {
	label: string;
	value: string;
	children?: React.ReactNode;
}[];
export type FieldComboboxProps = ReactUcombobox & {
	"data-creatable"?: boolean;
	"data-multiple"?: boolean;
	"data-nofilter"?: boolean;
	onAfterChange?: (e: CustomEvent<HTMLDataElement>) => void; // deprecated
	onBeforeChange?: (e: CustomEvent<HTMLDataElement>) => void; // deprecated
	onAfterSelect?: (e: CustomEvent<HTMLDataElement>) => void; // Custom event to handle before change
	onBeforeSelect?: (e: CustomEvent<HTMLDataElement>) => void; // Custom event to handle before change
	onBeforeMatch?: (e: CustomEvent<HTMLOptionElement>) => void; // Custom event to handle before change
	onSelectedChange?: (selected: FieldComboboxSelected) => void; // Allow onChange to be a function that returns void
	disabled?: boolean; // Allow disabled prop to be passed down
	options?: FieldComboboxSelected;
	readOnly?: boolean; // Allow disabled prop to be passed down
	selected?: FieldComboboxSelected; // Allow value to be a string or an array of strings for multiple select
	placeholder?: string; // Allow placeholder to be passed down
};

const FieldCombobox = forwardRef<UHTMLComboboxElement, FieldComboboxProps>(
	function FieldCombobox(
		{
			"data-multiple": multiple,
			"data-nofilter": nofilter,
			onAfterChange,
			onBeforeChange,
			onAfterSelect,
			onBeforeSelect,
			onBeforeMatch,
			onSelectedChange,
			children,
			disabled,
			options,
			readOnly,
			selected,
			placeholder,
			...props
		},
		ref,
	) {
		const innerRef = useRef<UHTMLComboboxElement>(null);
		const onSelected = useRef(onSelectedChange);
		onSelected.current = onSelectedChange; // Sync the latest onSelectedChange function

		// Deprecated props
		if (onAfterChange) {
			onAfterSelect = onAfterChange;
			console.warn(
				`Combobox onAfterChange is deprecated, use onAfterSelect instead.`,
			);
		}
		if (onBeforeChange) {
			onBeforeSelect = onBeforeChange;
			console.warn(
				`Combobox onBeforeChange is deprecated, use onBeforeSelect instead.`,
			);
		}

		useImperativeHandle(ref, () => innerRef.current as UHTMLComboboxElement); // Forward innerRef
		useEffect(() => {
			const self = innerRef.current;
			const handleChange = (event: CustomEvent<HTMLDataElement>) => {
				const handleSelected = onSelected.current;
				if (!onSelected) return; // No onSelectedChange function provided, let u-combobox handle it
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
			<u-combobox
				{...toCustomElementProps({
					"data-multiple": multiple,
					oncomboboxbeforeselect: onBeforeSelect,
					oncomboboxbeforematch: onBeforeMatch,
					oncomboboxafterselect: onAfterSelect,
					ref: innerRef,
					...props,
				})}
			>
				{selected?.map(({ children, label, value }) => (
					<data key={value} value={value} suppressHydrationWarning>
						{children ?? label}
					</data>
				))}
				{children || (
					<>
						<Input disabled={disabled} readOnly={readOnly} placeholder={placeholder} />
						<del {...toCustomElementProps({ "aria-label": "Fjern tekst" })} />
					</>
				)}
				{!!options && (
					<FieldDatalist data-nofilter={nofilter || undefined}>
						{options.map(toOption).map(({ children, label, value }) => (
							<FieldOption key={value} value={value} label={label}>
								{children ?? label}
							</FieldOption>
						))}
					</FieldDatalist>
				)}
			</u-combobox>
		);
	},
);

export const Field = Object.assign(FieldComp, {
	Affixes: FieldAffixes,
	Combobox: FieldCombobox,
	Datalist: FieldDatalist,
	Option: FieldOption,
});
