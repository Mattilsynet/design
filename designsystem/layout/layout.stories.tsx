import {
	Gear,
	ListChecks,
	MagnifyingGlass,
	SignOut,
	Signature,
	User,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Layout",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators: Story["decorators"] = [
	(Story) => (
		<div className="mt-story">
			<Story />
			<style>{`
        .mt-story { display: grid; gap: 1rem; padding: 1px }
        .mt-story div:not([class*="box"]) { outline: 1px dashed color-mix(in hsl, currentcolor 50%, transparent) }
				.mt-story b { display: flex; align-items: center; padding: .5em 1em; border: 1px solid; border-radius: 5px }
        .mt-story code { font-size: .875rem }
        .mt-story div[data-align-content] { height: 150px }
      `}</style>
		</div>
	),
];

export const Flex: Story = {
	decorators,
	render: () => (
		<div className={styles.flex}>
			<button type="button" className={styles.button} data-variant="primary">
				Action 1
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action som er lengre 2
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 3
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 4
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 5
			</button>
			<button type="button" className={styles.button} data-variant="primary">
				Action 6
			</button>
		</div>
	),
};

export const Grid: Story = {
	decorators,
	render: () => (
		<div className={styles.grid} data-gap="lg">
			<div className={styles.grid} data-grid="fit-lg">
				<div>Child 1</div>
				<div>Child 2</div>
			</div>
			<div className={styles.grid} data-grid="sidebar" data-gap="lg">
				<div>
					Sidebar
					<div className={styles.grid} data-grid="fit-sm" data-gap="none">
						<div>Child 1</div>
						<div>Child 2</div>
					</div>
				</div>
				<div className={styles.grid} data-grid="2" data-gap="md">
					<div>Child 1</div>
					<div className={styles.grid} data-grid="sm">
						<div>Child 2-1</div>
						<div>Child 2-2</div>
						<div>Child 2-3</div>
						<div>Child 2-4</div>
						<div>Child 2-5</div>
						<div>Child 2-6</div>
					</div>
					<div>Child 3</div>
					<div>Child 4</div>
				</div>
			</div>
		</div>
	),
};

export const Gap: Story = {
	decorators,
	render: () => (
		<section className={styles.grid} data-grid="sidebar">
			<code>data-gap="none | false"</code>
			<div className={styles.flex} data-gap="none">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="xs"</code>
			<div className={styles.flex} data-gap="xs">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="sm"</code>
			<div className={styles.flex} data-gap="sm">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="md"</code>
			<div className={styles.flex} data-gap="md">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="lg"</code>
			<div className={styles.flex} data-gap="lg">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
		</section>
	),
};

export const Center: Story = {
	decorators,
	parameters: {
		layout: "fullscreen",
	},
	render: () => (
		<>
			<div className={styles.grid} data-center="sm">
				sm (640px)
			</div>
			<div className={styles.grid} data-center="md">
				md (768px)
			</div>
			<div className={styles.grid} data-center="lg">
				lg (1024px)
			</div>
			<div className={styles.grid} data-center="xl">
				xl (1280px)
			</div>
			<div className={styles.grid} data-center="2xl">
				2xl (1536px)
			</div>
		</>
	),
};

export const Align: Story = {
	decorators,
	render: () => (
		<section
			className={styles.grid}
			data-grid="sidebar"
			data-align="center"
			data-gap="lg"
		>
			<code>data-align="stretch"</code>
			<div className={styles.flex} data-align="stretch">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="start"</code>
			<div className={styles.flex} data-align="start">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="center"</code>
			<div className={styles.flex} data-align="center">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
			<code>data-align="end"</code>
			<div className={styles.flex} data-align="end">
				<b data-size="sm">Small</b>
				<b data-size="md">Medium</b>
				<b data-size="lg">Large</b>
			</div>
		</section>
	),
};

export const Justify: Story = {
	decorators,
	render: () => (
		<section
			className={styles.grid}
			data-grid="sidebar"
			data-align="center"
			data-gap="lg"
		>
			<code>data-justify="start"</code>
			<div className={styles.flex} data-justify="start">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="center"</code>
			<div className={styles.flex} data-justify="center">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="end"</code>
			<div className={styles.flex} data-justify="end">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-between"</code>
			<div className={styles.flex} data-justify="space-between">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-around"</code>
			<div className={styles.flex} data-justify="space-around">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
			<code>data-justify="space-evenly"</code>
			<div className={styles.flex} data-justify="space-evenly">
				<b>Box</b>
				<b>Box</b>
				<b>Box</b>
			</div>
		</section>
	),
};

export const AlignContent: Story = {
	decorators,
	render: () => (
		<section className={styles.grid} data-grid="lg" data-gap="lg">
			<article>
				<code>start</code>
				<div className={styles.flex} data-align-content="start">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>center</code>
				<div className={styles.flex} data-align-content="center">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>end</code>
				<div className={styles.flex} data-align-content="end">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-between</code>
				<div className={styles.flex} data-align-content="space-between">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-around</code>
				<div className={styles.flex} data-align-content="space-around">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
			<article>
				<code>space-evenly</code>
				<div className={styles.flex} data-align-content="space-evenly">
					<b>Box</b>
					<b>Box</b>
					<b>Box</b>
				</div>
			</article>
		</section>
	),
};

export const App: Story = {
	tags: ["!dev"], // TMP hide story
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		function Render(Story) {
			useEffect(() => {
				const handleToggle = ({ target }: Event) => {
					const el = (target as Element)?.closest("nav"); // "nav,aside,header,footer"
					// 	el?.toggleAttribute("hidden");

					el?.setAttribute(
						"data-expanded",
						`${el.getAttribute("data-expanded") === "false"}`,
					);
				};

				document.addEventListener("click", handleToggle);
				return () => document.removeEventListener("click", handleToggle);
			}, []);

			return (
				<div className={styles.body}>
					<Story />
				</div>
			);
		},
	],
	render: () => (
		<div className={styles.grid} data-grid="app">
			<header>
				<nav className={styles.breadcrumbs} aria-label="Du er her">
					<ul>
						<li>
							<a href="#none" className={styles.logo}></a>
						</li>
						<li>
							<a href="#none">Søknader</a>
						</li>
					</ul>
				</nav>
				<menu className={styles.flex}>
					<li>
						<button type="button" className={styles.button}>
							En knapp
						</button>
					</li>
					<li>
						<button
							type="button"
							className={styles.button}
							aria-label="Meny"
							popoverTarget="menu"
						></button>
						<menu className={styles.popover} popover="auto" id="menu">
							<li>
								<a className={styles.button} href="#none">
									<User />
									Profil
								</a>
							</li>
							<li>
								<a className={styles.button} href="#none">
									<Gear />
									Innstillinger
								</a>
							</li>
							<li>
								<a className={styles.button} href="#none">
									<SignOut />
									Logg ut
								</a>
							</li>
						</menu>
					</li>
				</menu>
			</header>
			<nav data-expanded="false">
				<menu>
					<li>
						<a
							className={styles.button}
							href="#none"
							aria-current="page"
							data-expanded="Søknader"
						>
							<Signature />
						</a>
					</li>
					<li>
						<a
							className={styles.button}
							href="#none"
							data-expanded="Behandling"
						>
							<ListChecks />
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none" data-expanded="Søk">
							<MagnifyingGlass />
						</a>
					</li>
				</menu>
			</nav>
			<main>
				<div className={styles.card} style={{ height: "100%" }}>
					Content
				</div>
			</main>
			<aside>
				<form>
					<h2 className={styles.heading} data-size="xs">
						Filters
					</h2>
				</form>
			</aside>
			<footer hidden>
				<a href="#none" className={styles.logo}></a>
			</footer>
		</div>
	),
};
