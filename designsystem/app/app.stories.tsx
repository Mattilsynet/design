import {
	BellIcon,
	GearIcon,
	ListChecksIcon,
	MagnifyingGlassIcon,
	PlantIcon,
	SignatureIcon,
	SignOutIcon,
	UserIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { toggleAppExpanded } from "..";
import { App, Avatar, Button, Card, Logo, Popover } from "../react";
import styles from "../styles.module.css";

const Lipsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit orci, sagittis sodales viverra id, malesuada quis lacus. Nunc ac vulputate enim, et feugiat lorem. Suspendisse metus est, semper in tempor ut, ornare nec sapien. Maecenas dictum sodales leo, ut ultrices ex. Quisque in interdum nisl. Fusce non est finibus, imperdiet diam quis, sodales tellus. Maecenas vitae scelerisque ipsum. Maecenas tempor leo orci, a lacinia leo interdum et. Maecenas dictum tortor ut nisi mollis, ac lobortis metus congue. Aliquam pharetra leo at nulla molestie sagittis. Aenean condimentum viverra blandit. Phasellus placerat imperdiet felis, vel mollis ante maximus at. Nam pretium mattis augue, quis vehicula nisl facilisis in. Fusce in dolor et enim sollicitudin lobortis. Etiam tincidunt eleifend felis, sed faucibus ligula iaculis at. Fusce a venenatis nunc.";
const Image = (
	<img
		style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
		src="/docs/bilder/gaard-sau-inspeksjon-ute-1.jpg"
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
						"body:not(:has(.sbdocs-content)) { background: var(--ds-color-background-default) } img { display: block }"
					}
				</style>
				<Story />
			</>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const mobileDecorators: StoryObj["decorators"] = [
	(Story) => {
		useEffect(() => {
			if (document.querySelector(".sbdocs-wrapper")) return; // Do not shrink in docs mode
			const el = window.frameElement as HTMLElement;
			const iframe = el?.nodeName === "IFRAME" ? el : undefined;
			if (iframe) iframe.style.maxWidth = "400px";
			return () => iframe?.removeAttribute("style");
		}, []);

		return <Story />;
	},
];

export const Default: Story = {
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<PlantIcon weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<BellIcon />
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
							<UserIcon />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<GearIcon />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOutIcon />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<button
				type="button"
				className={styles.button}
				command="show-modal"
				commandfor="mtds-sidebar"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			<dialog role="navigation" id="mtds-sidebar">
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<SignatureIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecksIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlassIcon />
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
					<PlantIcon weight="fill" />
					Digiplant
				</Logo>
				<Button>
					<BellIcon />
				</Button>
				<Button aria-label="Meny" popoverTarget="menu">
					<Avatar data-size="xs" />
				</Button>
				<Popover as="menu" popover="auto" id="menu">
					<li>
						<Button href="/">
							<UserIcon />
							Profil
						</Button>
					</li>
					<li>
						<Button href="/">
							<GearIcon />
							Innstillinger
						</Button>
					</li>
					<li>
						<Button href="/">
							<SignOutIcon />
							Logg ut
						</Button>
					</li>
				</Popover>
			</App.Header>
			<App.Toggle />
			<App.Sidebar>
				<App.Sticky as="menu">
					<li>
						<Button href="/" aria-current="page" data-tooltip="Søknader">
							<SignatureIcon />
						</Button>
					</li>
					<li>
						<Button href="/" data-tooltip="Behandling">
							<ListChecksIcon />
						</Button>
					</li>
					<li>
						<Button href="/" data-tooltip="Søk">
							<MagnifyingGlassIcon />
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
					<PlantIcon weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<BellIcon />
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
							<UserIcon />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<GearIcon />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOutIcon />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<button
				type="button"
				className={styles.button}
				command="show-modal"
				commandfor="mtds-sidebar"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			<dialog role="navigation" id="mtds-sidebar">
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<SignatureIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecksIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlassIcon />
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
					<PlantIcon weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<span className={styles.badge} data-badge="" data-color="danger">
						<BellIcon />
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
							<UserIcon />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<GearIcon />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOutIcon />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<button
				type="button"
				className={styles.button}
				command="show-modal"
				commandfor="mtds-sidebar"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			<dialog role="navigation" id="mtds-sidebar">
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
										<SignatureIcon />
									</span>
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Behandling">
									<ListChecksIcon />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søk">
									<MagnifyingGlassIcon />
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
									<SignatureIcon />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Behandling">
									<ListChecksIcon />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søk">
									<MagnifyingGlassIcon />
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
					<PlantIcon weight="fill" />
					Digiplant
				</a>
			</header>
			<button
				type="button"
				className={styles.button}
				command="show-modal"
				commandfor="mtds-sidebar"
				data-app-expanded="mobile"
				data-tooltip="Meny"
			></button>
			<dialog role="navigation" id="mtds-sidebar">
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<SignatureIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecksIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlassIcon />
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

export const WithMobileBar: Story = {
	decorators: mobileDecorators,
	render: () => (
		<div className={styles.app} data-variant="mobilebar">
			<header>
				<a href="/" className={styles.logo}>
					<PlantIcon weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<BellIcon />
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
							<UserIcon />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<GearIcon />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOutIcon />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<button
				type="button"
				className={styles.button}
				command="show-modal"
				commandfor="mtds-sidebar"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</button>
			{/* <dialog role="navigation" id="mtds-sidebar">
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<SignatureIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecksIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlassIcon />
						</a>
					</li>
				</menu>
			</dialog> */}
			<dialog role="navigation" id="mtds-sidebar">
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
										<SignatureIcon />
									</span>
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Behandling">
									<ListChecksIcon />
								</a>
							</li>
							<li>
								<a className={styles.button} href="/" data-tooltip="Søk">
									<MagnifyingGlassIcon />
								</a>
							</li>
						</menu>
						<hr className={styles.divider} />
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
				<div className={styles.card}>{Image}</div>
			</main>
			<footer style={{ height: 300 }} hidden>
				<a href="/" className={styles.logo}></a>
			</footer>
		</div>
	),
};

// Used to test deprecated data-command="toggle-app-expanded"
export const DeprecatedDefault: Story = {
	tags: ["!dev"],
	render: () => (
		<div className={styles.app}>
			<header>
				<a href="/" className={styles.logo}>
					<PlantIcon weight="fill" />
					Digiplant
				</a>
				<button type="button" className={styles.button}>
					<BellIcon />
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
							<UserIcon />
							Profil
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<GearIcon />
							Innstillinger
						</a>
					</li>
					<li>
						<a className={styles.button} href="/">
							<SignOutIcon />
							Logg ut
						</a>
					</li>
				</menu>
			</header>
			<Button
				type="button"
				className={styles.button}
				data-command="toggle-app-expanded"
				data-tooltip="Vis meny"
			>
				Skjul meny
			</Button>
			<dialog role="navigation">
				<menu className={styles.sticky}>
					<li>
						<a
							className={styles.button}
							href="/"
							aria-current="page"
							data-tooltip="Søknader"
						>
							<SignatureIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Behandling">
							<ListChecksIcon />
						</a>
					</li>
					<li>
						<a className={styles.button} href="/" data-tooltip="Søk">
							<MagnifyingGlassIcon />
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
