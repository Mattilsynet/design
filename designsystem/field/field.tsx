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
	onInput?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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

const FieldAffixes = forwardRef<HTMLDivElement, FieldProps>(
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
	onAfterChange?: (e: CustomEvent<HTMLDataElement>) => void; // Custom event to handle before change
	onBeforeChange?: (e: CustomEvent<HTMLDataElement>) => void; // Custom event to handle before change
	onBeforeMatch?: (e: CustomEvent<HTMLOptionElement>) => void; // Custom event to handle before change
} & (
		| {
				"data-nofilter"?: boolean;
				selected: FieldComboboxSelected; // Allow value to be a string or an array of strings for multiple select
				options: FieldComboboxSelected;
				onSelectedChange: (selected: FieldComboboxSelected) => void; // Allow onChange to be a function that returns void
		  }
		| {
				"data-nofilter"?: never;
				selected?: never;
				options?: never;
				onSelectedChange?: never;
		  }
	);

const FieldCombobox = forwardRef<UHTMLComboboxElement, FieldComboboxProps>(
	function FieldCombobox(
		{
			"data-multiple": multiple,
			"data-nofilter": nofilter,
			children,
			onAfterChange,
			onBeforeChange,
			onBeforeMatch,
			onSelectedChange,
			options,
			selected,
			...props
		},
		ref,
	) {
		const innerRef = useRef<UHTMLComboboxElement>(null);
		const isControlled = selected !== undefined;
		const handleSelected = useRef(onSelectedChange);
		handleSelected.current = onSelectedChange; // Keep the latest onSelectedChange function

		useImperativeHandle(ref, () => innerRef.current as UHTMLComboboxElement); // Forward innerRef
		useEffect(() => {
			const self = innerRef.current;
			const handleBeforeChange = (event: CustomEvent<HTMLDataElement>) => {
				event.preventDefault();
				const { isConnected: remove, textContent, value } = event.detail;
				const onSelected = handleSelected.current;
				const label = textContent?.trim() || "";
				const prev = selected || [];

				if (remove) onSelected?.(prev.filter((i) => i.value !== value));
				else if (multiple) onSelected?.([...prev, { value, label }]);
				else onSelected?.([{ value, label }]);
			};

			self?.addEventListener("beforechange", handleBeforeChange);
			return () =>
				self?.removeEventListener("beforechange", handleBeforeChange);
		}, [multiple, selected]);

		return (
			<u-combobox
				/* @ts-expect-error React 19 supports custom events out of the box */
				onbeforechange={onBeforeChange}
				onbeforematch={onBeforeMatch}
				onafterchange={onAfterChange}
				data-multiple={multiple}
				ref={innerRef}
				{...toCustomElementProps(props)}
			>
				{isControlled ? (
					<>
						{selected?.map(({ children, label, value }) => (
							<data key={value} value={value} suppressHydrationWarning>
								{children ?? label}
							</data>
						))}
						<Input />
						<del {...toCustomElementProps({ "aria-label": "Fjern tekst" })} />
						<FieldDatalist data-nofilter={nofilter || undefined}>
							{options?.map(toOption).map(({ children, label, value }) => (
								<FieldOption key={value} value={value} label={label}>
									{children ?? label}
								</FieldOption>
							))}
						</FieldDatalist>
					</>
				) : (
					children
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
