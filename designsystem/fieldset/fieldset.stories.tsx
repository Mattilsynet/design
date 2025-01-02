import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Fieldset",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radios: Story = {
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hva foretrekker du?</legend>
			<p>Fellesbeskrivelse</p>
			<div className={styles.field}>
				<input
					type="radio"
					className={styles.input}
					name="my-radio"
					defaultChecked
				/>
				<label>Alternativ 1</label>
				<p>Beskrivelse</p>
			</div>
			<div className={styles.field}>
				<input type="radio" className={styles.input} name="my-radio" />
				<label>Alternativ 2</label>
				<p>Beskrivelse</p>
			</div>
		</fieldset>
	),
};

export const Checkboxes: Story = {
	render: () => (
		<>
			<fieldset className={styles.fieldset}>
				<legend>Hvilke foretrekker du?</legend>
				<p>Fellesbeskrivelse</p>
				<div className={styles.field}>
					<input
						type="checkbox"
						className={styles.input}
						name="my-check"
						defaultChecked
					/>
					<label>Alternativ 1</label>
				</div>
				<div className={styles.field}>
					<input type="checkbox" className={styles.input} name="my-check" />
					<label>Alternativ 2</label>
				</div>
			</fieldset>
		</>
	),
};
