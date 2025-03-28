import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Breadcrumbs",
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
					<a href="#none">Nivå 4</a>
				</li>
			</ol>
		</nav>
	),
};

export const React: Story = {
	render: () => (
		<Breadcrumbs>
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
					<a href="#none">Nivå 4</a>
				</li>
			</ol>
		</Breadcrumbs>
	),
};

export const WithBackbutton: Story = {
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
						<a href="#none">Nivå 4</a>
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
						<a href="#none">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit
						</a>
					</li>
					<li>
						<a href="#none">Nivå 3</a>
					</li>
					<li>
						<a href="#none">Nivå 4</a>
					</li>
				</ol>
			</nav>
		</>
	),
};

export const Sizes: Story = {
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
						<a href="#none">Nivå 4</a>
					</li>
				</ol>
			</nav>
		</>
	),
};

export const WithoutLinks: Story = {
	render: () => (
		<>
			<div className={styles.breadcrumbs} aria-label="Sidens plassering:">
				<ol>
					<li>
						<span>Nivå 1</span>
					</li>
					<li>
						<span>Nivå 2</span>
					</li>
					<li>
						<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
					</li>
					<li>
						<span>Nivå 4</span>
					</li>
				</ol>
			</div>
		</>
	),
};
