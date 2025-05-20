import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import type { UHTMLComboboxElement } from "../";
import { Field, Input } from "../react";
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
				'If `as="select"`: `string[] | { label: string; value: string }[]`',
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		prefix: {
			description: "Prefix affix `string`",
			table: {
				defaultValue: { summary: undefined },
				type: { summary: undefined },
			},
		},
		sufix: {
			description: "Prefix affix `string`",
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
			<Field
				as="select"
				label="Ledetekst"
				options={["Option 1", { label: "Option 2", value: "option 2" }]}
			/>
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
	name: "With Combobox (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.field}>
			<label>Med forslag</label>
			<u-combobox>
				<input type="search" className={styles.input} />
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

export const WithComboboxMultiple: Story = {
	name: "With Combobox Multiple (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.field}>
			<label>Med forslag flervalg</label>
			<u-combobox data-multiple>
				<data value="Sogndal">Sogndal</data>
				<input type="search" className={styles.input} />
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

export const ReactWithDatalist: Story = {
	name: "React With Datalist (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<Field>
			<label>React med forslag</label>
			<p>Beskrivelse</p>
			<Field.Combobox>
				<Input className={styles.input} />
				<Field.Datalist>
					<Field.Option>Saft</Field.Option>
					<Field.Option>Suse</Field.Option>
				</Field.Datalist>
			</Field.Combobox>
		</Field>
	),
};

export const ReactWithComboboxMultiple: Story = {
	name: "React With Tags (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<Field>
			<label>React med forslag flervalg</label>
			<p>Beskrivelse</p>
			<Field.Combobox data-multiple>
				<data>Saft</data>
				<Input className={styles.input} />
				<Field.Datalist data-nofilter>
					<Field.Option>Saft</Field.Option>
					<Field.Option>Suse</Field.Option>
				</Field.Datalist>
			</Field.Combobox>
		</Field>
	),
};

export const WithComboboxAPI: Story = {
	name: "With Combobox API (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => {
		const inputRef = useRef<HTMLInputElement>(null);
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
						onInput={handleInput}
						ref={inputRef}
					/>
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

export const WitComboboxCustomFilter: Story = {
	name: "With Datalist Custom Filter (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => {
		const ref = useRef<UHTMLComboboxElement>(null);
		const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
			const input = event.currentTarget;
			const needle = input.value.trim().toLowerCase() || "";

			for (const option of input.list?.options || []) {
				option.disabled = !option.text.toLowerCase().startsWith(needle); // Your custom filtering here
			}
		};

		return (
			<div className={styles.field}>
				<label>Eget filter - gir kun treff fra starten av ordet</label>
				<u-combobox ref={ref}>
					<input type="search" className={styles.input} onInput={handleInput} />
					<u-datalist data-nofilter>
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
		);
	},
};
