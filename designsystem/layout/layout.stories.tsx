import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import styles from "../styles.module.css";

const meta = {
	title: "Designsystem/Layout",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const decorators = [
	(Story: StoryFn) => (
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
		<div className={styles.grid} data-gap="8">
			<div className={styles.grid} data-grid="fit-lg">
				<div>Child 1</div>
				<div>Child 2</div>
			</div>
			<div className={styles.grid} data-grid="sidebar" data-gap="8">
				<div>
					Sidebar
					<div className={styles.grid} data-grid="fit-sm" data-gap="0">
						<div>Child 1</div>
						<div>Child 2</div>
					</div>
				</div>
				<div className={styles.grid} data-grid="2" data-gap="3">
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

export const Box: Story = {
	decorators,
	render: () => (
		<div className={styles.box} data-color="lys-furu">
			Content
		</div>
	),
};

export const Gap: Story = {
	decorators,
	render: () => (
		<section className={styles.grid} data-grid="sidebar">
			<code>data-gap="0 | none | false"</code>
			<div className={styles.flex} data-gap="0">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="1"</code>
			<div className={styles.flex} data-gap="1">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="2"</code>
			<div className={styles.flex} data-gap="2">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="3"</code>
			<div className={styles.flex} data-gap="3">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="4"</code>
			<div className={styles.flex} data-gap="4">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="5"</code>
			<div className={styles.flex} data-gap="5">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="6"</code>
			<div className={styles.flex} data-gap="6">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="7"</code>
			<div className={styles.flex} data-gap="7">
				<b>1</b>
				<b>2</b>
				<b>3</b>
				<b>4</b>
			</div>
			<code>data-gap="8"</code>
			<div className={styles.flex} data-gap="8">
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
			data-gap="8"
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
			data-gap="8"
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
		<section className={styles.grid} data-grid="lg" data-gap="8">
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
