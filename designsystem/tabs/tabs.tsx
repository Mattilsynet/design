import type * as UTabs from "@u-elements/u-tabs"; // TMP Using u-tabs while waiting for https://github.com/digdir/designsystemet/pull/4821
import { forwardRef } from "react";
import type { CustomReactElementProps } from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type TabsProps = CustomReactElementProps<UTabs.UHTMLTabsElement>;
const TabsComp = forwardRef<UTabs.UHTMLTabsElement, TabsProps>(
	function Tabs(props, ref) {
		return <u-tabs ref={ref} {...toCustomElementProps(props, styles.tabs)} />;
	},
);

export type TabsListProps = CustomReactElementProps<UTabs.UHTMLTabListElement>;
const TabsList = forwardRef<UTabs.UHTMLTabListElement, TabsListProps>(
	function TabsList(props, ref) {
		return <u-tablist ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type TabsPanelProps =
	CustomReactElementProps<UTabs.UHTMLTabPanelElement>;
const TabsPanel = forwardRef<UTabs.UHTMLTabPanelElement, TabsPanelProps>(
	function TabsPanel(props, ref) {
		return <u-tabpanel ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type TabsTabProps = CustomReactElementProps<UTabs.UHTMLTabElement>;
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
