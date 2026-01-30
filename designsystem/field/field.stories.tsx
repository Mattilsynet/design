import { PintGlassIcon, WindIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import type { DSSuggestionElement } from "../";
import type { FieldSuggestionSelected } from "../react";
import { Field, Flex, Input } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Field",
	argTypes: {
		as: {
			description: "Element type",
			table: {
				defaultValue: { summary: "input" },
				type: { summary: "input | textarea | select" },
			},
		},
		type: {
			description: "Input type",
			table: {
				type: { summary: "text | checkbox | radio | ..." },
			},
		},
		label: {
			description: "Label text",
			table: {
				type: { summary: "React.ReactNode" },
			},
		},
		description: {
			description: "Description text",
			table: {
				type: { summary: "React.ReactNode" },
			},
		},
		value: {
			description: "Value",
			table: {
				type: { summary: "string" },
			},
		},
		checked: {
			description: 'If `type="checkbox"` or `type="radio"`',
			table: {
				type: { summary: "boolean" },
			},
		},
		validation: {
			description: "Validation message",
			table: {
				type: { summary: "React.ReactNode" },
			},
		},
		count: {
			description: "Character count",
			table: {
				type: { summary: "number" },
			},
		},
		options: {
			description: 'If `as="select"` or `as={Field.Suggestion}`',
			table: {
				type: {
					summary:
						"string[] | { label: string; value: string; children?: React.ReactNode }[]",
				},
			},
		},
		prefix: {
			description: "Prefix",
			table: {
				type: { summary: "string" },
			},
		},
		suffix: {
			description: "Suffix",
			table: {
				type: { summary: "string" },
			},
		},
		helpText: {
			description: "What to display in HelpText",
			table: {
				type: { summary: "React.ReactNode" },
			},
		},
		helpTextLabel: {
			description: "Label of HelpText button",
			table: {
				type: { summary: "string" },
			},
		},
		"data-nofilter": {
			description: "If `as={Field.Suggestion}`",
			table: {
				type: { summary: "boolean" },
			},
		},
		selected: {
			description: "If `as={Field.Suggestion}`",
			table: {
				type: {
					summary:
						"{ label: string; value: string; children?: React.ReactNode }[]",
				},
			},
		},
		onSelectedChange: {
			description: "If `as={Field.Suggestion}`",
			table: {
				type: { summary: "(selected) => void" },
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
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<p data-field="description">Beskrivelse</p>
			<input type="text" className={styles.input} />
		</ds-field>
	),
};

export const React: Story = {
	render: () => (
		<>
			<h2>
				Field uten <code>as</code> attributt lar deg bygge opp av bestanddeler:
			</h2>
			<Field>
				<Field.Label>Ledetekst</Field.Label>
				<Field.Description>Beskrivelse</Field.Description>
				<Input />
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
				validation="Feilmelding"
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
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<p data-field="description">Beskrivelse</p>
			<input type="text" required className={styles.input} />
		</ds-field>
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
				<ds-field className={styles.field}>
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
				</ds-field>
				<div className={styles.grid} style={{ paddingLeft: "var(--mtds-8)" }}>
					{all.map((value) => (
						<ds-field className={styles.field} key={value}>
							<label>Alternativ 1</label>
							<input
								checked={checked.includes(value)}
								className={styles.input}
								onChange={onChange}
								type="checkbox"
								value={value}
							/>
						</ds-field>
					))}
				</div>
			</fieldset>
		);
	},
};

export const Toggles: Story = {
	render: () => (
		<>
			<fieldset className={styles.fieldset} aria-label="Velg alternativ">
				<ds-field className={styles.field}>
					<label>Radio 1</label>
					<input
						type="radio"
						className={styles.input}
						name="my-radio"
						defaultChecked
					/>
				</ds-field>
				<ds-field className={styles.field}>
					<label>Radio 2</label>
					<p data-field="description">Beskrivelse</p>
					<input type="radio" className={styles.input} name="my-radio" />
				</ds-field>
			</fieldset>
			<ds-field className={styles.field}>
				<label>Check</label>
				<input type="checkbox" className={styles.input} />
			</ds-field>
			<ds-field className={styles.field}>
				<label>Switch</label>
				<input type="checkbox" className={styles.input} role="switch" />
			</ds-field>
		</>
	),
};

export const WithValidation: Story = {
	parameters: { showInOverview: true },
	render: () => (
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<p data-field="description">Beskrivelse</p>
			<input type="text" className={styles.input} />
			<div className={styles.validation} data-field="validation">
				Validation
			</div>
		</ds-field>
	),
};

export const WithValidationForm: Story = {
	parameters: { layout: "padded" },
	name: "With Validation Form",
	render: () => {
		const [selected, setSelected] = useState<FieldSuggestionSelected>([]);

		return (
			<form action="#" className={styles.prose} data-validation="form">
				<ds-field className={styles.field}>
					<label>E-post</label>
					<p data-field="description">Beskrivelse</p>
					<input type="email" className={styles.input} required />
					<div className={styles.validation} data-field="validation">
						Må inneholde en gyldig e-postadresse
					</div>
				</ds-field>
				<ds-field className={styles.field}>
					<label>Tekst</label>
					<p data-field="description">Beskrivelse</p>
					<input type="text" className={styles.input} required />
					<div className={styles.validation} data-field="validation">
						Må fylles ut
					</div>
				</ds-field>
				<ds-field className={styles.field}>
					<label>Suggestion</label>
					<ds-suggestion className={styles.suggestion}>
						<input type="text" className={styles.input} aria-required="true" />
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
					</ds-suggestion>
					<div className={styles.validation} data-field="validation">
						Må fylles ut
					</div>
				</ds-field>
				<Field
					as="input"
					validation="Må fylles ut"
					label="React input"
					required
				/>
				<Field
					aria-required="true"
					as={Field.Suggestion}
					label="React Suggestion"
					onSelectedChange={setSelected}
					selected={selected}
					validation="Må fylles ut"
					options={[
						{ value: "Sogndal", label: "Sogndal" },
						{ value: "Oslo", label: "Oslo" },
						{ value: "Bergen", label: "Bergen" },
					]}
				/>
				<button type="submit" className={styles.button} data-variant="primary">
					Send inn
				</button>
			</form>
		);
	},
};

export const WithAffixes: Story = {
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Pris i NOK per måned</label>
			<div className={styles.affixes}>
				<span>NOK</span>
				<input type="text" className={styles.input} />
				<span>pr. mnd.</span>
			</div>
		</ds-field>
	),
};

export const WithCharacterCount: Story = {
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<p data-field="description">Beskrivelse</p>
			<textarea className={styles.input} defaultValue="Noe innhold" />
			<p data-field="counter" data-limit="20" />
		</ds-field>
	),
};

export const WithCustomDescriptionTag: Story = {
	parameters: { layout: "padded" },
	render: () => (
		<ds-field className={styles.field}>
			<label>Ledetekst</label>
			<div data-field="description" className={styles.prose}>
				<p data-field="description">
					Beskrivelse i en <code>data-field="description"</code> som virker med
					og uten <code>&lt;p&gt;</code>
				</p>
			</div>
			<textarea className={styles.input} defaultValue="Noe innhold" />
			<p className={styles.validation} data-field="counter" data-limit="20" />
		</ds-field>
	),
};

export const WithSuggestion: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Med forslag</label>
			<ds-suggestion className={styles.suggestion}>
				<input type="text" className={styles.input} />
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
			</ds-suggestion>
			<select name="form-data" hidden></select>
		</ds-field>
	),
};

export const WithSuggestionMultiple: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Med forslag flervalg</label>
			<ds-suggestion className={styles.suggestion} data-multiple>
				<data value="Sogndal">Sogndal</data>
				<input type="text" className={styles.input} />
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
			</ds-suggestion>
		</ds-field>
	),
};

export const WithSuggestionCreatable: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => (
		<ds-field className={styles.field}>
			<label>Skriv noe som ikke finnes i listen og trykk Enter:</label>
			<ds-suggestion className={styles.suggestion} data-multiple data-creatable>
				<data value="Sogndal">Sogndal</data>
				<input type="text" className={styles.input} />
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
			</ds-suggestion>
		</ds-field>
	),
};

export const WithSuggestionAPI: Story = {
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
			<ds-field className={styles.field}>
				<label>Med henting av resultater fra API</label>
				<ds-suggestion className={styles.suggestion}>
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
				</ds-suggestion>
			</ds-field>
		);
	},
};

export const WithSuggestionCustomFilter: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => {
		const ref = useRef<DSSuggestionElement>(null);
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
			<ds-field className={styles.field}>
				<label>Eget filter - gir kun treff fra starten av ordet</label>
				<ds-suggestion className={styles.suggestion} ref={ref}>
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
				</ds-suggestion>
			</ds-field>
		);
	},
};

export const ReactWithSuggestion: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		// IMPORTANT:
		// Using Field.Suggestion requires
		// "use client" if doing server-side rendering
		const [selected, setSelected] = useState<FieldSuggestionSelected>([
			{ value: "saft", label: "Saft" },
		]);

		return (
			<Field
				as={Field.Suggestion}
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

export const ReactWithSuggestionWithChildren: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		const multiple = true;
		const [selected, setSelected] = useState<FieldSuggestionSelected>([]);

		return (
			<Field>
				<Field.Label>React med Field.Suggestion med barn</Field.Label>
				<Field.Description>
					Hvis Field.Suggestion har barn, tegner den ikke input selv.
				</Field.Description>
				<Field.Suggestion
					data-multiple={multiple}
					selected={selected}
					onSelectedChange={setSelected}
				>
					<Input />
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
				</Field.Suggestion>
			</Field>
		);
	},
};

export const ReactWithSuggestionMultiple: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		// IMPORTANT:
		// Using Field.Suggestion requires
		// "use client" if doing server-side rendering
		const [selected, setSelected] = useState<FieldSuggestionSelected>([
			{ value: "saft", label: "Saft" },
		]);

		return (
			<Field
				as={Field.Suggestion}
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

export const ReactWithSuggestionCreatable: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		// IMPORTANT:
		// Using Field.Suggestion requires
		// "use client" if doing server-side rendering
		const [selected, setSelected] = useState<FieldSuggestionSelected>([
			{ value: "saft", label: "Saft" },
		]);

		return (
			<Field
				as={Field.Suggestion}
				data-multiple
				data-creatable
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

export const ReactWithSuggestionLong: Story = {
	parameters: {
		layout: "padded",
	},
	render: () => {
		// IMPORTANT:
		// Using Field.Suggestion requires
		// "use client" if doing server-side rendering
		const [selected, setSelected] = useState<FieldSuggestionSelected>([]);

		return (
			<>
				<div style={{ height: 400 }} />
				<Field>
					<Field.Label>React med lange og mange</Field.Label>
					<Field.Description>Beskrivelse</Field.Description>
					<Field.Suggestion selected={selected} onSelectedChange={setSelected}>
						<Input />
						<del role="img" aria-label="Fjern tekst"></del>
						<Field.Datalist data-nofilter data-placement="top">
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
						</Field.Datalist>
					</Field.Suggestion>
				</Field>
				<div style={{ height: 800 }} />
			</>
		);
	},
};

export const ReactWithSuggestionCustomFilter: Story = {
	parameters: {
		layout: "padded",
	},
	render: function Render() {
		const [value, setValue] = useState("");
		const [selected, setSelected] = useState<FieldSuggestionSelected>([]);
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
			<Field>
				<Field.Label>Filterer på starten av ordet</Field.Label>
				<Field.Suggestion
					data-nofilter
					data-multiple
					selected={selected}
					onSelectedChange={setSelected}
					options={options
						.filter((opt) => opt.toLowerCase().startsWith(value.toLowerCase()))
						.map((value) => ({ label: value, value }))}
				>
					<Input
						value={value}
						onInput={({ currentTarget }) => setValue(currentTarget.value)}
					/>
					<del role="img" aria-label="Fjern tekst"></del>
				</Field.Suggestion>
			</Field>
		);
	},
};
