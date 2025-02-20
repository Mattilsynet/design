import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../react";
import styles from "../styles.module.css";
import "@u-elements/u-tabs";

const meta = {
	title: "Designsystem/Tabs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<u-tabs class={styles.tabs}>
			<u-tablist>
				<u-tab aria-selected="true">Tab 1</u-tab>
				<u-tab>Tab 2</u-tab>
				<u-tab>Tab 3</u-tab>
			</u-tablist>
			<u-tabpanel>
				Panel 1 with <a href="#none">link</a>
			</u-tabpanel>
			<u-tabpanel>
				Panel 2 with <a href="#none">link</a>
			</u-tabpanel>
			<u-tabpanel>
				Panel 3 with <a href="#none">link</a>
			</u-tabpanel>
		</u-tabs>
	),
};

export const React: Story = {
	render: () => (
		<Tabs>
			<Tabs.List>
				<Tabs.Tab aria-selected="true">Tab 1</Tabs.Tab>
				<Tabs.Tab>Tab 2</Tabs.Tab>
				<Tabs.Tab>Tab 3</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel>
				Panel 1 with <a href="#none">link</a>
			</Tabs.Panel>
			<Tabs.Panel>
				Panel 2 with <a href="#none">link</a>
			</Tabs.Panel>
			<Tabs.Panel>
				Panel 3 with <a href="#none">link</a>
			</Tabs.Panel>
		</Tabs>
	),
};

export const Sizes: Story = {
	render: () => (
		<u-tabs class={styles.tabs} data-size="sm">
			<u-tablist>
				<u-tab aria-selected="true">Tab 1</u-tab>
				<u-tab>Tab 2</u-tab>
				<u-tab>Tab 3</u-tab>
			</u-tablist>
			<u-tabpanel>
				Panel 1 with <a href="#none">link</a>
			</u-tabpanel>
			<u-tabpanel>
				Panel 2 with <a href="#none">link</a>
			</u-tabpanel>
			<u-tabpanel>
				Panel 3 with <a href="#none">link</a>
			</u-tabpanel>
		</u-tabs>
	),
};
