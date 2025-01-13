import { Envelope } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Badge",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.flex}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => <span className={styles.badge} data-badge="2"></span>,
};

export const Color: Story = {
	decorators,
	render: () => (
		<>
			<span className={styles.badge} data-badge="2"></span>
			<span className={styles.badge} data-badge="2" data-color="danger"></span>
		</>
	),
};

export const InElement: Story = {
	decorators,
	render: () => (
		<div>
			<h2>
				Under behandling <span className={styles.badge} data-badge="9"></span>
			</h2>
			<button type="button" className={styles.button} data-variant="secondary">
				<Envelope />
				E-post <span className={styles.badge} data-badge="99+"></span>
			</button>
		</div>
	),
};

export const WithPosition: Story = {
	decorators,
	render: () => (
		<>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-badge="">
					<Envelope />
				</span>
			</button>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-badge="2">
					<Envelope />
				</span>
			</button>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-color="danger">
					<Envelope />
				</span>
			</button>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-badge="2" data-color="danger">
					<Envelope />
				</span>
			</button>
		</>
	),
};
