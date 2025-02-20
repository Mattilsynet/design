import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";
import "@u-elements/u-tabs";
import type * as UTabs from "@u-elements/u-tabs";

export type TabsProps = UTabs.ReactUtabs;
const TabsComp = forwardRef<UTabs.UHTMLTabsElement, TabsProps>(function Tabs(
	{ className, ...rest },
	ref,
) {
	return <u-tabs class={clsx(styles.tabs, className)} ref={ref} {...rest} />;
});

export type TabsListProps = UTabs.ReactUtablist;
const List = forwardRef<UTabs.UHTMLTabListElement, TabsListProps>(
	function TabList({ className, ...rest }, ref) {
		return <u-tablist class={className} ref={ref} {...rest} />;
	},
);

export type TabsPanelProps = UTabs.ReactUtabpanel;
const Panel = forwardRef<UTabs.UHTMLTabPanelElement, TabsPanelProps>(
	function TabPanel({ className, ...rest }, ref) {
		return <u-tabpanel class={className} ref={ref} {...rest} />;
	},
);

export type TabsTabProps = UTabs.ReactUtab;
const Tab = forwardRef<UTabs.UHTMLTabElement, TabsTabProps>(function Tab(
	{ className, ...rest },
	ref,
) {
	return <u-tab class={className} ref={ref} {...rest} />;
});

export const Tabs = Object.assign(TabsComp, { List, Panel, Tab });
