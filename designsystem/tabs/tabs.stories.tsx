import { PencilSimpleIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, Tabs } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Tabs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={`${styles.body} ${styles.grid}`} style={{ padding: "2em" }}>
			<style>
				{
					"body:not(:has(.sbdocs-content)) { background: var(--ds-color-background-default) }"
				}
			</style>
			<Story />
		</div>
	),
];

export const Default: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<u-tabs class={styles.tabs}>
			<u-tablist>
				<u-tab role="tab" aria-selected="true">
					Tab 1
				</u-tab>
				<u-tab>Tab 2</u-tab>
				<u-tab>
					<PencilSimpleIcon />
					Tab 3
				</u-tab>
				<u-tab>Tab with very long content</u-tab>
				<u-tab>Tab with very long content</u-tab>
				<u-tab>Tab with very long content</u-tab>
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
				<u-tab role="tab" aria-selected="true">
					Tab 1
				</u-tab>
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

export const WithCardPanels: Story = {
	decorators,
	render: () => (
		<u-tabs class={styles.tabs}>
			<u-tablist>
				<u-tab role="tab" aria-selected="true">
					Tab 1
				</u-tab>
				<u-tab>Tab 2</u-tab>
				<u-tab>Tab 3</u-tab>
			</u-tablist>
			<u-tabpanel className={styles.card}>
				Panel 1 with <a href="#none">link</a>
			</u-tabpanel>
			<u-tabpanel className={styles.card}>
				Panel 2 with <a href="#none">link</a>
			</u-tabpanel>
			<u-tabpanel className={styles.card}>
				Panel 3 with <a href="#none">link</a>
			</u-tabpanel>
		</u-tabs>
	),
};

export const ReactWithCardPanels: Story = {
	decorators,
	render: () => (
		<Tabs>
			<Tabs.List>
				<Tabs.Tab aria-selected="true">Tab 1</Tabs.Tab>
				<Tabs.Tab>Tab 2</Tabs.Tab>
				<Tabs.Tab>Tab 3</Tabs.Tab>
			</Tabs.List>
			<Card as={Tabs.Panel}>
				Panel 1 with <a href="#none">link</a>
			</Card>
			<Card as={Tabs.Panel}>
				Panel 2 with <a href="#none">link</a>
			</Card>
			<Card as={Tabs.Panel}>
				Panel 3 with <a href="#none">link</a>
			</Card>
		</Tabs>
	),
};
