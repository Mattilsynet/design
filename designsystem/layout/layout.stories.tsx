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
        .mt-story { display: grid; gap: 1rem }
        .mt-story div { outline: 1px dashed color-mix(in hsl, currentcolor 50%, transparent) }
        .mt-story code {font-size: .875rem}
        .mt-story div[data-align-content] { height: 150px }
      `}</style>
		</div>
	),
];

export const Flex: Story = {
	decorators,
	render: () => (
		<div className={styles.flex}>
			<button type="button" className={styles.button}>
				Action 1
			</button>
			<button type="button" className={styles.button}>
				Action som er lengre 2
			</button>
			<button type="button" className={styles.button}>
				Action 3
			</button>
			<button type="button" className={styles.button}>
				Action 4
			</button>
			<button type="button" className={styles.button}>
				Action 5
			</button>
			<button type="button" className={styles.button}>
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
			<div className={styles.grid} data-grid="4.8" data-gap="lg">
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
		<section className={styles.grid} data-grid="4.8">
			<code>
				data-gap="none"
				<br />
				data-gap="false"
			</code>
			<div className={styles.flex} data-gap="none">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</div>
			<code>data-gap="sm"</code>
			<div className={styles.flex} data-gap="sm">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</div>
			<code>data-gap="md"</code>
			<div className={styles.flex} data-gap="md">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</div>
			<code>data-gap="lg"</code>
			<div className={styles.flex} data-gap="lg">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</div>
		</section>
	),
};

export const Center: Story = {
	decorators,
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
			data-grid="4.8"
			data-align="center"
			data-gap="lg"
		>
			<code>data-align="stretch"</code>
			<div className={styles.flex} data-align="stretch">
				<button type="button" className={styles.button} data-size="sm">
					Small
				</button>
				<button type="button" className={styles.button} data-size="md">
					Medium
				</button>
				<button type="button" className={styles.button} data-size="lg">
					Large
				</button>
			</div>
			<code>data-align="start"</code>
			<div className={styles.flex} data-align="start">
				<button type="button" className={styles.button} data-size="sm">
					Small
				</button>
				<button type="button" className={styles.button} data-size="md">
					Medium
				</button>
				<button type="button" className={styles.button} data-size="lg">
					Large
				</button>
			</div>
			<code>data-align="center"</code>
			<div className={styles.flex} data-align="center">
				<button type="button" className={styles.button} data-size="sm">
					Small
				</button>
				<button type="button" className={styles.button} data-size="md">
					Medium
				</button>
				<button type="button" className={styles.button} data-size="lg">
					Large
				</button>
			</div>
			<code>data-align="end"</code>
			<div className={styles.flex} data-align="end">
				<button type="button" className={styles.button} data-size="sm">
					Small
				</button>
				<button type="button" className={styles.button} data-size="md">
					Medium
				</button>
				<button type="button" className={styles.button} data-size="lg">
					Large
				</button>
			</div>
		</section>
	),
};

export const Justify: Story = {
	decorators,
	render: () => (
		<section
			className={styles.grid}
			data-grid="4.8"
			data-align="center"
			data-gap="lg"
		>
			<code>data-justify="start"</code>
			<div className={styles.flex} data-justify="start">
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
			</div>
			<code>data-justify="center"</code>
			<div className={styles.flex} data-justify="center">
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
			</div>
			<code>data-justify="end"</code>
			<div className={styles.flex} data-justify="end">
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
			</div>
			<code>data-justify="space-between"</code>
			<div className={styles.flex} data-justify="space-between">
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
			</div>
			<code>data-justify="space-around"</code>
			<div className={styles.flex} data-justify="space-around">
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
			</div>
			<code>data-justify="space-evenly"</code>
			<div className={styles.flex} data-justify="space-evenly">
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
				<button type="button" className={styles.button} data-size="sm">
					Knapp
				</button>
			</div>
		</section>
	),
};
export const AlignContent: Story = {
	decorators,
	render: () => (
		<section className={styles.grid} data-grid="lg" data-gap="lg">
			<article>
				<code>start</code>
				<div className={styles.flex} data-align-content="start">
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
				</div>
			</article>
			<article>
				<code>center</code>
				<div className={styles.flex} data-align-content="center">
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
				</div>
			</article>
			<article>
				<code>end</code>
				<div className={styles.flex} data-align-content="end">
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
				</div>
			</article>
			<article>
				<code>space-between</code>
				<div className={styles.flex} data-align-content="space-between">
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
				</div>
			</article>
			<article>
				<code>space-around</code>
				<div className={styles.flex} data-align-content="space-around">
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
				</div>
			</article>
			<article>
				<code>space-evenly</code>
				<div className={styles.flex} data-align-content="space-evenly">
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
					<button type="button" className={styles.button} data-size="sm">
						Knapp
					</button>
				</div>
			</article>
		</section>
	),
};
