import {
	Bell,
	BookOpenText,
	Gear,
	List,
	ListChecks,
	MagnifyingGlass,
	PaperPlane,
	Plant,
	SignOut,
	Signature,
	TrayArrowDown,
	User,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { App, Avatar, Button, Card, Logo, Popover } from "../react";
import styles from "../styles.module.css";

const Lipsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit orci, sagittis sodales viverra id, malesuada quis lacus. Nunc ac vulputate enim, et feugiat lorem. Suspendisse metus est, semper in tempor ut, ornare nec sapien. Maecenas dictum sodales leo, ut ultrices ex. Quisque in interdum nisl. Fusce non est finibus, imperdiet diam quis, sodales tellus. Maecenas vitae scelerisque ipsum. Maecenas tempor leo orci, a lacinia leo interdum et. Maecenas dictum tortor ut nisi mollis, ac lobortis metus congue. Aliquam pharetra leo at nulla molestie sagittis. Aenean condimentum viverra blandit. Phasellus placerat imperdiet felis, vel mollis ante maximus at. Nam pretium mattis augue, quis vehicula nisl facilisis in. Fusce in dolor et enim sollicitudin lobortis. Etiam tincidunt eleifend felis, sed faucibus ligula iaculis at. Fusce a venenatis nunc.";
const Image = (
	<img
		style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
		src="https://mattilsynet-xp7prod.enonic.cloud/_/image/8fe5f0c4-49c2-4d27-9dca-764cdfc7e110:64ec235cca8f61e8e8e590ca1cf3a7fb28e132ba/width-1440/Forsidebanner.png"
		alt=""
	/>
);

const meta = {
	title: "Designsystem/App (Eksperimentell)",
	id: "designsystem-app",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<>
				<style>
					{
						"body:not(:has(.sbdocs-preview)) { background: var(--ds-color-background-default) }"
					}
				</style>
				<Story />
			</>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<Plant weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<Bell />
				</button>
				<button
					type="button"
					className={styles.button}
					aria-label="Meny"
					popoverTarget="menu"
				>
					<span className={styles.avatar} data-size="xs"></span>
				</button>
				<menu className={styles.popover} popover="auto" id="menu">
					<li>
						<a className={styles.button} href="/">
							<User />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<Gear />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOut />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<nav>
				<button
					type="button"
					className={styles.button}
					data-command="toggle-app-expanded"
					data-tooltip="Navigasjon"
				></button>
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<Signature />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecks />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlass />
						</a>
					</li>
				</menu>
			</nav>
			<main>
				<div className={styles.card}>{Image}</div>
			</main>
		</div>
	),
};

export const React: Story = {
	render: () => (
		<App>
			<App.Header>
				<Logo href="/">
					<Plant weight="fill" />
					Digiplant
				</Logo>
				<Button>
					<Bell />
				</Button>
				<Button aria-label="Meny" popoverTarget="menu">
					<Avatar data-size="xs" />
				</Button>
				<Popover as="menu" popover="auto" id="menu">
					<li>
						<Button href="/">
							<User />
							Profil
						</Button>
					</li>
					<li>
						<Button href="/">
							<Gear />
							Innstillinger
						</Button>
					</li>
					<li>
						<Button href="/">
							<SignOut />
							Logg ut
						</Button>
					</li>
				</Popover>
			</App.Header>
			<App.Nav>
				<Button data-command="toggle-app-expanded" data-tooltip="Navigasjon" />
				<App.Sticky as="menu">
					<li>
						<Button href="/" aria-current="page" data-tooltip="Søknader">
							<Signature />
						</Button>
					</li>
					<li>
						<Button href="/" data-tooltip="Behandling">
							<ListChecks />
						</Button>
					</li>
					<li>
						<Button href="/" data-tooltip="Søk">
							<MagnifyingGlass />
						</Button>
					</li>
				</App.Sticky>
			</App.Nav>
			<App.Main>
				<Card>{Image}</Card>
			</App.Main>
			<App.Footer style={{ height: 300 }}>
				<Logo href="/" />
			</App.Footer>
		</App>
	),
};

export const WithFooter: Story = {
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<Plant weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<Bell />
				</button>
				<button
					type="button"
					className={styles.button}
					aria-label="Meny"
					popoverTarget="menu"
				>
					<span className={styles.avatar} data-size="xs"></span>
				</button>
				<menu className={styles.popover} popover="auto" id="menu">
					<li>
						<a className={styles.button} href="/">
							<User />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<Gear />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOut />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<nav>
				<button
					type="button"
					className={styles.button}
					data-command="toggle-app-expanded"
					data-tooltip="Navigasjon"
				></button>
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<Signature />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecks />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlass />
						</a>
					</li>
				</menu>
			</nav>
			<main>
				<div className={styles.card}>{Image}</div>
			</main>
			<footer style={{ height: 300 }}>
				<a href="/" className={styles.logo}></a>
			</footer>
		</div>
	),
};

export const WithAside: Story = {
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<Plant weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<Bell />
				</button>
				<button
					type="button"
					className={styles.button}
					aria-label="Meny"
					popoverTarget="menu"
				>
					<span className={styles.avatar} data-size="xs"></span>
				</button>
				<menu className={styles.popover} popover="auto" id="menu">
					<li>
						<a className={styles.button} href="/">
							<User />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<Gear />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOut />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<nav>
				<button
					type="button"
					className={styles.button}
					data-command="toggle-app-expanded"
					data-tooltip="Navigasjon"
				></button>
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<Signature />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecks />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlass />
						</a>
					</li>
				</menu>
			</nav>
			<main>
				<div className={styles.card}>{Image}</div>
			</main>
			<aside>
				<form className={styles.grid}>
					<h2 className={styles.heading} data-size="xs">
						Right side content
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
		</div>
	),
};

export const WithComplexContent: Story = {
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<Plant weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<Bell />
				</button>
				<button
					type="button"
					className={styles.button}
					aria-label="Meny"
					popoverTarget="menu"
				>
					<span className={styles.avatar} data-size="xs"></span>
				</button>
				<menu className={styles.popover} popover="auto" id="menu">
					<li>
						<a className={styles.button} href="/">
							<User />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<Gear />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOut />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<nav>
				<button
					type="button"
					className={styles.button}
					data-command="toggle-app-expanded"
					data-tooltip="Navigasjon"
				></button>
				<div className={styles.sticky}>
					<div className={styles.prose}>
						<h2
							className={styles.heading}
							data-app-expanded="true"
							data-size="2xs"
						>
							Navigasjon
						</h2>
						<menu>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søknader">
									<Signature />
								</a>
								{/* <menu>
									<li>
										<a
											className={styles.button}
											href="/"
											data-tooltip="Inboks"
											aria-current="page"
										>
											<TrayArrowDown />
										</a>
									</li>
									<li>
										<a className={styles.button} href="/" data-tooltip="Sendt">
											<PaperPlane />
										</a>
									</li>
								</menu> */}
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Behandling">
									<ListChecks />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søk">
									<MagnifyingGlass />
								</a>
							</li>
						</menu>
						<hr className={styles.divider} />
						<h2
							className={styles.heading}
							data-size="2xs"
							data-app-expanded="true"
						>
							Rapporter
						</h2>
						<menu>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søknader">
									<Signature />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Behandling">
									<ListChecks />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søk">
									<MagnifyingGlass />
								</a>
							</li>
						</menu>
						<form className={styles.prose} data-app-expanded="true">
							<hr className={styles.divider} />
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
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Pistasj</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Banan</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Sitron</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Hasselnøtt</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Vanilje</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Karamell</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Bringebær</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Mango</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Krokan</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Kaffe</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Lakris</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Appelsin</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Kirsebær</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Pære</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Kanel</label>
								</div>
								<div className={styles.field}>
									<input type="checkbox" className={styles.input} />
									<label>Mint</label>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</nav>
			<main>
				<div className={styles.grid}>
					<div className={styles.card}>
						<div className={styles.grid} data-items="400">
							<div className={styles.prose}>
								<h2 className={styles.header}>Overskrift</h2>
								{Image}
							</div>
							<div className={styles.prose}>
								<h2 className={styles.header}>Overskrift</h2>
								{Image}
							</div>
						</div>
					</div>
					<div className={styles.group}>
						<div className={styles.prose}>
							<h2 className={styles.header}>Overskrift</h2>
							<p>{Lipsum}</p>
							<p>{Lipsum}</p>
							<p>{Lipsum}</p>
						</div>
					</div>
				</div>
			</main>
			<footer style={{ height: 300 }}>
				<a href="/" className={styles.logo}></a>
			</footer>
		</div>
	),
};

export const WithExternalStyle: Story = {
	tags: ["!dev"],
	render: () => (
		<div className={styles.app}>
			<style>
				{
					"menu strong { font-variant-numeric: tabular-nums; text-align: center; width: 1.25em }"
				}
			</style>
			<header data-color="main">
				<div
					className={styles.flex}
					data-align="center"
					data-justify="space-between"
					data-center="xl"
				>
					<a href="/" className={styles.logo}></a>
					<div className={styles.flex}>
						<button
							type="button"
							className={styles.button}
							data-hidden="min-md"
						>
							Språk/Language
						</button>
						<button type="button" className={styles.button}>
							<span data-hidden="min-md">Søk</span>
							<MagnifyingGlass />
						</button>
						<button
							type="button"
							className={styles.button}
							aria-label="Meny"
							popoverTarget="menu"
						>
							<span data-hidden="min-md">Meny</span>
							<List />
						</button>
						<menu className={styles.popover} popover="auto" id="menu">
							<li>
								<a className={styles.button} href="/">
									<User />
									Profil
								</a>
							</li>
							<li>
								<a className={styles.button} href="/">
									<Gear />
									Innstillinger
								</a>
							</li>
							<li>
								<a className={styles.button} href="/">
									<SignOut />
									Logg ut
								</a>
							</li>
						</menu>
					</div>
				</div>
			</header>
			<nav data-color="inverted">
				<button
					type="button"
					className={styles.button}
					data-command="toggle-app-expanded"
					data-tooltip="Innholdsfortegnelse"
				></button>
				<div className={styles.sticky}>
					<div className={styles.grid}>
						<h2
							className={styles.heading}
							data-size="2xs"
							data-app-expanded="true"
						>
							Veileder til drikkevannsforskriften
						</h2>
						<menu>
							<li>
								<a
									className={styles.button}
									href="/"
									aria-current="page"
									data-tooltip="Innledning"
								>
									<BookOpenText />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Formål">
									<strong>1</strong>
								</a>
							</li>
							<li>
								<a
									className={styles.button}
									href="/"
									data-tooltip="Virkeområde"
								>
									<strong>2</strong>
								</a>
							</li>
							<li>
								<a
									className={styles.button}
									href="/"
									data-tooltip="Definisjoner"
								>
									<strong>3</strong>
								</a>
							</li>
							<li>
								<a
									className={styles.button}
									href="/"
									data-tooltip="Forurensning"
								>
									<strong>4</strong>
								</a>
							</li>
							<li>
								<a
									className={styles.button}
									href="/"
									data-tooltip="Grenseverdier"
								>
									<strong>5</strong>
								</a>
							</li>
						</menu>
					</div>
				</div>
			</nav>
			<main>
				<div
					className={styles.grid}
					data-center="md"
					style={{ paddingBlock: "5%" }}
				>
					<div className={styles.prose}>
						<h1 className={styles.heading} data-size="2xl">
							Veileder til drikkevannsforskriften
						</h1>
						<p data-size="lg">{Lipsum.slice(0, 233)}</p>
						<h2 className={styles.heading}>Maecenas tempor</h2>
						<p>{Lipsum.slice(0, 508)}.</p>
						<h2 className={styles.heading}>Quisque in interdum nisl</h2>
						<ul>
							<li>{Lipsum.slice(0, 128)}</li>
							<li>{Lipsum.slice(0, 128)}</li>
							<li>{Lipsum.slice(0, 128)}</li>
						</ul>
						<p>{Lipsum}</p>
					</div>
				</div>
			</main>
			<footer style={{ height: 300 }}>
				<a href="/" className={styles.logo}></a>
			</footer>
		</div>
	),
};
