import { PintGlassIcon, WindIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import type { UHTMLComboboxElement } from "../";
import type { FieldComboboxSelected } from "../react";
import { Field, Flex, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Field",
	argTypes: {
		as: {
			description: "Element type `input | textarea | select`",
			table: {
				defaultValue: { summary: "input" },
				type: { summary: undefined },
			},
		},
		type: {
			description: "Input type `text | checkbox | radio | ...`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		label: {
			description: "Label text `React.ReactNode`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		description: {
			description: "Description text `React.ReactNode`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		value: {
			description: "Value `string`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		checked: {
			description: 'If `type="checkbox"` or `type="radio"`: `boolean`',
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		validation: {
			description: "Validation message `React.ReactNode`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		count: {
			description: "Character count `number`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		options: {
			description:
				'If `as="select"` or `as={Field.Combobox}`: `string[] | { label: string; value: string; children?: React.ReactNode }[]`',
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		prefix: {
			description: "Prefix `string`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		suffix: {
			description: "Suffix `string`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		helpText: {
			description: "What to display in HelpText `React.ReactNode`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		helpTextLabel: {
			description: "Label of HelpText button `string`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		"data-nofilter": {
			description: "If `as={Field.Combobox}`: `boolean`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		selected: {
			description:
				"If `as={Field.Combobox}`: `{ label: string; value: string; children?: React.ReactNode }[]`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		onSelectedChange: {
			description: "If `as={Field.Combobox}`:<br> `(selected) => void`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
	},
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

export const React: Story = {
	render: () => (
		<>
			<h2>
				Field uten <code>as</code> attributt lar deg bygge opp av bestanddeler:
			</h2>
			<Field>
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<Input className={styles.input} />
			</Field>
			<br />
			<h2>
				Field med <code>as="input"</code> gir deg en komplett field med
				<small></small>
				<br />
				<code>label</code> + <code>description</code> + <code>input</code> +{" "}
				<code>error</code> + <code>prefix</code> + <code>suffix</code>:
			</h2>
			<Field
				as="input"
				label="Ledetekst"
				helpText="Hjelpetekst"
				helpTextLabel="Vis hjelpetekst"
				description="Beskrivelse"
				error="Feilmelding"
				prefix="Før"
				suffix="Etter"
			/>
			<br />
			<h2>
				Field med <code>as="input"</code> og <code>type="checkbox"</code>:
			</h2>
			<Field as="input" type="checkbox" label="Ledetekst" />
			<br />
			<h2>
				Field med <code>as="textarea"</code> og{" "}
				<code>count=&#x7B;15&#x7D;</code>:
			</h2>
			<Field
				as="textarea"
				label="Ledetekst"
				description="Beskrivelse"
				count={15}
			/>
			<br />
			<h2>
				Field med <code>as="select"</code>:
			</h2>
			<Field as="select" label="Ledetekst" options={["Option 1", "Option 2"]} />
		</>
	),
};

export const Required: Story = {
	parameters: { showInOverview: true },
	render: () => (
		<div className={styles.field}>
			<label>Ledetekst</label>
			<p>Beskrivelse</p>
			<input type="text" required className={styles.input} />
		</div>
	),
};

export const Indeterminate: Story = {
	render: function Render() {
		const [checked, setChecked] = useState(["1", "2"]);
		const all = ["1", "2", "3"];
		const isAll = checked.length === all.length;

		const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
			setChecked(
				checked.includes(target.value)
					? checked.filter((v) => v !== target.value)
					: [...checked, target.value],
			);

		return (
			<fieldset className={styles.fieldset}>
				<legend>Velg alternativer</legend>
				<div className={styles.field}>
					<label>Velg alle</label>
					<input
						type="checkbox"
						className={styles.input}
						checked={isAll}
						onChange={() => setChecked(isAll ? [] : all)}
						ref={(el) => {
							if (el) el.indeterminate = !isAll && !!checked.length;
						}}
					/>
				</div>
				<hr className={styles.divider} data-gap="2" />
				{all.map((value) => (
					<div className={styles.field} key={value}>
						<label>Alternativ 1</label>
						<input
							checked={checked.includes(value)}
							className={styles.input}
							onChange={onChange}
							type="checkbox"
							value={value}
						/>
					</div>
				))}
			</fieldset>
		);
	},
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
	parameters: { showInOverview: true },
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

export const WithValidationForm: Story = {
	parameters: { layout: "padded" },
	name: "With Validation Form (eksperimentell)",
	render: () => (
		<form action="#" className={styles.prose}>
			<div className={styles.field} data-validation="form">
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<input type="email" className={styles.input} required />
				<div className={styles.validation} hidden>
					Må inneholde en gyldig e-postadresse
				</div>
			</div>
			<div className={styles.field} data-validation="form">
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<input type="text" className={styles.input} required />
				<div className={styles.validation} hidden>
					Må fylles ut
				</div>
			</div>
			<button type="submit" className={styles.button} data-variant="primary">
				Send inn
			</button>
		</form>
	),
};

export const WithAffixes: Story = {
	parameters: {
		showInOverview: true,
	},
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
		showInOverview: true,
	},
	render: () => (
		<>
			<div className={styles.field}>
				<label>Ledetekst</label>
				<p>Beskrivelse</p>
				<textarea className={styles.input} defaultValue="Noe innhold" />
				<p data-count="20" />
			</div>
		</>
	),
};

export const WithCustomDescriptionTag: Story = {
	parameters: { layout: "padded" },
	render: () => (
		<>
			<div className={styles.field}>
				<label>Ledetekst</label>
				<div data-description className={styles.prose}>
					<p>
						Beskrivelse i en <code>data-description</code> som virker med og
						uten <code>&lt;p&gt;</code>
					</p>
				</div>
				<textarea className={styles.input} defaultValue="Noe innhold" />
				<p data-count="20" />
			</div>
		</>
	),
};

export const WithCombobox: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<div className={styles.field}>
			<label>Med forslag</label>
			<u-combobox>
				<input className={styles.input} />
				<del role="img" aria-label="Fjern tekst"></del>
				<u-datalist>
					<u-option value="Sogndal">Sogndal</u-option>
					<u-option value="Oslo">Oslo</u-option>
					<u-option value="Brønnøysund">Brønnøysund</u-option>
					<u-option value="Stavanger">Stavanger</u-option>
					<u-option value="Trondheim">Trondheim</u-option>
					<u-option value="Bergen">Bergen</u-option>
					<u-option value="Lillestrøm">Lillestrøm</u-option>
				</u-datalist>
			</u-combobox>
			<select name="form-data" hidden></select>
		</div>
	),
};

export const WithComboboxMultiple: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<div className={styles.field}>
			<label>Med forslag flervalg</label>
			<u-combobox data-multiple>
				<data value="Sogndal">Sogndal</data>
				<input className={styles.input} />
				<del role="img" aria-label="Fjern tekst"></del>
				<u-datalist>
					<u-option value="Sogndal">Sogndal</u-option>
					<u-option value="Oslo">Oslo</u-option>
					<u-option value="Brønnøysund">Brønnøysund</u-option>
					<u-option value="Stavanger">Stavanger</u-option>
					<u-option value="Trondheim">Trondheim</u-option>
					<u-option value="Bergen">Bergen</u-option>
					<u-option value="Lillestrøm">Lillestrøm</u-option>
				</u-datalist>
			</u-combobox>
		</div>
	),
};

export const WithComboboxAPI: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => {
		const [options, setOptions] = useState<string[] | string>("Name a country"); // Store results
		const timer = useRef<ReturnType<typeof setTimeout> | number>(0);

		const getCountries = async (value: string) => {
			if (!value) return setOptions("Name a country");
			const api = `https://restcountries.com/v2/name/${value}?fields=name`;
			const countries = await (await fetch(api)).json();

			setOptions(
				Array.isArray(countries)
					? countries.map(({ name }) => name)
					: "No results",
			);
		};

		const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = encodeURIComponent(event.target.value.trim());

			setOptions(value ? "Loading..." : "Name a country");
			clearTimeout(timer.current);
			timer.current = setTimeout(getCountries, 500, value); // Debounce API call
		};

		return (
			<div className={styles.field}>
				<label>Med henting av resultater fra API</label>
				<u-combobox>
					<input
						type="search"
						className={styles.input}
						onInput={handleInput} // Note: using onInput, not onChange
					/>
					<del role="img" aria-label="Fjern tekst"></del>
					<u-datalist data-nofilter>
						{Array.isArray(options) ? (
							options.map((option) => (
								<u-option key={option}>{option}</u-option>
							))
						) : (
							<u-option value="">{options}</u-option>
						)}
					</u-datalist>
				</u-combobox>
			</div>
		);
	},
};

export const WithComboboxCustomFilter: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => {
		const ref = useRef<UHTMLComboboxElement>(null);
		const [value, setValue] = useState("");
		const options = [
			"Sogndal",
			"Oslo",
			"Brønnøysund",
			"Stavanger",
			"Trondheim",
			"Bergen",
			"Lillestrøm",
		];

		return (
			<div className={styles.field}>
				<label>Eget filter - gir kun treff fra starten av ordet</label>
				<u-combobox ref={ref}>
					<input
						className={styles.input}
						onInput={({ currentTarget }) => setValue(currentTarget.value)}
					/>
					<del role="img" aria-label="Fjern tekst"></del>
					<u-datalist data-nofilter>
						{options
							.filter((option) =>
								option.toLowerCase().startsWith(value.toLowerCase()),
							)
							.map((option) => (
								<u-option key={option} value={option}>
									{option}
								</u-option>
							))}
					</u-datalist>
				</u-combobox>
			</div>
		);
	},
};

export const ReactWithCombobox: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		// IMPORTANT:
		// Using Field as={Field.Combobox} requires
		// "use client" if doing server-side rendering
		const [selected, setSelected] = useState<FieldComboboxSelected>([
			{ value: "saft", label: "Saft" },
		]);

		return (
			<Field
				as={Field.Combobox}
				label="React med forslag"
				description="Beskrivelse"
				selected={selected}
				onSelectedChange={setSelected}
				options={[
					{ value: "saft", label: "Saft" },
					{
						value: "suse",
						label: "Suse",
						children: (
							<Flex data-align="center">
								<WindIcon /> Suse
							</Flex>
						),
					},
				]}
			/>
		);
	},
};

export const ReactWithComboboxWithChildren: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		const multiple = true;
		const [selected, setSelected] = useState<FieldComboboxSelected>([]);
		const handleBeforeChange = (event: CustomEvent<HTMLDataElement>) => {
			const { isConnected: remove, textContent, value } = event.detail;
			const label = textContent?.trim() || "";

			if (remove) setSelected(selected.filter((i) => i.value !== value));
			else if (multiple) setSelected([...selected, { value, label }]);
			else setSelected([{ value, label }]);
		};
		return (
			<Field>
				<label>React med Field.Combobox med barn</label>
				<Field.Combobox
					data-multiple={multiple}
					onBeforeChange={handleBeforeChange}
				>
					{selected.map(({ value, label }) => (
						<data key={value} value={value}>
							{label}
						</data>
					))}
					<Input className={styles.input} />
					<del role="img" aria-label="Fjern tekst"></del>
					<Field.Datalist>
						<Field.Option value="saft" label="Saft">
							<Flex data-align="center">
								<PintGlassIcon /> Saft
							</Flex>
						</Field.Option>
						<Field.Option value="suse" label="Suse">
							<Flex data-align="center">
								<WindIcon /> Suse
							</Flex>
						</Field.Option>
					</Field.Datalist>
				</Field.Combobox>
			</Field>
		);
	},
};

export const ReactWithComboboxMultiple: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		// IMPORTANT:
		// Using Field as={Field.Combobox} requires
		// "use client" if doing server-side rendering
		const [selected, setSelected] = useState<FieldComboboxSelected>([
			{ value: "saft", label: "Saft" },
		]);

		return (
			<Field
				as={Field.Combobox}
				data-multiple
				label="React med forslag flervalg"
				selected={selected}
				onSelectedChange={setSelected}
				options={[
					{ value: "saft", label: "Saft" },
					{ value: "suse", label: "Suse" },
				]}
			/>
		);
	},
};

export const ReactWithComboboxLong: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<>
			<div style={{ height: 400 }} />
			<Field>
				<label>React med lange og mange</label>
				<p>Beskrivelse</p>
				<Field.Combobox>
					<Input className={styles.input} />
					<del role="img" aria-label="Fjern tekst"></del>
					<Field.Datalist data-position="top">
						<Field.Option>
							Thunder Thunder Thunder Thunder Thunder Thunder Thunder Thunder
							Thunder Thunder Thunder Thunder Thunder
						</Field.Option>
						<Field.Option>Whisper</Field.Option>
						<Field.Option>Galaxy</Field.Option>
						<Field.Option>Melody</Field.Option>
						<Field.Option>Crystal</Field.Option>
						<Field.Option>Sunset</Field.Option>
						<Field.Option>Journey</Field.Option>
						<Field.Option>Phoenix</Field.Option>
						<Field.Option>Harmony</Field.Option>
						<Field.Option>Neptune</Field.Option>
						<Field.Option>Cascade</Field.Option>
						<Field.Option>Velvet</Field.Option>
						<Field.Option>Rhythm</Field.Option>
						<Field.Option>Compass</Field.Option>
						<Field.Option>Prism</Field.Option>
						<Field.Option>Breeze</Field.Option>
						<Field.Option>Eclipse</Field.Option>
						<Field.Option>Sterling</Field.Option>
						<Field.Option>Canvas</Field.Option>
						<Field.Option>Zenith</Field.Option>
						<Field.Option>Whisper</Field.Option>
						<Field.Option>Galaxy</Field.Option>
						<Field.Option>Melody</Field.Option>
						<Field.Option>Crystal</Field.Option>
						<Field.Option>Sunset</Field.Option>
						<Field.Option>Journey</Field.Option>
						<Field.Option>Phoenix</Field.Option>
						<Field.Option>Harmony</Field.Option>
						<Field.Option>Neptune</Field.Option>
						<Field.Option>Cascade</Field.Option>
						<Field.Option>Velvet</Field.Option>
						<Field.Option>Rhythm</Field.Option>
						<Field.Option>Compass</Field.Option>
						<Field.Option>Prism</Field.Option>
						<Field.Option>Breeze</Field.Option>
						<Field.Option>Eclipse</Field.Option>
						<Field.Option>Sterling</Field.Option>
						<Field.Option>Canvas</Field.Option>
						<Field.Option>Zenith</Field.Option>
					</Field.Datalist>
				</Field.Combobox>
			</Field>
			<div style={{ height: 800 }} />
		</>
	),
};

export const ReactWithCombobxCustomFilter: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		// IMPORTANT:
		// Using Field as={Field.Combobox} requires
		// "use client" if doing server-side rendering
		const [value, setValue] = useState("");
		const [selected, setSelected] = useState<FieldComboboxSelected>([]);
		const options = [
			"Sogndal",
			"Oslo",
			"Brønnøysund",
			"Stavanger",
			"Trondheim",
			"Bergen",
			"Lillestrøm",
		];

		return (
			<Field
				as={Field.Combobox}
				data-multiple
				label="Filterer på starten av ordet"
				value={value}
				onInput={({ target }) => setValue(target.value)}
				selected={selected}
				onSelectedChange={setSelected}
				options={options
					.filter((opt) => opt.toLowerCase().startsWith(value.toLowerCase()))
					.map((option) => ({ value: option, label: option }))}
			/>
		);
	},
};
