import type { Meta, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Field",
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
		<div className={styles.field}>
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
			<input type="text" className={styles.input} />
		</div>
	),
};

export const Required: Story = {
	render: () => (
		<div className={styles.field}>
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
			<input type="text" required className={styles.input} />
		</div>
	),
};

export const Toggles: Story = {
	render: () => (
		<>
			<div className={styles.field}>
				<label>Radio 1</label>
				<input
					type="radio"
					className={styles.input}
					name="my-radio"
					defaultChecked
				/>
			</div>
			<div className={styles.field}>
				<label>Radio 2</label>
				<p>Beskrivelse</p>
				<input type="radio" className={styles.input} name="my-radio" />
			</div>
			<div className={styles.field}>
				<label>Check</label>
				<input type="checkbox" className={styles.input} />
			</div>
			<div className={styles.field}>
				<label>Switch</label>
				<input type="checkbox" className={styles.input} role="switch" />
			</div>
		</>
	),
};

export const WithValidation: Story = {
	render: () => (
		<>
			<div className={styles.field}>
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<input type="text" className={styles.input} />
				<div className={styles.validation}>Validation</div>
			</div>
		</>
	),
};

export const WithAffixes: Story = {
	render: () => (
		<>
			<div className={styles.field}>
				<label>Pris i NOK per måned</label>
				<div className={styles.affixes}>
					<span>NOK</span>
					<input type="text" className={styles.input} />
					<span>pr. mnd.</span>
				</div>
			</div>
		</>
	),
};

export const WithCharacterCount: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<>
			<div className={styles.field}>
				<label>Ledetekst</label>
				<textarea className={styles.input} defaultValue="Noe innhold" />
				<p data-count="20" />
			</div>
		</>
	),
};
