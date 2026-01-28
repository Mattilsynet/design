import type { Meta, StoryObj } from "@storybook/react-vite";
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
		<ds-breadcrumbs className={styles.breadcrumbs} aria-label="Du er her:">
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
		</ds-breadcrumbs>
	),
};

export const React: Story = {
	render: () => (
		<Breadcrumbs aria-label="Du er her:">
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
			<ds-breadcrumbs className={styles.breadcrumbs} aria-label="Du er her:">
				<a href="#none" aria-label="Tilbake til Nivå 3">
					Nivå 3
				</a>
			</ds-breadcrumbs>
			<br />
			Tilbakeknapp på kun mobil:
			<ds-breadcrumbs className={styles.breadcrumbs} aria-label="Du er her:">
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
			</ds-breadcrumbs>
			<br />
			Ingen tilbakeknapp:
			<ds-breadcrumbs className={styles.breadcrumbs} aria-label="Du er her:">
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
			</ds-breadcrumbs>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<ds-breadcrumbs className={styles.breadcrumbs} data-size="sm">
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
			</ds-breadcrumbs>
		</>
	),
};

export const WithoutLinks: Story = {
	render: () => (
		<ds-breadcrumbs className={styles.breadcrumbs} aria-label="Du er her:">
			<ol>
				<li>Nivå 1</li>
				<li>Nivå 2</li>
				<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
				<li>Nivå 4</li>
			</ol>
		</ds-breadcrumbs>
	),
};
