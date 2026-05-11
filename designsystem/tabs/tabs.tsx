import type * as DS from "@digdir/designsystemet-web";
import { forwardRef } from "react";
import type { CustomReactElementProps } from "../react-types";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type TabsProps = CustomReactElementProps<DS.DSTabsElement>;
const TabsComp = forwardRef<DS.DSTabsElement, TabsProps>(
	function Tabs(props, ref) {
		return <ds-tabs ref={ref} {...toCustomElementProps(props, styles.tabs)} />;
	},
);

export type TabsListProps = CustomReactElementProps<DS.DSTabListElement>;
const TabsList = forwardRef<DS.DSTabListElement, TabsListProps>(
	function TabsList(props, ref) {
		return <ds-tablist ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type TabsPanelProps = CustomReactElementProps<DS.DSTabPanelElement>;
const TabsPanel = forwardRef<DS.DSTabPanelElement, TabsPanelProps>(
	function TabsPanel(props, ref) {
		return <ds-tabpanel ref={ref} {...toCustomElementProps(props)} />;
	},
);

export type TabsTabProps = CustomReactElementProps<DS.DSTabElement>;
const TabsTab = forwardRef<DS.DSTabElement, TabsTabProps>(
	function TabsTab(props, ref) {
		return <ds-tab ref={ref} {...toCustomElementProps(props)} />;
	},
);

export const Tabs = Object.assign(TabsComp, {
	List: TabsList,
	Panel: TabsPanel,
	Tab: TabsTab,
});
