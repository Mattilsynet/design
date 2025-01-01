import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Logo",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
		<div style={{ display: "grid", gap: ".5rem" }}>
			<Story />
			<style>{`
				.demo-resize {
					box-sizing: border-box;
					border-radius: 5px;
					margin: 1em -6px;
					padding: 5px 5px 2em;
					overflow: hidden;
					resize: horizontal;
					border: 1px dashed;
					min-width: min-content;
					max-width: max-content;
					position: relative;

					&::after { content: "Drag to resize →"; position: absolute; right: 1em; bottom: 0; white-space: nowrap }
				}
			`}</style>
		</div>
	),
];

export const Default: Story = {
	decorators,
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
