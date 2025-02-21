import type { Meta, StoryObj } from "@storybook/react";
import { Field, Fieldset, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Fieldset",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {
	render: () => (
		<Fieldset>
			<legend>Hva foretrekker du?</legend>
			<p>Fellesbeskrivelse</p>
			<Field
				as="input"
				type="radio"
				label="Alternativ 1"
				description="Beskrivelse"
				required
				defaultChecked
			/>
			<Field as="input" type="radio" label="Alternativ 2" required />
		</Fieldset>
	),
};

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
					required
					defaultChecked
				/>
				<label>Alternativ 1</label>
				<p>Beskrivelse</p>
			</div>
			<div className={styles.field}>
				<input type="radio" className={styles.input} name="my-radio" required />
				<label>Alternativ 2</label>
				<p>Beskrivelse</p>
			</div>
		</fieldset>
	),
};

export const Checkboxes: Story = {
	render: () => (
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
	),
};

export const Disabled: Story = {
	render: () => (
		<fieldset className={styles.fieldset} disabled>
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
	),
};

export const ReadOnly: Story = {
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hvilke foretrekker du?</legend>
			<p>Fellesbeskrivelse</p>
			<div className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					defaultChecked
					readOnly
					disabled
				/>
				<label>Alternativ 1</label>
			</div>
			<div className={styles.field}>
				<input
					type="checkbox"
					className={styles.input}
					name="my-check"
					readOnly
					disabled
				/>
				<label>Alternativ 2</label>
			</div>
		</fieldset>
	),
};

export const Horizontal: Story = {
	render: () => (
		<fieldset className={styles.fieldset}>
			<legend>Hvilke foretrekker du?</legend>
			<p>Fellesbeskrivelse</p>
			<div className={styles.flex} data-gap="md">
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
			</div>
		</fieldset>
	),
};

export const WithValidation: Story = {
	render: () => (
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
			<div className={styles.validation}>Feilmelding</div>
		</fieldset>
	),
};
