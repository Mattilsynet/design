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
		<ds-tabs class={styles.tabs}>
			<ds-tablist>
				<ds-tab aria-selected="true">Tab 1</ds-tab>
				<ds-tab>Tab 2</ds-tab>
				<ds-tab>
					<PencilSimpleIcon />
					Tab 3
				</ds-tab>
				<ds-tab>Tab with very long content</ds-tab>
				<ds-tab>Tab with very long content</ds-tab>
				<ds-tab>Tab with very long content</ds-tab>
			</ds-tablist>
			<ds-tabpanel>
				Panel 1 with <a href="#none">link</a>
			</ds-tabpanel>
			<ds-tabpanel>
				Panel 2 with <a href="#none">link</a>
			</ds-tabpanel>
			<ds-tabpanel>
				Panel 3 with <a href="#none">link</a>
			</ds-tabpanel>
		</ds-tabs>
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
		<ds-tabs class={styles.tabs} data-size="sm">
			<ds-tablist>
				<ds-tab aria-selected="true">Tab 1</ds-tab>
				<ds-tab>Tab 2</ds-tab>
				<ds-tab>Tab 3</ds-tab>
			</ds-tablist>
			<ds-tabpanel>
				Panel 1 with <a href="#none">link</a>
			</ds-tabpanel>
			<ds-tabpanel>
				Panel 2 with <a href="#none">link</a>
			</ds-tabpanel>
			<ds-tabpanel>
				Panel 3 with <a href="#none">link</a>
			</ds-tabpanel>
		</ds-tabs>
	),
};

export const WithReusePanel: Story = {
	decorators,
	render: () => (
		<ds-tabs class={styles.tabs}>
			<ds-tablist>
				<ds-tab aria-controls="my-panel" aria-selected="true">
					Tab 1
				</ds-tab>
				<ds-tab aria-controls="my-panel">Tab 2</ds-tab>
				<ds-tab aria-controls="my-panel">Tab 3</ds-tab>
			</ds-tablist>
			<ds-tabpanel id="my-panel" className={styles.card}>
				My panel is used for all tabs!
			</ds-tabpanel>
		</ds-tabs>
	),
};

export const WithCardPanels: Story = {
	decorators,
	render: () => (
		<ds-tabs class={styles.tabs}>
			<ds-tablist>
				<ds-tab aria-selected="true">Tab 1</ds-tab>
				<ds-tab>Tab 2</ds-tab>
				<ds-tab>Tab 3</ds-tab>
			</ds-tablist>
			<ds-tabpanel className={styles.card}>
				Panel 1 with <a href="#none">link</a>
			</ds-tabpanel>
			<ds-tabpanel className={styles.card}>
				Panel 2 with <a href="#none">link</a>
			</ds-tabpanel>
			<ds-tabpanel className={styles.card}>
				Panel 3 with <a href="#none">link</a>
			</ds-tabpanel>
		</ds-tabs>
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
