import clsx from "clsx";
import { type JSX, forwardRef } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type AppHeaderProps = React.ComponentPropsWithoutRef<"header">;
export type AppNavProps = React.ComponentPropsWithoutRef<"nav">;
export type AppStickyProps = React.ComponentPropsWithoutRef<"div">;
export type AppMainProps = React.ComponentPropsWithoutRef<"main">;
export type AppAsideProps = React.ComponentPropsWithoutRef<"aside">;
export type AppFooterProps = React.ComponentPropsWithoutRef<"footer">;
export type AppProps<As extends React.ElementType = "div"> =
	PolymorphicComponentPropWithRef<As>;

type AppComponent = <As extends React.ElementType = "div">(
	props: AppProps<As>,
) => JSX.Element;

const AppComp = forwardRef<null>(function App<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: AppProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.app, className)} ref={ref} {...rest} />;
}) as AppComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

const AppSticky = forwardRef<null>(function App<
	As extends React.ElementType = "div",
>({ as, className, ...rest }: AppProps<As>, ref?: PolymorphicRef<As>) {
	const Tag = as || "div";

	return <Tag className={clsx(styles.sticky, className)} ref={ref} {...rest} />;
}) as AppComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element

export const App = Object.assign(AppComp, {
	Header: forwardRef<HTMLElement, AppHeaderProps>(
		function AppHeader(rest, ref) {
			return <header ref={ref} {...rest} />;
		},
	),
	Nav: forwardRef<HTMLElement, AppNavProps>(function AppNav(rest, ref) {
		return <nav ref={ref} {...rest} />;
	}),
	Sticky: AppSticky,
	Main: forwardRef<HTMLElement, AppMainProps>(function AppMain(rest, ref) {
		return <main ref={ref} {...rest} />;
	}),
	Aside: forwardRef<HTMLElement, AppAsideProps>(function AppAside(rest, ref) {
		return <aside ref={ref} {...rest} />;
	}),
	Footer: forwardRef<HTMLElement, AppFooterProps>(
		function AppFooter(rest, ref) {
			return <footer ref={ref} {...rest} />;
		},
	),
});
