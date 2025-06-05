import { EnvelopeIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Badge",
	decorators: [
		(Story) => (
			<div className={styles.flex}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <span className={styles.badge} data-badge="2"></span>,
};

export const React: Story = {
	render: () => (
		<>
			<Badge data-badge="2"></Badge>
			<Badge>
				<EnvelopeIcon />
			</Badge>
		</>
	),
};

export const Color: Story = {
	render: () => (
		<>
			<span className={styles.badge} data-badge="2"></span>
			<span className={styles.badge} data-badge="2" data-color="danger"></span>
		</>
	),
};

export const InElement: Story = {
	render: () => (
		<div>
			<h2>
				Under behandling <span className={styles.badge} data-badge="9"></span>
			</h2>
			<button type="button" className={styles.button} data-variant="secondary">
				<EnvelopeIcon />
				E-post <span className={styles.badge} data-badge="99+"></span>
			</button>
		</div>
	),
};

export const WithPosition: Story = {
	render: () => (
		<>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge}>
					<EnvelopeIcon />
				</span>
			</button>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-badge="2">
					<EnvelopeIcon />
				</span>
			</button>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-color="danger">
					<EnvelopeIcon />
				</span>
			</button>
			<button type="button" className={styles.button}>
				E-post{" "}
				<span className={styles.badge} data-badge="2" data-color="danger">
					<EnvelopeIcon />
				</span>
			</button>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className={styles.prose}>
			<button type="button" className={styles.button} data-size="sm">
				E-post{" "}
				<span className={styles.badge} data-badge="2">
					<EnvelopeIcon />
				</span>
			</button>
			<button type="button" className={styles.button} data-size="md">
				E-post{" "}
				<span className={styles.badge} data-badge="2">
					<EnvelopeIcon />
				</span>
			</button>
			<button type="button" className={styles.button} data-size="lg">
				E-post{" "}
				<span className={styles.badge} data-badge="2">
					<EnvelopeIcon />
				</span>
			</button>
		</div>
	),
};
