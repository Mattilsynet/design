import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Grid, Input, Validation } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Validation",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<p data-field="desciption">Beskrivelse</p>
			<input type="text" className={styles.input} />
			<div className={styles.validation} data-field="validation">
				Feilmelding
			</div>
		</ds-field>
	),
};

export const React: Story = {
	render: () => (
		<Field>
			<Field.Label>Ledetekst</Field.Label>
			<Field.Description>Beskrivelse</Field.Description>
			<Input />
			<Validation>Feilmelding</Validation>
		</Field>
	),
};

export const Colors: Story = {
	render: () => (
		<Grid>
			<Validation data-color="danger">Feilmelding</Validation>
			<Validation data-color="success">Suksess</Validation>
			<Validation data-color="info">Informasjon</Validation>
			<Validation data-color="warning">Advarsel</Validation>
		</Grid>
	),
};
