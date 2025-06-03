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
		<div className={styles.field}>
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
			<input type="text" className={styles.input} />
			<div className={styles.validation}>Feilmelding</div>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<Field>
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
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
