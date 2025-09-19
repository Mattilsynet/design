import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart } from "./chart";

const meta = {
	title: "Designsystem/Chart",
	parameters: {
		layout: "padded",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["!dev"],
	render: () => (
		<Chart data-variant="area" style={{ width: 600 }}>
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
				</tbody>
			</table>
		</Chart>
	),
};
