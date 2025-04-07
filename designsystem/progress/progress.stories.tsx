import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../react";
import styles from "../styles.module.css";
import "../index";

const meta = {
	title: "Designsystem/Progress",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<label>
				Fremdrift
				<u-progress class={styles.progress} value="33" max="100"></u-progress>
			</label>
			<label>
				Ubestemt
				<u-progress class={styles.progress}></u-progress>
			</label>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className={styles.grid}>
			<label>
				Small
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-size="sm"
				></u-progress>
			</label>
			<label>
				Medium
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-size="md"
				></u-progress>
			</label>
			<label>
				Large
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-size="lg"
				></u-progress>
			</label>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className={styles.grid}>
			<label>
				Main
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-color="main"
				></u-progress>
			</label>
			<label>
				Neutral
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-color="neutral"
				></u-progress>
			</label>
			<label>
				Success
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-color="success"
				></u-progress>
			</label>
			<label>
				Info
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-color="info"
				></u-progress>
			</label>
			<label>
				Warning
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-color="warning"
				></u-progress>
			</label>
			<label>
				Danger
				<u-progress
					class={styles.progress}
					value="33"
					max="100"
					data-color="danger"
				></u-progress>
			</label>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<>
			<label>
				Fremdrift
				<Progress value="33" max="100" />
			</label>
			<label>
				Ubestemt
				<Progress />
			</label>
		</>
	),
};

export const WithoutVisibleLabel: Story = {
	render: () => (
		<u-progress
			aria-label="Fremdrift"
			class={styles.progress}
			value="33"
			max="100"
		></u-progress>
	),
};
