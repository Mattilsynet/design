import type { ReactUtags, UHTMLTagsElement } from "@u-elements/u-tags";
import clsx from "clsx";
import {
	type JSX,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import type { InputProps } from "../input/input";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

type FieldBaseProps = InputProps & {
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
	const shared = {
		"data-size": size,
		className: clsx(styles.field, className),
		style,
	};
	const affixes = !!suffix || !!prefix;
	const input = (
		<Tag className={styles.input} aria-invalid={!!error} ref={ref} {...rest} />
	);

	return as ? (
		<div {...shared}>
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
	"data-filter"?: boolean | "true" | "false"; // Need string "false" as well as false is used as a value in field-observer
};

const FieldDatalist = forwardRef<HTMLDataListElement, FieldDatalistProps>(
	function FieldDatalist(rest, ref) {
		return <u-datalist ref={ref} {...rest} />;
	},
);

export type FieldOptionProps = React.ComponentPropsWithoutRef<"option">;

const FieldOption = forwardRef<HTMLOptionElement, FieldOptionProps>(
	function FieldOption(rest, ref) {
		return <u-option ref={ref} {...rest} />;
	},
);

export type FieldTagsProps = ReactUtags & {
	onTags?: (
		event: CustomEvent<{ item: HTMLDataElement; action: "add" | "remove" }>,
	) => void;
};

const FieldTags = forwardRef<UHTMLTagsElement, FieldTagsProps>(
	function FieldTags({ onTags, ...rest }, ref) {
		const innerRef = useRef<UHTMLTagsElement>(null);
		const onTagsRef = useRef<(event: CustomEvent) => void>(undefined); // Use ref to cache callback to reduce re-renders

		onTagsRef.current = onTags;
		useImperativeHandle(ref, () => innerRef.current as UHTMLTagsElement); // Forward innerRef
		useEffect(() => {
			const handleTags: FieldTagsProps["onTags"] = (event) => {
				event.preventDefault();
				onTagsRef.current?.(event);
			};

			innerRef.current?.addEventListener("tags", handleTags);
			return () => innerRef.current?.removeEventListener("tags", handleTags);
		}, []);

		return <u-tags ref={innerRef} {...rest} />;
	},
);

export const Field = Object.assign(FieldComp, {
	Affixes: FieldAffixes,
	Datalist: FieldDatalist,
	Tags: FieldTags,
	Option: FieldOption,
});
