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
import { toggleAppExpanded } from "..";
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
	title: "Designsystem/App",
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
					aria-label="Meny"
					className={styles.button}
					popoverTarget="menu"
					type="button"
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
			<button
				type="button"
				className={styles.button}
				data-command="toggle-app-expanded"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			<dialog role="navigation">
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
			</dialog>
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
			<Button data-command="toggle-app-expanded" data-tooltip="Vis meny">
				Skjul meny
			</Button>
			<App.Sidebar>
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
			</App.Sidebar>
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
					aria-label="Meny"
					className={styles.avatar}
					data-size="xs"
					popoverTarget="menu"
					type="button"
				></button>
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
			<button
				type="button"
				className={styles.button}
				data-command="toggle-app-expanded"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			<dialog role="navigation">
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
			</dialog>
			<main>
				<div className={styles.card}>{Image}</div>
			</main>
			<footer style={{ height: 300 }}>
				<a href="/" className={styles.logo}></a>
			</footer>
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
					<span className={styles.badge} data-badge="" data-color="danger">
						<Bell />
					</span>
				</button>
				<button
					type="button"
					className={styles.button}
					aria-label="Meny"
					popoverTarget="menu"
				>
					<span data-app-expanded="desktop">Navn Navnesen</span>
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
			<button
				type="button"
				className={styles.button}
				data-command="toggle-app-expanded"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			<dialog role="navigation">
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
								<a
									className={styles.button}
									href="/"
									data-tooltip="Søknader"
									aria-current="page"
								>
									<span className={styles.badge} data-badge="99">
										<Signature />
									</span>
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
			</dialog>
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

export const WithCustomToggle: Story = {
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<Plant weight="fill" />
					Digiplant
				</a>
			</header>
			<button
				type="button"
				className={styles.button}
				data-command="toggle-app-expanded"
				data-app-expanded="mobile"
				data-tooltip="Meny"
			></button>
			<dialog role="navigation">
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
			</dialog>
			<main>
				<div className={styles.card}>
					<menu>
						<li>
							<button
								className={styles.button}
								onClick={() => toggleAppExpanded()}
								type="button"
							>
								<div className={styles.grid} data-gap="1">
									Veksle sideområde
									<small>
										<code>toggleAppExpanded()</code>
									</small>
								</div>
							</button>
						</li>
						<li>
							<button
								className={styles.button}
								onClick={() => toggleAppExpanded(false)}
								type="button"
							>
								<div className={styles.grid} data-gap="1">
									Lukk sideområde
									<small>
										<code>toggleAppExpanded(false)</code>
									</small>
								</div>
							</button>
						</li>
						<li>
							<button
								className={styles.button}
								onClick={() => toggleAppExpanded(true)}
								type="button"
							>
								<div className={styles.grid} data-gap="1">
									Åpne sideområde
									<small>
										<code>toggleAppExpanded(true)</code>
									</small>
								</div>
							</button>
						</li>
					</menu>
				</div>
			</main>
		</div>
	),
};
