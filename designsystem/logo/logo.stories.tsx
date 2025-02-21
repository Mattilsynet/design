import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Logo",
	decorators: [
		(Story) => (
			<div className={styles.grid}>
				<Story />
				<style>{`
					.demo-resize {
						border-radius: 2px;
						box-sizing: border-box;
						max-width: max-content;
						min-width: min-content;
						outline: 1px dashed;
						outline-offset: 5px;
						overflow: hidden;
						padding-bottom: 2em;
						position: relative;
						resize: horizontal;
	
						&::after { content: "Drag to resize →"; position: absolute; right: 1em; bottom: 0; white-space: nowrap }
					}
				`}</style>
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<>
			<h1 className={styles.logo}></h1>
			<a className={styles.logo} href="/">
				Undermerke
			</a>
			<div className="demo-resize">
				<h1 className={styles.logo}>Resize&nbsp;Demo</h1>
			</div>
		</>
	),
};

export const React: Story = {
	render: () => (
		<>
			<Logo as="h1" />
			<Logo href="/">Undermerke</Logo>
			<div className="demo-resize">
				<Logo className={styles.logo}>Resize&nbsp;Demo</Logo>
			</div>
		</>
	),
};

export const Sizes: Story = {
	render: () => (
		<>
			<h1 className={styles.logo} data-size="md"></h1>
			<h1 className={styles.logo} data-size="lg"></h1>
		</>
	),
};

export const English: Story = {
	render: () => (
		<>
			<h1 lang="en" className={styles.logo}></h1>
			<h1 lang="en" className={styles.logo}>
				Sanitary certificate status
			</h1>
			<div className="demo-resize">
				<h1 lang="en" className={styles.logo}>
					Sanitary certificate status
				</h1>
			</div>
		</>
	),
};
