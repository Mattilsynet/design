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

// Make React support popover attributes
// https://github.com/facebook/react/issues/27479
type Popover = "" | "auto" | "manual" | undefined;
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      "data-color"?: "main" | "neutral" | "success" | "danger" | "info" | "warning";
      "data-size"?: "sm" | "md" | "lg" | (string & {});
      "data-tooltip"?: string;
      popovertargetaction?: string;
			popovertarget?: string;
			popover?: Popover;
    }
  }
	namespace React.JSX {
		interface IntrinsicAttributes {
			popovertargetaction?: string;
			popovertarget?: string;
			popover?: Popover;
		}
	}
}