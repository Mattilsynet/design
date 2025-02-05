import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Spinner",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div
			className={styles.grid}
			data-align="center"
			data-grid="fit-sm"
			style={{ width: "max-content", minWidth: 250 }}
		>
			<Story />
		</div>
	),
];

export const Default: Story = {
	render: () => <span className={styles.spinner}></span>,
};

export const Sizes: Story = {
	decorators,
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
	decorators,
	render: () => (
		<>
			<span className={styles.spinner}>Henter innhold...</span>
		</>
	),
};
