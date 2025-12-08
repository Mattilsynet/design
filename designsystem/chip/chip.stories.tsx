import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Button,
	Chip,
	Fieldset,
	Flex,
	Input,
	Prose,
	Validation,
} from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Chip",
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

export const React: Story = {
	render: () => (
		<>
			<Fieldset aria-label="Velg språk">
				<Flex>
					<Chip>
						<Input
							type="radio"
							value="nynorsk"
							defaultChecked
							name="my-radio"
						/>
						Nynorsk
					</Chip>
					<Chip>
						<Input type="radio" value="bokmål" name="my-radio" />
						Bokmål
					</Chip>
				</Flex>
			</Fieldset>
			<Chip data-removable>Bokmål</Chip>
			<Fieldset aria-label="Filtering">
				<Flex>
					<Chip>
						<Input type="checkbox" value="filter-1" name="my-check" />
						Filter 1
					</Chip>
					<Chip>
						<Input type="checkbox" value="filter-1" name="my-check" />
						Filter 2
					</Chip>
				</Flex>
			</Fieldset>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<fieldset className={styles.fieldset} aria-label="Size">
			<div className={styles.flex} data-align="center">
				<label className={styles.chip} data-size="sm">
					<input
						className={styles.input}
						type="radio"
						value="sm"
						defaultChecked
						name="my-size"
					/>
					Small
				</label>
				<label className={styles.chip} data-size="md">
					<input
						className={styles.input}
						type="radio"
						value="md"
						defaultChecked
						name="my-size"
					/>
					Medium
				</label>
				<label className={styles.chip} data-size="lg">
					<input
						className={styles.input}
						type="radio"
						value="lg"
						defaultChecked
						name="my-size"
					/>
					Large
				</label>
			</div>
		</fieldset>
	),
};

export const Radio: Story = {
	render: () => (
		<fieldset className={styles.fieldset} aria-label="Velg språk">
			<div className={styles.flex}>
				<label className={styles.chip}>
					<input
						className={styles.input}
						type="radio"
						value="nynorsk"
						defaultChecked
						name="my-radio"
					/>
					Nynorsk
				</label>
				<label className={styles.chip}>
					<input
						className={styles.input}
						type="radio"
						value="bokmål"
						name="my-radio"
					/>
					Bokmål
				</label>
			</div>
		</fieldset>
	),
};

export const Checkbox: Story = {
	render: () => (
		<fieldset className={styles.fieldset} aria-label="Velg språk">
			<div className={styles.flex}>
				<label className={styles.chip}>
					<input
						className={styles.input}
						type="checkbox"
						value="nynorsk"
						defaultChecked
						name="my-checkbox"
					/>
					Nynorsk
				</label>
				<label className={styles.chip}>
					<input
						className={styles.input}
						type="checkbox"
						value="bokmål"
						name="my-checkbox"
					/>
					Bokmål
				</label>
			</div>
		</fieldset>
	),
};

export const Removable: Story = {
	render: () => (
		<button type="button" className={styles.chip} data-removable>
			Nynorsk
		</button>
	),
};

export const Nowrap: Story = {
	render: () => (
		<div className={styles.grid} data-items="auto" style={{ width: 250 }}>
			<div>
				<p>Med nowrap:</p>
				<button type="button" className={styles.chip} data-removable>
					<span data-nowrap>Mine favoritter</span>
				</button>
			</div>
			<div>
				<p>Uten nowrap:</p>
				<button type="button" className={styles.chip} data-removable>
					Mine favoritter
				</button>
			</div>
		</div>
	),
};

export const WithValidationForm: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<Prose as="form" action="#" data-validation="form">
			<Fieldset>
				<Fieldset.Legend>Hvilke foretrekker du?</Fieldset.Legend>
				<Flex>
					<Chip>
						<Input type="radio" name="my-radio-validation" required />
						Radio 1
					</Chip>
					<Chip>
						<Input type="radio" name="my-radio-validation" required />
						Radio 2
					</Chip>
				</Flex>
				<Validation hidden>Feilmelding</Validation>
			</Fieldset>
			<Button type="submit" data-variant="primary">
				Send inn
			</Button>
		</Prose>
	),
};
