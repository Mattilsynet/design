import type { Meta, StoryFn, StoryObj } from "@storybook/react";

const meta = {
	title: "Designsystem/Field",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div style={{ display: "grid", gap: ".5rem" }}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<div className="styles.field">
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
			<input type="text" className="styles.input" />
		</div>
	),
};

export const Toggles: Story = {
	decorators,
	render: () => (
		<>
			<div className="styles.field">
				<label>Radio 1</label>
				<input type="radio" className="styles.input" name="my-radio" checked />
			</div>
			<div className="styles.field">
				<label>Radio 2</label>
				<p>Beskrivelse</p>
				<input type="radio" className="styles.input" name="my-radio" />
			</div>
			<div className="styles.field">
				<label>Check</label>
				<input type="checkbox" className="styles.input" />
			</div>
			<div className="styles.field">
				<label>Switch</label>
				<input type="checkbox" className="styles.input" role="switch" />
			</div>
		</>
	),
};

export const ValidationMessage: Story = {
	decorators,
	render: () => (
		<>
			<div className="styles.field">
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<input type="text" className="styles.input" />
				<div className="styles.validation">Validation</div>
			</div>
		</>
	),
};
