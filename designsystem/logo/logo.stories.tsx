import { Plant } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Logo",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div className={styles.body} style={{ padding: "3em" }}>
				<div className={`${styles.grid} demo-resize`} data-gap="8">
					<Story />
					<style>{`
						body:not(:has(.sbdocs-preview)) { background: var(--ds-color-background-default) }
						html:has(.sbdocs-preview)::before { display: none } /* Hide environment bar in Storybook */
						.demo-resize {
							box-sizing: border-box;
							border-radius: 2px;
							box-sizing: border-box;
							outline: 1px dashed transparent;
							outline-offset: 5px;
							overflow: hidden;
							padding: 1em 1em 2em;
							position: relative;
							resize: horizontal;
							
							&:active,
							&:hover { outline-color: currentColor }
							&:ative::after,
							&:hover::after { content: "Drag to resize →"; position: absolute; right: 1em; bottom: 0; white-space: nowrap }
						}
					`}</style>
				</div>
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <a className={styles.logo} href="https://mattilsynet.no"></a>,
};

export const React: Story = {
	render: () => (
		<>
			<Logo as="h1" />
			<Logo href="/">
				Helse
				<wbr />
				sertifikat
			</Logo>
			<Logo as="h1" />
			<Logo href="/" data-env="test">
				Helse
				<wbr />
				sertifikat
			</Logo>
			<Logo href="/" data-env="test">
				<Plant weight="fill" />
				Digiplant
			</Logo>
		</>
	),
};

export const WithEnvironment: Story = {
	render: () => <h1 className={styles.logo} data-env="test"></h1>,
};

export const WithEnvironmentBlue: Story = {
	render: () => (
		<h1 className={styles.logo} data-env="dev" data-color="info"></h1>
	),
};

export const WithSubbrand: Story = {
	render: () => (
		<a className={styles.logo} href="/">
			Helse
			<wbr />
			sertifikat
		</a>
	),
};

export const WithSubbrandEnglish: Story = {
	render: () => (
		<a className={styles.logo} href="/" lang="en">
			Sanitary certificate status
		</a>
	),
};

export const WithSubbrandEnvironment: Story = {
	render: () => (
		<a className={styles.logo} href="/" lang="en" data-env="test">
			Sanitary certificate status
		</a>
	),
};

export const WithSubbrandEnvironmentBlue: Story = {
	render: () => (
		<a
			className={styles.logo}
			href="/"
			lang="en"
			data-env="dev"
			data-color="info"
		>
			Sanitary certificate status
		</a>
	),
};

const decorators: Story["decorators"] = [
	(Story) => (
		<div style={{ "--mtds-logo-color": "#bcdcd0" } as React.CSSProperties}>
			<Story />
		</div>
	),
];

export const WithAppIcon: Story = {
	decorators,
	render: () => (
		<a className={styles.logo} href="/">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};

export const WithAppIconEnvironment: Story = {
	render: () => (
		<a className={styles.logo} href="/" data-env="test">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};
export const WithAppIconEnvironmentBlue: Story = {
	render: () => (
		<a className={styles.logo} href="/" data-env="dev" data-color="info">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};
