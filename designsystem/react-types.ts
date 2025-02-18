// Implementation of reusable polymorphic types
// Explaination: https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
type AsProp<As extends React.ElementType> = { as?: As };
type PropsToOmit<As extends React.ElementType, P> = keyof (AsProp<As> & P);
type PolymorphicComponentProp<
  As extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<As>> &
  Omit<React.ComponentPropsWithoutRef<As>, PropsToOmit<As, Props>>;

// This is a new type utitlity with ref
export type PolymorphicComponentPropWithRef<
  As extends React.ElementType,
  Props = object
> = PolymorphicComponentProp<As, Props> & { ref?: PolymorphicRef<As> };

// This is the type for the "ref" only
export type PolymorphicRef<As extends React.ElementType> =
  React.ComponentPropsWithRef<As>['ref'];
