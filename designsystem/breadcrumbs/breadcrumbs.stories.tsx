import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Breadcrumbs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div className={styles.grid}>
			<Story />
		</div>
	),
];

export const Default: Story = {
	decorators,
	render: () => (
		<nav className={styles.breadcrumbs} aria-label="Du er her:">
			<a href="#none" aria-label="Tilbake til Nivå 3">
				Nivå 3
			</a>
			<ol>
				<li>
					<a href="#none">Nivå 1</a>
				</li>
				<li>
					<a href="#none">Nivå 2</a>
				</li>
				<li>
					<a href="#none">Nivå 3</a>
				</li>
				<li>
					<a href="#none" aria-current="page">
						Nivå 4
					</a>
				</li>
			</ol>
		</nav>
	),
};

export const WithBackbutton: Story = {
	decorators,
	render: () => (
		<>
			Tilbakeknapp på både mobil og desktop:
			<nav className={styles.breadcrumbs} aria-label="Du er her:">
				<a href="#none" aria-label="Tilbake til Nivå 3">
					Nivå 3
				</a>
			</nav>
			<br />
			Tilbakeknapp på kun mobil:
			<nav className={styles.breadcrumbs} aria-label="Du er her:">
				<a href="#none" aria-label="Tilbake til Nivå 3">
					Nivå 3
				</a>
				<ol>
					<li>
						<a href="#none">Nivå 1</a>
					</li>
					<li>
						<a href="#none">Nivå 2</a>
					</li>
					<li>
						<a href="#none">Nivå 3</a>
					</li>
					<li>
						<a href="#none" aria-current="page">
							Nivå 4
						</a>
					</li>
				</ol>
			</nav>
			<br />
			Ingen tilbakeknapp:
			<nav className={styles.breadcrumbs} aria-label="Du er her:">
				<ol>
					<li>
						<a href="#none">Nivå 1</a>
					</li>
					<li>
						<a href="#none">Nivå 2</a>
					</li>
					<li>
						<a href="#none">Nivå 3</a>
					</li>
					<li>
						<a href="#none" aria-current="page">
							Nivå 4
						</a>
					</li>
				</ol>
			</nav>
		</>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<>
			<nav
				className={styles.breadcrumbs}
				aria-label="Du er her:"
				data-size="sm"
			>
				<a href="#none" aria-label="Tilbake til Nivå 3">
					Nivå 3
				</a>
				<ol>
					<li>
						<a href="#none">Nivå 1</a>
					</li>
					<li>
						<a href="#none">Nivå 2</a>
					</li>
					<li>
						<a href="#none">Nivå 3</a>
					</li>
					<li>
						<a href="#none" aria-current="page">
							Nivå 4
						</a>
					</li>
				</ol>
			</nav>
		</>
	),
};
