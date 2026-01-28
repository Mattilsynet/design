import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart, Grid, Table } from "../react";

const meta = {
	title: "Designsystem/Chart",
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<div
				style={{
					maxWidth: 800,
					margin: "auto",
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const table = (
	<table>
		<thead>
			<tr>
				<th>Risikofordeling</th>
				<th>Q1</th>
				<th>Q2</th>
				<th>Q3</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>Large</th>
				<td>50</td>
				<td>20</td>
				<td>40</td>
			</tr>
			<tr>
				<th>Medium</th>
				<td>25</td>
				<td>30</td>
				<td>35</td>
			</tr>
			<tr>
				<th>Small</th>
				<td>15</td>
				<td>5</td>
				<td>100</td>
			</tr>
			<tr>
				<th>Venti</th>
				<td>35</td>
				<td>80</td>
				<td>35</td>
			</tr>
			<tr>
				<th>Grandi</th>
				<td>40</td>
				<td>30</td>
				<td>10</td>
			</tr>
		</tbody>
	</table>
);

export const Default: Story = {
	render: () => (
		<mtds-chart>
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Q1</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Large</th>
						<td>50</td>
					</tr>
					<tr>
						<th>Medium</th>
						<td>25</td>
					</tr>
					<tr>
						<th>Small</th>
						<td>15</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const React: Story = {
	render: () => (
		<Grid data-items="300">
			<Chart>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Risikofordeling</Table.Th>
							<Table.Th>Q1</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						<Table.Tr>
							<Table.Th>Large</Table.Th>
							<Table.Td>50</Table.Td>
						</Table.Tr>
						<Table.Tr>
							<Table.Th>Medium</Table.Th>
							<Table.Td>25</Table.Td>
						</Table.Tr>
						<Table.Tr>
							<Table.Th>Small</Table.Th>
							<Table.Td>15</Table.Td>
						</Table.Tr>
					</Table.Tbody>
				</Table>
			</Chart>
			<Chart
				data-variant="doughnut"
				data={[
					["Risikofordeling", "Q1"],
					["Large", 50],
					["Medium", 25],
					["Small", 15],
				]}
			/>
		</Grid>
	),
};

export const Column: Story = {
	render: () => <mtds-chart data-variant="column">{table}</mtds-chart>,
};

export const ColumnSingleDataset: Story = {
	render: () => (
		<mtds-chart data-variant="column">
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Janaur</th>
						<th>Februar</th>
						<th>Mars</th>
						<th>April</th>
						<th>Mai</th>
						<th>Juni</th>
						<th>Juli</th>
						<th>August</th>
						<th>September</th>
						<th>Oktober</th>
						<th>November</th>
						<th>Desember</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Slakt av laks</th>
						<td data-tooltip="Januar: 10">10</td>
						<td data-tooltip="Februar: 15">15</td>
						<td data-tooltip="Mars: 25">25</td>
						<td data-tooltip="April: 40">40</td>
						<td data-tooltip="Mai: 10">10</td>
						<td data-tooltip="Juni: 5">5</td>
						<td data-tooltip="Juli: 15">15</td>
						<td data-tooltip="August: 30">30</td>
						<td data-tooltip="September: 20">20</td>
						<td data-tooltip="Oktober: 25">25</td>
						<td data-tooltip="November: 35">35</td>
						<td data-tooltip="Desember: 55">55</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const ColumnStacked: Story = {
	render: () => <mtds-chart data-variant="column-stacked">{table}</mtds-chart>,
};

export const Bar: Story = {
	render: () => <mtds-chart data-variant="bar">{table}</mtds-chart>,
};

export const BarStacked: Story = {
	render: () => <mtds-chart data-variant="bar-stacked">{table}</mtds-chart>,
};

export const Line: Story = {
	render: () => (
		<mtds-chart data-variant="line">
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Q1</th>
						<th>Q2</th>
						<th>Q3</th>
						<th>Q4</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Large</th>
						<td>30</td>
						<td>40</td>
						<td>20</td>
						<td>60</td>
					</tr>
					<tr>
						<th>Medium</th>
						<td>10</td>
						<td>20</td>
						<td>40</td>
						<td>50</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const Area: Story = {
	render: () => (
		<mtds-chart data-variant="area">
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Q1</th>
						<th>Q2</th>
						<th>Q3</th>
						<th>Q4</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Large</th>
						<td>30</td>
						<td>40</td>
						<td>20</td>
						<td>60</td>
					</tr>
					<tr>
						<th>Medium</th>
						<td>10</td>
						<td>20</td>
						<td>40</td>
						<td>50</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const Doughnut: Story = {
	render: () => <mtds-chart data-variant="doughnut">{table}</mtds-chart>,
};

export const Pie: Story = {
	render: () => <mtds-chart data-variant="pie">{table}</mtds-chart>,
};

export const WithLegendDisabled: Story = {
	render: () => (
		<mtds-chart data-legend="false">
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Q1</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Large</th>
						<td data-tooltip="En">50%</td>
					</tr>
					<tr>
						<th>Medium</th>
						<td data-tooltip="To">25%</td>
					</tr>
					<tr>
						<th>Small</th>
						<td data-tooltip="Tre">15%</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const WithCustomTooltips: Story = {
	render: () => (
		<mtds-chart data-variant="doughnut">
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Q1</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Large</th>
						<td data-tooltip="En">50%</td>
					</tr>
					<tr>
						<th>Medium</th>
						<td data-tooltip="To">25%</td>
					</tr>
					<tr>
						<th>Small</th>
						<td data-tooltip="Tre">15%</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const WithDotsDisabled: Story = {
	render: () => (
		<mtds-chart data-variant="line" data-dots="false">
			<table>
				<thead>
					<tr>
						<th>Risikofordeling</th>
						<th>Q1</th>
						<th>Q2</th>
						<th>Q3</th>
						<th>Q4</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Large</th>
						<td>30</td>
						<td>40</td>
						<td>20</td>
						<td>60</td>
					</tr>
					<tr>
						<th>Medium</th>
						<td>10</td>
						<td>20</td>
						<td>40</td>
						<td>50</td>
					</tr>
				</tbody>
			</table>
		</mtds-chart>
	),
};

export const WithCustomInteractions: Story = {
	render: () => (
		<Grid>
			Trykk på pai-sykkene:
			<mtds-chart data-variant="doughnut">
				<table>
					<thead>
						<tr>
							<th>Risikofordeling</th>
							<th>Q1</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Large</th>
							<td>
								<button type="button" onClick={() => alert("Klikk på 50%")}>
									50%
								</button>
							</td>
						</tr>
						<tr>
							<th>Medium</th>
							<td>
								<button type="button" onClick={() => alert("Klikk på 25%")}>
									25%
								</button>
							</td>
						</tr>
						<tr>
							<th>Small</th>
							<td>
								<button type="button" onClick={() => alert("Klikk på 15%")}>
									15%
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</mtds-chart>
		</Grid>
	),
};

export const WithHiddenSteps: Story = {
	render: () => (
		<mtds-chart data-variant="bar" data-steps="false">
			{table}
		</mtds-chart>
	),
};

export const WithHiddeLabels: Story = {
	render: () => (
		<mtds-chart data-variant="bar" data-labels="false">
			{table}
		</mtds-chart>
	),
};
