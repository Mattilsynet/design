import type * as UTabs from "@u-elements/u-tabs";
import { forwardRef } from "react";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type TabsProps = UTabs.ReactUtabs;
const TabsComp = forwardRef<UTabs.UHTMLTabsElement, TabsProps>(
	function Tabs(props, ref) {
		return <u-tabs ref={ref} {...toCustomElementProps(props, styles.tabs)} />;
	},
);

export type TabsListProps = UTabs.ReactUtablist;
const TabsList = forwardRef<UTabs.UHTMLTabListElement, TabsListProps>(
	function TabsList(props, ref) {
		return <u-tablist ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type TabsPanelProps = UTabs.ReactUtabpanel;
const TabsPanel = forwardRef<UTabs.UHTMLTabPanelElement, TabsPanelProps>(
	function TabsPanel(props, ref) {
		return <u-tabpanel ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type TabsTabProps = UTabs.ReactUtab;
const TabsTab = forwardRef<UTabs.UHTMLTabElement, TabsTabProps>(
	function TabsTab(props, ref) {
		return <u-tab ref={ref} {...toCustomElementProps(props)} />;
	},
);

export const Tabs = Object.assign(TabsComp, {
	List: TabsList,
	Panel: TabsPanel,
	Tab: TabsTab,
});
