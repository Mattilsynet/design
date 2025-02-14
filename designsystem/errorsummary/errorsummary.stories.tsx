import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
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

			return (
				<div style={{ width: "90vw", maxWidth: 500 }}>
					<Story />
				</div>
			);
		},
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.errorsummary} role="alert">
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
		</div>
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
			<form className={styles.grid} data-gap="md" onSubmit={handleSubmit}>
				<div
					className={styles.errorsummary}
					role="alert"
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
				</div>
				<div className={styles.field}>
					<label>
						Skriv teksten <code className={styles.tag}>jeg tester</code>:
					</label>
					<input
						className={styles.input}
						id="my-input"
						onChange={({ target }) => setValue(target.value)}
						value={value}
					/>
				</div>
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
