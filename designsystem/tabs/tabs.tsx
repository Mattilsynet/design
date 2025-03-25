import type * as UTabs from "@u-elements/u-tabs";
import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type TabsProps = UTabs.ReactUtabs;
const TabsComp = forwardRef<UTabs.UHTMLTabsElement, TabsProps>(function Tabs(
	{ className, ...rest },
	ref,
) {
	return <u-tabs class={clsx(styles.tabs, className)} ref={ref} {...rest} />;
});

export type TabsListProps = UTabs.ReactUtablist;
const TabsList = forwardRef<UTabs.UHTMLTabListElement, TabsListProps>(
	function TabsList({ className, ...rest }, ref) {
		return <u-tablist class={className} ref={ref} {...rest} />;
	},
);

export type TabsPanelProps = UTabs.ReactUtabpanel;
const TabsPanel = forwardRef<UTabs.UHTMLTabPanelElement, TabsPanelProps>(
	function TabsPanel({ className, ...rest }, ref) {
		return <u-tabpanel class={className} ref={ref} {...rest} />;
	},
);

export type TabsTabProps = UTabs.ReactUtab;
const TabsTab = forwardRef<UTabs.UHTMLTabElement, TabsTabProps>(
	function TabsTab({ className, ...rest }, ref) {
		return <u-tab class={className} ref={ref} {...rest} />;
	},
);

export const Tabs = Object.assign(TabsComp, {
	List: TabsList,
	Panel: TabsPanel,
	Tab: TabsTab,
});
