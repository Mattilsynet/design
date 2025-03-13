import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Spinner",
	decorators: [
		(Story) => (
			<div
				className={styles.grid}
				data-align="center"
				data-items="100"
				style={{ width: "max-content", minWidth: 250 }}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <span className={styles.spinner}></span>,
};

export const React: Story = {
	render: () => <Spinner />,
};

export const Sizes: Story = {
	render: () => (
		<>
			xs: <span className={styles.spinner} data-size="xs"></span>
			sm: <span className={styles.spinner} data-size="sm"></span>
			md: <span className={styles.spinner} data-size="md"></span>
			lg: <span className={styles.spinner} data-size="lg"></span>
		</>
	),
};

export const Text: Story = {
	render: () => (
		<>
			<span className={styles.spinner}>Henter innhold...</span>
		</>
	),
};
