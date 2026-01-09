// Implementation of reusable polymorphic types
// Explaination: https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
type AsProp<As extends React.ElementType> = { as?: As };
type PropsToOmit<As extends React.ElementType, P> = keyof (AsProp<As> & P);
type PolymorphicComponentProp<
	As extends React.ElementType,
	Props = object,
> = React.PropsWithChildren<Props & AsProp<As>> &
	Omit<React.ComponentPropsWithoutRef<As>, PropsToOmit<As, Props>>;

// This is a new type utitlity with ref
export type PolymorphicComponentPropWithRef<
	As extends React.ElementType,
	Props = object,
> = PolymorphicComponentProp<As, Props> & { ref?: PolymorphicRef<As> };

// This is the type for the "ref" only
export type PolymorphicRef<As extends React.ElementType> =
	React.ComponentPropsWithRef<As>["ref"];

export type CustomReactElementProps<T> = {
	class?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;

export type Sizes =
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "10"
	| "11"
	| "12"
	| "13"
	| "14"
	| "15"
	| "18"
	| "22"
	| "26"
	| "30"
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 18
	| 22
	| 26
	| 30;

declare global {
	namespace React {
		/* biome-ignore lint/correctness/noUnusedVariables: The <T> is required to replicate React implementation */
		interface HTMLAttributes<T> {
			popover?: React.HTMLAttributes<HTMLElement>["popover"];
			popovertarget?: string;
			"data-validation"?: "form";
			"data-color"?:
				| "main"
				| "neutral"
				| "success"
				| "danger"
				| "info"
				| "warning"
				| "inverted";
			"data-size"?: "sm" | "md" | "lg" | (string & {});
			"data-tooltip"?: string;
			popovertargetaction?: string;
		}
		interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
			command?: string;
			commandfor?: string;
			commandFor?: string;
		}
	}
	namespace React.JSX {
		interface IntrinsicAttributes {
			popover?: React.HTMLAttributes<HTMLElement>["popover"];
			popovertarget?: string;
			popovertargetaction?: string;
		}
	}
}
