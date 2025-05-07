import type { Meta, StoryObj } from "@storybook/react";
import { Ingress, Muted } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Text",
	decorators: [
		(Story) => (
			<div className={styles.grid}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<p>Text default</p>
			<p>
				<small>Text muted</small>
			</p>
			<p>
				<span className={styles.ingress}>Text ingress</span>
			</p>
		</>
	),
};

export const IngressStory: Story = {
	name: "Ingress",
	render: () => <span className={styles.ingress}>Text ingress</span>,
};
export const MutedStory: Story = {
	name: "Muted",
	render: () => <small>Text muted</small>,
};

export const React: Story = {
	render: () => (
		<>
			<p>Text default</p>
			<p>
				<Muted>Muted</Muted>
			</p>
			<p>
				<Ingress>Ingress</Ingress>
			</p>
		</>
	),
};
