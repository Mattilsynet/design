import type { Meta, StoryObj } from "@storybook/react";
// import { useEffect, useRef, useState } from "react";
// import {
// 	type UHTMLTagsElement,
// 	debounce,
// 	isDatalistClick,
// 	syncDatalistState,
// } from "../index";
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
				<textarea className={styles.input} defaultValue="Noe innhold" />
				<p data-count="20" />
			</div>
		</>
	),
};

export const WithDatalist: Story = {
	name: "With Datalist (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.field}>
			<label>With datalist</label>
			<input type="search" className={styles.input} />
			<u-datalist>
				<u-option role="none">Ingen treff</u-option>
				<u-option value="Sogndal">Sogndal</u-option>
				<u-option value="Oslo">Oslo</u-option>
				<u-option value="Brønnøysund">Brønnøysund</u-option>
				<u-option value="Stavanger">Stavanger</u-option>
				<u-option value="Trondheim">Trondheim</u-option>
				<u-option value="Bergen">Bergen</u-option>
				<u-option value="Lillestrøm">Lillestrøm</u-option>
			</u-datalist>
		</div>
	),
};

// export const WithDatalistCustomFilter: Story = {
// 	name: "With Datalist Custom Filter (Eksperimentell)",
// 	parameters: {
// 		layout: "padded",
// 		showInOverview: true,
// 	},
// 	render: () => {
// 		const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
// 			// Your custom filtering here:
// 			const needle = target.value.trim().toLowerCase();
// 			const options = (target.list?.children || []) as HTMLOptionElement[];
// 			for (const option of options) {
// 				option.disabled = !option.text.toLowerCase().startsWith(needle);
// 			}
// 			syncDatalistState(target);
// 		};

// 		return (
// 			<div className={styles.field}>
// 				<label>With datalist - only matches start of words</label>
// 				<input type="search" className={styles.input} onInput={handleInput} />
// 				<u-datalist>
// 					<u-option role="none">Ingen treff</u-option>
// 					<u-option value="Sogndal">Sogndal</u-option>
// 					<u-option value="Oslo">Oslo</u-option>
// 					<u-option value="Brønnøysund">Brønnøysund</u-option>
// 					<u-option value="Stavanger">Stavanger</u-option>
// 					<u-option value="Trondheim">Trondheim</u-option>
// 					<u-option value="Bergen">Bergen</u-option>
// 					<u-option value="Lillestrøm">Lillestrøm</u-option>
// 				</u-datalist>
// 			</div>
// 		);
// 	},
// };

// export const WithDatalistAPI: Story = {
// 	name: "With Datalist API (Eksperimentell)",
// 	parameters: {
// 		layout: "padded",
// 		showInOverview: true,
// 	},
// 	render: () => {
// 		const inputRef = useRef<HTMLInputElement>(null);
// 		const [options, setOptions] = useState<string[] | string>("Name a country"); // Store results
// 		const [debounced, setDebounced] = useState<(value: string) => void>();

// 		const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
// 			if (isDatalistClick(event.nativeEvent)) return; // User clicked option element
// 			const value = encodeURIComponent(event.target.value.trim());

// 			setOptions(value ? "Loading..." : "Name a country");
// 			debounced?.(value);
// 		};

// 		// Debounce to avoid too many API calls
// 		useEffect(() => {
// 			const apiCall = async (value: string) => {
// 				const api = `https://restcountries.com/v2/name/${value}?fields=name`;
// 				const countries = await (await fetch(api)).json();

// 				setOptions(
// 					Array.isArray(countries)
// 						? countries.map(({ name }) => name)
// 						: "No results",
// 				);
// 			};
// 			setDebounced(() => debounce(apiCall, 500));
// 		}, []);

// 		// Prevent native datalist filtering so we can control state
// 		useEffect(() => {
// 			if (inputRef.current) syncDatalistState(inputRef.current);
// 		});

// 		return (
// 			<div className={styles.field}>
// 				<label>With datalist API search</label>
// 				<input
// 					type="search"
// 					className={styles.input}
// 					onInput={handleInput}
// 					ref={inputRef}
// 				/>
// 				<u-datalist>
// 					{Array.isArray(options) ? (
// 						options.map((option) => <u-option key={option}>{option}</u-option>)
// 					) : (
// 						<u-option role="none">{options}</u-option>
// 					)}
// 				</u-datalist>
// 			</div>
// 		);
// 	},
// };

export const WithTags: Story = {
	name: "With Tags (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<div className={styles.field}>
			<label>With tags</label>
			<u-tags>
				<data value="Sogndal">Sogndal</data>
				<input type="search" className={styles.input} />
				<u-datalist>
					<u-option role="none">Ingen treff</u-option>
					<u-option value="Sogndal">Sogndal</u-option>
					<u-option value="Oslo">Oslo</u-option>
					<u-option value="Brønnøysund">Brønnøysund</u-option>
					<u-option value="Stavanger">Stavanger</u-option>
					<u-option value="Trondheim">Trondheim</u-option>
					<u-option value="Bergen">Bergen</u-option>
					<u-option value="Lillestrøm">Lillestrøm</u-option>
				</u-datalist>
			</u-tags>
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
			<label>React with datalist</label>
			<p>Beskrivelse</p>
			<Input className={styles.input} />
			<Field.Datalist>
				<Field.Option>Saft</Field.Option>
				<Field.Option>Suse</Field.Option>
			</Field.Datalist>
		</Field>
	),
};

export const ReactWithTags: Story = {
	name: "React With Tags (Eksperimentell)",
	parameters: {
		layout: "padded",
		showInOverview: true,
	},
	render: () => (
		<Field>
			<label>React with tags</label>
			<p>Beskrivelse</p>
			<Field.Tags>
				<data>Saft</data>
				<Input className={styles.input} />
				<Field.Datalist>
					<Field.Option>Saft</Field.Option>
					<Field.Option>Suse</Field.Option>
				</Field.Datalist>
			</Field.Tags>
		</Field>
	),
};
