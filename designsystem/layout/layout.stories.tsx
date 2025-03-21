import {
	Bell,
	Gear,
	ListChecks,
	MagnifyingGlass,
	Plant,
	SignOut,
	Signature,
	User,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";
import { Button, Flex, Grid } from "../react";
import styles from "../styles.module.css";

const gaps = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 22, 26, 30,
];
const meta = {
	title: "Designsystem/Layout",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div className="mt-story">
				<Story />
				<style>{`
					.mt-story:not(:has(.${styles.body.split(" ")[0]})) {
						display: grid;
						gap: 1rem;
						padding: 1px;
						
						& b { display: flex; align-items: center; padding: .5em 1em; border: 1px solid; border-radius: var(--mtds-border-radius-md) }
						& code { font-size: .875rem }
						& div:not([class*="box"]) { outline: 1px dashed color-mix(in hsl, currentcolor 50%, transparent) }
						& div[data-align-content] { height: 150px }
					}
				`}</style>
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlexStory: Story = {
	name: "Flex",
	parameters: {
		showInOverview: true,
	},
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

export const GridStory: Story = {
	name: "Grid",
	parameters: {
		showInOverview: true,
	},
	render: () => (
		<div className={styles.grid} data-gap="6">
			<div className={styles.grid} data-items="auto">
				<div>auto</div>
				<div>auto</div>
			</div>
			<div
				className={styles.grid}
				data-gap="6"
				style={{ gridTemplateColumns: "1fr 2fr" }}
			>
				<div>
					Custom
					<div className={styles.grid} data-items="100" data-gap="0">
						<div>100</div>
						<div>100</div>
					</div>
				</div>
				<div className={styles.grid} data-items="300" data-gap="4">
					<div>300</div>
					<div className={styles.grid} data-items="100">
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
						<div>100</div>
					</div>
					<div>300</div>
					<div>300</div>
				</div>
			</div>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Flex>
				<Button data-variant="primary">Action 1</Button>
				<Button data-variant="primary">Action som er lengre 2</Button>
				<Button data-variant="primary">Action 3</Button>
				<Button data-variant="primary">Action 4</Button>
				<Button data-variant="primary">Action 5</Button>
				<Button data-variant="primary">Action 6</Button>
			</Flex>
			<Grid data-gap="6">
				<Grid data-items="auto">
					<div>auto</div>
					<div>auto</div>
				</Grid>
				<Grid style={{ gridTemplateColumns: "1fr 2fr" }} data-gap="6">
					<div>
						Custom
						<Grid data-items="100" data-gap="0">
							<div>100</div>
							<div>100</div>
						</Grid>
					</div>
					<Grid data-items="300" data-gap="4">
						<div>300</div>
						<Grid data-items="100">
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
							<div>100</div>
						</Grid>
						<div>300</div>
						<div>300</div>
					</Grid>
				</Grid>
			</Grid>
		</>
	),
};

export const Gap: Story = {
	render: () => (
		<section className={styles.grid} style={{ gridTemplateColumns: "1fr 2fr" }}>
			{gaps.map((gap) => (
				<Fragment key={gap}>
					<code>data-gap="{gap}"</code>
					<div className={styles.flex} data-gap={gap}>
						<b>a</b>
						<b>b</b>
						<b>c</b>
						<b>d</b>
					</div>
				</Fragment>
			))}
		</section>
	),
};

export const Center: Story = {
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

export const ItemSizes: Story = {
	render: () => (
		<>
			<h2 className={styles.heading}>
				Minimumsstørrelser Grid og Flex data-items:
			</h2>
			{Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
				<div key={i}>
					<div className={styles.flex} key={i} data-gap="3" data-fixed>
						<div
							data-self={i * 50}
							style={{
								background: "var(--mtds-color-surface-tinted)",
								whiteSpace: "nowrap",
							}}
						>
							{i * 50}
						</div>
					</div>
				</div>
			))}
		</>
	),
};

export const Align: Story = {
	render: () => (
		<section
			className={styles.grid}
			data-align="center"
			data-gap="6"
			style={{ gridTemplateColumns: "1fr 2fr" }}
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
	render: () => (
		<section
			className={styles.grid}
			data-align="center"
			data-gap="6"
			style={{ gridTemplateColumns: "1fr 2fr" }}
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
	render: () => (
		<section
			className={styles.grid}
			data-items="200"
			data-gap="6"
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
	name: "App (Experimental)",
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
		<div className={styles.app}>
			<header>
				<nav className={styles.breadcrumbs} aria-label="Du er her">
					<ul>
						<li>
							<a href="#none" className={styles.logo}>
								<Plant weight="fill" />
								Digiplant
							</a>
						</li>
						<li>
							<a href="#none">Søknader</a>
						</li>
					</ul>
				</nav>
				<button type="button" className={styles.button}>
					<Bell />
				</button>
				<button
					type="button"
					className={styles.avatar}
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
			<nav data-expanded="true">
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
				<hr className={styles.divider} data-gap="8" />
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
			<aside data-expanded="false">
				<form className={styles.grid} data-gap="4">
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
