import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import { Errorsummary, Heading } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Error summary",
	decorators: [
		function Decorate(Story) {
			useEffect(() => {
				const handleClick = (event: Event) => {
					const anchor = (event.target as Element)?.closest?.('a[href^="#"]');
					const input = document.getElementById(
						(anchor as HTMLAnchorElement)?.hash.slice(1),
					);

					if (input) {
						event.preventDefault();
						input.scrollIntoView({ behavior: "smooth" });
						input.focus();
					}
				};

				document.addEventListener("click", handleClick);
				return () => document.removeEventListener("click", handleClick);
			});

			const klass = styles.errorsummary.split(" ")[0];

			// Disable autofocus in storybook
			return (
				<>
					<style>{`.${klass},.${klass}::after{animation:none}`}</style>
					<Story />
				</>
			);
		},
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ds-error-summary className={styles.errorsummary}>
			<h2 tabIndex={-1}>For å gå videre må du rette opp følgende feil:</h2>
			<ul>
				<li>
					<a href="#my-input-1">Fødselsdato kan ikke være etter år 2005</a>
				</li>
				<li>
					<a href="#my-input-2">Telefonnummer kan kun inneholde siffer</a>
				</li>
				<li>
					<a href="#my-input-3">E-post må være gyldig</a>
				</li>
			</ul>
		</ds-error-summary>
	),
};

export const React: Story = {
	render: () => (
		<Errorsummary>
			<Heading>For å gå videre må du rette opp følgende feil:</Heading>
			<ul>
				<li>
					<a href="#my-input-1">Fødselsdato kan ikke være etter år 2005</a>
				</li>
				<li>
					<a href="#my-input-2">Telefonnummer kan kun inneholde siffer</a>
				</li>
				<li>
					<a href="#my-input-3">E-post må være gyldig</a>
				</li>
			</ul>
		</Errorsummary>
	),
};

export const WithForm: Story = {
	render: function Render() {
		const [showErrorSummary, setShowErrorSummary] = useState(false);
		const [value, setValue] = useState("");

		const errorTitle = useRef<HTMLDivElement>(null);
		const handleSubmit = (event: React.FormEvent) => {
			const isValid = value === "jeg tester";

			event.preventDefault();
			setShowErrorSummary(!isValid);

			if (isValid) alert("Du fikk det til!");
			else setTimeout(() => errorTitle.current?.focus()); // Move focus on next render
		};

		return (
			<form className={styles.grid} data-gap="4" onSubmit={handleSubmit}>
				<ds-error-summary
					className={styles.errorsummary}
					hidden={!showErrorSummary}
				>
					<h2 tabIndex={-1} ref={errorTitle}>
						For å gå videre må du rette opp følgende feil:
					</h2>
					<ul>
						<li>
							<a href="#my-input">Du må skrive teksten "jeg tester"</a>
						</li>
					</ul>
				</ds-error-summary>
				<ds-field className={styles.field}>
					<label>
						Skriv teksten <code className={styles.tag}>jeg tester</code>:
					</label>
					<input
						className={styles.input}
						id="my-input"
						onChange={({ target }) => setValue(target.value)}
						value={value}
					/>
				</ds-field>
				<div className={styles.flex} data-justify="end">
					<button
						type="submit"
						className={styles.button}
						data-variant="primary"
						data-arrow
					>
						Send inn
					</button>
				</div>
			</form>
		);
	},
};
