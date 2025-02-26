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
				<div className={`${styles.grid} demo-resize`} data-gap="xl">
					<Story />
					<style>{`
						.demo-resize {
							box-sizing: border-box;
							border-radius: 2px;
							box-sizing: border-box;
							outline: 1px dashed transparent;
							outline-offset: 5px;
							overflow: hidden;
							padding-bottom: 2em;
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
	render: () => <h1 className={styles.logo}></h1>,
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
			<Logo href="/">
				<Plant weight="fill" />
				Digiplant
			</Logo>
			<Logo href="/" data-color="orange">
				<Plant weight="fill" />
				Digiplant
				<mark>test</mark>
			</Logo>
		</>
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

export const WithAppIcon: Story = {
	render: () => (
		<a className={styles.logo} href="/">
			<Plant weight="fill" />
			Digiplant
		</a>
	),
};

export const WithAppIconOrange: Story = {
	render: () => (
		<a className={styles.logo} href="/" data-color="orange">
			<Plant weight="fill" />
			Digiplant
			<mark>test</mark>
		</a>
	),
};
export const WithAppIconBlue: Story = {
	render: () => (
		<a className={styles.logo} href="/" data-color="blue">
			<Plant weight="fill" />
			Digiplant
			<mark>dev</mark>
		</a>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<h1 className={styles.logo}></h1>
			<h1 className={styles.logo} style={{ fontSize: "2em" }}></h1>
		</>
	),
};
