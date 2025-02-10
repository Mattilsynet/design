import {
	Gear,
	ListChecks,
	MagnifyingGlass,
	SignOut,
	Signature,
	User,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
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
			<code>data-gap="xs" (4px)</code>
			<div className={styles.flex} data-gap="xs">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="sm" (8px)</code>
			<div className={styles.flex} data-gap="sm">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="md" (16px)</code>
			<div className={styles.flex} data-gap="md">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="lg" (24px)</code>
			<div className={styles.flex} data-gap="lg">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="xl" (32px)</code>
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
		<section
			className={styles.grid}
			data-grid="3"
			data-gap="lg"
			style={{ maxWidth: 700 }}
		>
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
		(Story) => (
			<div className={styles.body}>
				<Story />
			</div>
		),
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
				<button type="button" className={styles.button}>
					En knapp
				</button>
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
			</header>
			<nav data-expanded="true" className={styles.grid} data-gap="lg">
				<button type="button"></button>
				<menu>
					<li>
						<a
							className={styles.button}
							href="#none"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<Signature />
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none" data-tooltip="Behandling">
							<ListChecks />
						</a>
					</li>
					<li>
						<a className={styles.button} href="#none" data-tooltip="Søk">
							<MagnifyingGlass />
						</a>
					</li>
				</menu>
				<form className={styles.grid} data-expanded="true">
					<fieldset className={styles.fieldset}>
						<legend>Velg type iskrem</legend>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Sjokolade</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Kokkos</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Jordbær</label>
						</div>
					</fieldset>
				</form>
			</nav>
			<main>
				<div className={styles.card} style={{ height: "100%" }}>
					<img
						style={{ width: "100%", height: 600, objectFit: "cover" }}
						src="https://mattilsynet-xp7prod.enonic.cloud/_/image/8fe5f0c4-49c2-4d27-9dca-764cdfc7e110:64ec235cca8f61e8e8e590ca1cf3a7fb28e132ba/width-1440/Forsidebanner.png"
						alt=""
					/>
					<fieldset className={styles.fieldset}>
						<legend>Hvilke foretrekker du?</legend>
						<p>Fellesbeskrivelse</p>
						<div className={styles.field}>
							<input
								type="checkbox"
								className={styles.input}
								name="my-check"
								defaultChecked
							/>
							<label>Alternativ 1</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} name="my-check" />
							<label>Alternativ 2</label>
						</div>
					</fieldset>
				</div>
			</main>
			<aside data-expanded="true">
				<form className={styles.grid} data-gap="md">
					<h2 className={styles.heading} data-size="xs">
						Filters
					</h2>
					<div className={styles.field}>
						<label>Search</label>
						<input type="text" className={styles.input} />
					</div>
					<fieldset className={styles.fieldset}>
						<legend>Velg type iskrem</legend>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Sjokolade</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Kokkos</label>
						</div>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Jordbær</label>
						</div>
					</fieldset>
				</form>
			</aside>
			<footer hidden>
				<a href="#none" className={styles.logo}></a>
			</footer>
		</div>
	),
};
