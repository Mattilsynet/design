import type { Meta, StoryObj } from "@storybook/react";
import {
	type ColumnDef,
	type ExpandedState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { pagination } from "../";
import styles from "../styles.module.css";
import mockData from "./table.mockData";

const meta = {
	title: "Designsystem/Table",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;
type ColumnKeys = keyof (typeof mockData)[0];
type ColumnsType = {
	key: ColumnKeys;
	label: string;
	numeric?: boolean;
	expand?: React.ReactNode;
}[];
type RowType = (typeof mockData)[0] & { expand?: React.ReactNode };

const decorators: Story["decorators"] = [
	(Story) => (
		<div className={styles.grid} data-gap="md">
			<Story />
		</div>
	),
];

const mockDataSmall = mockData.slice(0, 4);
const mockExpand = mockData.slice(0, 10).map((row: RowType) => ({
	...row,
	expand: (
		<div>
			Content {row.firstName} {row.lastName}
		</div>
	),
}));

export const Default: Story = {
	decorators,
	render: () => (
		<table className={styles.table} aria-label="Example table">
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Antoni</td>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<td>Jenine</td>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<td>Leigh</td>
					<td>Klein</td>
					<td>26</td>
					<td>114</td>
				</tr>
				<tr>
					<td>Zara</td>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const DefaultTanstack: Story = {
	decorators,
	render: function Render(args) {
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			data: mockDataSmall,
			columns: [
				{ accessorKey: "firstName", header: "First name" },
				{ accessorKey: "lastName", header: "Last name" },
				{ header: "Age", accessorKey: "age" },
				{ header: "Visits", accessorKey: "visits" },
			],
		});

		return (
			<table className={styles.table} aria-label="Tanstack table" {...args}>
				<thead>
					{table.getHeaderGroups().map(({ id, headers }) => (
						<tr key={id}>
							{headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									data-numeric={isNumeric.includes(header.id)}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									data-numeric={isNumeric.includes(cell.column.id)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},
};
export const HeadingsSimple: Story = {
	decorators,
	render: (args) => {
		const columns: ColumnsType = [
			{ key: "firstName", label: "First name" },
			{ key: "lastName", label: "Last name" },
			{ key: "age", label: "Age", numeric: true },
			{ key: "visits", label: "Visits", numeric: true },
			{ key: "date", label: "Date", numeric: true },
		];

		return (
			<table className={styles.table} aria-label="Headings table" {...args}>
				<thead>
					<tr>
						<th colSpan={2}>Name</th>
						<th colSpan={3}>Stats</th>
					</tr>
					<tr>
						{columns.map(({ label, numeric }) => (
							<th key={label} data-numeric={numeric}>
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{mockDataSmall.map((row) => (
						<tr key={`${row.firstName}-${row.lastName}`}>
							{columns.map(({ key, numeric }) => (
								<td key={key} data-numeric={numeric}>
									{key === "date"
										? new Date(Number(row[key])).toLocaleDateString()
										: row[key]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},
};

export const HeadingsTanstack: Story = {
	decorators,
	render: function Render(args) {
		const isNumeric = ["age", "visits", "date"];
		const columns: ColumnDef<RowType>[] = [
			{
				header: "Name",
				columns: [
					{
						accessorKey: "firstName",
						header: "First name",
					},
					{
						accessorKey: "lastName",
						header: "Last name",
					},
				],
			},
			{
				header: "Stats",
				columns: [
					{
						header: "Age",
						accessorKey: "age",
					},
					{
						header: "Visits",
						accessorKey: "visits",
					},
					{
						header: "Date",
						accessorKey: "date",
						cell: (info) =>
							new Date(Number(info.getValue())).toLocaleDateString(),
					},
				],
			},
		];

		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			data: mockDataSmall,
			columns,
		});

		return (
			<table
				className={styles.table}
				aria-label="Headings Tanstack table"
				{...args}
			>
				<thead>
					{table.getHeaderGroups().map(({ id, headers }) => (
						<tr key={id}>
							{headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									data-numeric={isNumeric.includes(header.id)}
								>
									{header.isPlaceholder ||
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									data-numeric={isNumeric.includes(cell.column.id)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},
};

export const SortableSimple: Story = {
	decorators,
	render: function Render(args) {
		const [sort, setSort] = useState<{
			key: ColumnKeys;
			value: "none" | "ascending" | "descending";
		}>({
			key: "firstName",
			value: "none",
		});

		const updateSort = (newKey: ColumnKeys) =>
			setSort(({ key, value }) => ({
				key: newKey,
				value:
					newKey !== key || value === "none"
						? "ascending"
						: value === "ascending"
							? "descending"
							: "none",
			}));

		const columns: ColumnsType = [
			{ key: "firstName", label: "First name" },
			{ key: "lastName", label: "Last name" },
			{ key: "age", label: "Age", numeric: true },
			{ key: "visits", label: "Visits", numeric: true },
		];

		return (
			<table className={styles.table} aria-label="Sortable table" {...args}>
				<thead>
					<tr>
						{columns.map(({ key, label, numeric }) => (
							<th
								key={key}
								data-numeric={numeric}
								aria-sort={sort.key === key ? sort.value : "none"}
							>
								<button type="button" onClick={() => updateSort(key)}>
									{label}
								</button>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{mockDataSmall
						.slice() // Make a copy for mutability
						.sort((a, b) => {
							if (sort.value === "none") return 0;
							const asc = sort.value === "ascending";
							const aVal = asc ? a[sort.key] : b[sort.key];
							const bVal = asc ? b[sort.key] : a[sort.key];

							return typeof aVal === "number"
								? Number(aVal) - Number(bVal)
								: String(aVal).localeCompare(String(bVal));
						})
						.map((row) => (
							<tr key={`${row.firstName}-${row.lastName}`}>
								{columns.map(({ key, numeric }) => (
									<td key={key} data-numeric={numeric}>
										{row[key]}
									</td>
								))}
							</tr>
						))}
				</tbody>
			</table>
		);
	},
};

export const SortableTanstack: Story = {
	decorators,
	render: function Render(args) {
		const [sorting, setSorting] = useState<SortingState>([]);
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			onSortingChange: setSorting,
			state: { sorting },
			data: mockData,
			columns: [
				{ accessorKey: "firstName", header: "First name" },
				{ accessorKey: "lastName", header: "Last name" },
				{ header: "Age", accessorKey: "age" },
				{ header: "Visits", accessorKey: "visits" },
			],
		});

		const sort = {
			asc: "ascending",
			desc: "descending",
			false: "none",
		} as const;

		return (
			<table
				className={styles.table}
				aria-label="Sortable Tanstack table"
				{...args}
			>
				<thead>
					{table.getHeaderGroups().map(({ id, headers }) => (
						<tr key={id}>
							{headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									data-numeric={isNumeric.includes(header.id)}
									aria-sort={sort[`${header.column.getIsSorted()}`]}
								>
									<button
										type="button"
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</button>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									data-numeric={isNumeric.includes(cell.column.id)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},
};

export const PaginatableSimple: Story = {
	decorators,
	render: function Render(args) {
		const size = 10;
		const [page, setPage] = useState(0);
		const index = page * size;
		const columns: ColumnsType = [
			{ key: "firstName", label: "First name" },
			{ key: "lastName", label: "Last name" },
			{ key: "age", label: "Age", numeric: true },
			{ key: "visits", label: "Visits", numeric: true },
		];

		const { pages, next, prev } = pagination({
			current: page + 1,
			total: Math.ceil(mockData.length / size),
			show: 7,
		});

		return (
			<>
				<table
					className={styles.table}
					aria-label="Paginatable table"
					{...args}
				>
					<thead>
						<tr>
							{columns.map(({ label, numeric }) => (
								<th key={label} data-numeric={numeric}>
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{mockData.slice(index, index + size).map((row) => (
							<tr key={`${row.firstName}-${row.lastName}`}>
								{columns.map(({ key, numeric }) => (
									<td key={key} data-numeric={numeric}>
										{row[key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<nav className={styles.pagination} data-size="sm">
					<ul>
						<li>
							<button
								disabled={!prev}
								className={styles.button}
								type="button"
								onClick={() => setPage(prev - 1)}
							>
								Forrige
							</button>
						</li>
						{pages.map(({ current, key, page }) => (
							<li key={key}>
								{!!page && (
									<button
										aria-current={current}
										className={styles.button}
										type="button"
										onClick={() => setPage(page - 1)}
									>
										{page}
									</button>
								)}
							</li>
						))}
						<li>
							<button
								disabled={!next}
								className={styles.button}
								type="button"
								onClick={() => setPage(next - 1)}
							>
								Neste
							</button>
						</li>
					</ul>
				</nav>
			</>
		);
	},
};

export const PaginatableTanstack: Story = {
	decorators,
	render: function Render(args) {
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			data: mockData,
			columns: [
				{ accessorKey: "firstName", header: "First name" },
				{ accessorKey: "lastName", header: "Last name" },
				{ header: "Age", accessorKey: "age" },
				{ header: "Visits", accessorKey: "visits" },
			],
		});

		return (
			<>
				<table
					className={styles.table}
					aria-label="Paginatable Tanstack table"
					{...args}
				>
					<thead>
						{table.getHeaderGroups().map(({ id, headers }) => (
							<tr key={id}>
								{headers.map((header) => (
									<th
										key={header.id}
										colSpan={header.colSpan}
										data-numeric={isNumeric.includes(header.id)}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										data-numeric={isNumeric.includes(cell.column.id)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<nav
					data-size="sm"
					aria-label="Sidenavigering"
					className={styles.pagination}
				>
					<ul>
						<li>
							<button
								type="button"
								className={styles.button}
								aria-disabled="true"
							></button>
						</li>
						<li>
							<button
								type="button"
								className={styles.button}
								aria-current="page"
							>
								1
							</button>
						</li>
						<li>
							<button type="button" className={styles.button}>
								2
							</button>
						</li>
						<li>
							<button type="button" className={styles.button}>
								3
							</button>
						</li>
					</ul>
				</nav>
			</>
		);
	},
};

export const SearchableSimple: Story = {
	decorators,
	render: function Render(args) {
		const [search, setSearch] = useState("");
		const columns: ColumnsType = [
			{ key: "firstName", label: "First name" },
			{ key: "lastName", label: "Last name" },
			{ key: "age", label: "Age", numeric: true },
			{ key: "visits", label: "Visits", numeric: true },
		];
		const filtered = mockData.filter((row) => {
			const text = Object.values(row).join(" ");
			return text.toLowerCase().includes(search.toLowerCase());
		});

		return (
			<>
				<div className={styles.field}>
					<label>Search</label>
					<input
						className={styles.input}
						type="search"
						onChange={({ target }) => setSearch(target.value)}
						value={search}
					/>
				</div>
				<table
					className={styles.table}
					aria-label="Searchable table"
					data-fixed
					{...args}
				>
					<thead>
						<tr>
							{columns.map(({ label, numeric }) => (
								<th key={label} data-numeric={numeric}>
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filtered.map((row) => (
							<tr key={`${row.firstName}-${row.lastName}`}>
								{columns.map(({ key, numeric }) => (
									<td key={key} data-numeric={numeric}>
										{row[key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	},
};

export const SearchableTanstack: Story = {
	decorators,
	render: function Render(args) {
		const [search, setSearch] = useState("");
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			onGlobalFilterChange: setSearch,
			data: mockData,
			state: { globalFilter: search },
			columns: [
				{ accessorKey: "firstName", header: "First name" },
				{ accessorKey: "lastName", header: "Last name" },
				{ header: "Age", accessorKey: "age" },
				{ header: "Visits", accessorKey: "visits" },
			],
		});

		return (
			<>
				<div className={styles.field}>
					<label>Search</label>
					<input
						className={styles.input}
						type="search"
						onChange={({ target }) => setSearch(target.value)}
						value={search}
					/>
				</div>
				<table
					className={styles.table}
					aria-label="Searchable Tanstack table"
					data-fixed
					{...args}
				>
					<thead>
						{table.getHeaderGroups().map(({ id, headers }) => (
							<tr key={id}>
								{headers.map((header) => (
									<th
										key={header.id}
										colSpan={header.colSpan}
										data-numeric={isNumeric.includes(header.id)}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										data-numeric={isNumeric.includes(cell.column.id)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	},
};

export const ExpandableSimple: Story = {
	decorators,
	render: function Render(args) {
		const columns: ColumnsType = [
			{ key: "firstName", label: "First name" },
			{ key: "lastName", label: "Last name" },
			{ key: "age", label: "Age", numeric: true },
			{ key: "visits", label: "Visits", numeric: true },
		];

		return (
			<table className={styles.table} aria-label="Expandable table" {...args}>
				<thead>
					<tr>
						{columns.map(({ label, numeric }) => (
							<th key={label} data-numeric={numeric}>
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{mockExpand.map(function Row(row) {
						const [expanded, setExpanded] = useState(false);

						return (
							<Fragment key={`${row.firstName}-${row.lastName}`}>
								<tr>
									{columns.map(({ key, numeric }, cellIndex) => (
										<td key={key} data-numeric={numeric}>
											{cellIndex === 0 ? (
												<button
													aria-expanded={expanded}
													onClick={() => setExpanded(!expanded)}
													type="button"
												>
													{row[key]}
												</button>
											) : (
												row[key]
											)}
										</td>
									))}
								</tr>
								<tr>
									<td colSpan={columns.length}>{row.expand}</td>
								</tr>
							</Fragment>
						);
					})}
				</tbody>
			</table>
		);
	},
};

export const ExpandableTanstack: Story = {
	decorators,
	render: function Render(args) {
		const [expanded, setExpanded] = useState<ExpandedState>({});
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			onExpandedChange: setExpanded,
			state: { expanded },
			data: mockExpand,
			columns: [
				{ accessorKey: "firstName", header: "First name" },
				{ accessorKey: "lastName", header: "Last name" },
				{ header: "Age", accessorKey: "age" },
				{ header: "Visits", accessorKey: "visits" },
			],
		});

		return (
			<table
				className={styles.table}
				aria-label="Expandable Tanstack table"
				{...args}
			>
				<thead>
					{table.getHeaderGroups().map(({ id, headers }) => (
						<tr key={id}>
							{headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									data-numeric={isNumeric.includes(header.id)}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<Fragment key={row.id}>
							<tr>
								{row.getVisibleCells().map((cell, cellIndex) => (
									<td
										key={cell.id}
										data-numeric={isNumeric.includes(cell.column.id)}
									>
										{cellIndex === 0 ? (
											<button
												aria-expanded={row.getIsExpanded()}
												onClick={() => row.toggleExpanded()}
												type="button"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</button>
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</td>
								))}
							</tr>
							<tr hidden={!row.getIsExpanded()}>
								<td colSpan={row.getVisibleCells().length}>
									{row.original.expand}
								</td>
							</tr>
						</Fragment>
					))}
				</tbody>
			</table>
		);
	},
};

export const CheckableSimple: Story = {
	decorators,
	render: function Render(args) {
		const columns: ColumnsType = [
			{ key: "firstName", label: "First name" },
			{ key: "lastName", label: "Last name" },
			{ key: "age", label: "Age", numeric: true },
			{ key: "visits", label: "Visits", numeric: true },
		];

		return (
			<table className={styles.table} aria-label="Checkable table" {...args}>
				<thead>
					<tr>
						{columns.map(({ label, numeric }) => (
							<th key={label} data-numeric={numeric}>
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{mockDataSmall.map((row) => (
						<tr key={`${row.firstName}-${row.lastName}`}>
							{columns.map(({ key, numeric }, cellIndex) => (
								<td key={key} data-numeric={numeric}>
									{cellIndex ? (
										row[key]
									) : (
										<div className={styles.field}>
											<input className={styles.input} type="checkbox" />
											<label>{row[key]}</label>
										</div>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},
};

export const CheckableTanstack: Story = {
	decorators,
	render: function Render(args) {
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			data: mockData,
			columns: [
				{ accessorKey: "firstName", header: "First name" },
				{ accessorKey: "lastName", header: "Last name" },
				{ header: "Age", accessorKey: "age", meta: { numeric: true } },
				{ header: "Visits", accessorKey: "visits", meta: { numeric: true } },
			],
		});

		return (
			<table
				className={styles.table}
				aria-label="Checkable Tanstack table"
				{...args}
			>
				<thead>
					{table.getHeaderGroups().map(({ id, headers }) => (
						<tr key={id}>
							{headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									data-numeric={isNumeric.includes(header.id)}
								>
									{header.isPlaceholder ||
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell, index) => (
								<td
									key={cell.id}
									data-numeric={isNumeric.includes(cell.column.id)}
								>
									{index ? (
										flexRender(cell.column.columnDef.cell, cell.getContext())
									) : (
										<div className={styles.field}>
											<input
												className={styles.input}
												type="checkbox"
												checked={row.getIsSelected()}
												onChange={row.getToggleSelectedHandler()}
											/>
											<label>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</label>
										</div>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},
};

export const WithHorizontalTitles: Story = {
	decorators,
	render: () => (
		<table className={styles.table} aria-label="Table with horizontal titles">
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Antoni</th>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<th scope="row">Jenine</th>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<th scope="row">Leigh</th>
					<td>Klein</td>
					<td>26</td>
					<td>114</td>
				</tr>
				<tr>
					<th scope="row">Zara</th>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const FixedWidths: Story = {
	decorators,
	render: () => (
		<table
			className={styles.table}
			data-fixed
			aria-label="Table with fixed widths"
		>
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Antoni</td>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<td>Jenine</td>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<td>Leigh</td>
					<td>Klein</td>
					<td>26</td>
					<td>114</td>
				</tr>
				<tr>
					<td>Zara</td>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const Align: Story = {
	decorators,
	render: () => (
		<div className={styles.grid}>
			<code>data-align="start":</code>
			<table
				className={styles.table}
				data-align="start"
				aria-label="Table with align start"
			>
				<tbody>
					<tr>
						<th data-nowrap>Reference number</th>
						<td>1</td>
					</tr>
					<tr>
						<th>Description</th>
						<td>
							A preliminary version.
							<br />
							An application for a certificate has been initiated.
						</td>
					</tr>
					<tr>
						<th>Template</th>
						<td>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
							enim ut ex posuere suscipit id eu justo. Cras vehicula ornare
							efficitur. Etiam commodo est velit, eget mattis felis sollicitudin
							sit amet. Etiam non dui fermentum, malesuada augue in, elementum
							felis.
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<code>data-align="center":</code>
			<table
				className={styles.table}
				data-align="center"
				aria-label="Table with align start"
			>
				<tbody>
					<tr>
						<th data-nowrap>Reference number</th>
						<td>1</td>
					</tr>
					<tr>
						<th>Description</th>
						<td>
							A preliminary version.
							<br />
							An application for a certificate has been initiated.
						</td>
					</tr>
					<tr>
						<th>Template</th>
						<td>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
							enim ut ex posuere suscipit id eu justo. Cras vehicula ornare
							efficitur. Etiam commodo est velit, eget mattis felis sollicitudin
							sit amet. Etiam non dui fermentum, malesuada augue in, elementum
							felis.
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	),
};

export const NumericValues: Story = {
	decorators,
	render: () => (
		<table className={styles.table} aria-label="Table with numeric values">
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th data-numeric>Age</th>
					<th data-numeric>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Antoni</td>
					<td>Foyston</td>
					<td data-numeric>74</td>
					<td data-numeric>128</td>
				</tr>
				<tr>
					<td>Jenine</td>
					<td>Healey</td>
					<td data-numeric>22</td>
					<td data-numeric>194</td>
				</tr>
				<tr>
					<td>Leigh</td>
					<td>Klein</td>
					<td data-numeric>26</td>
					<td data-numeric>114</td>
				</tr>
				<tr>
					<td>Zara</td>
					<td>Greenrodd</td>
					<td data-numeric>28</td>
					<td data-numeric>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const WithFooter: Story = {
	decorators,
	render: () => (
		<table className={styles.table} aria-label="Table with footer">
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Antoni</td>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<td>Jenine</td>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<td>Leigh</td>
					<td>Klein</td>
					<td>26</td>
					<td>114</td>
				</tr>
				<tr>
					<td>Zara</td>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</tfoot>
		</table>
	),
};

export const Sizes: Story = {
	decorators,
	render: () => (
		<table data-size="sm" className={styles.table} aria-label="Small table">
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Antoni</td>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<td>Jenine</td>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<td>Leigh</td>
					<td>Klein</td>
					<td>26</td>
					<td>114</td>
				</tr>
				<tr>
					<td>Zara</td>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const Checkbox: Story = {
	decorators,
	render: () => (
		<table className={styles.table} aria-label="Small table">
			<thead>
				<tr>
					<th>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>First name</label>
						</div>
					</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Antoni</label>
						</div>
					</td>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<td>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Jenine</label>
						</div>
					</td>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<td>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Leigh</label>
						</div>
					</td>
					<td>Klein</td>
					<td>26</td>
					<td>114</td>
				</tr>
				<tr>
					<td>
						<div className={styles.field}>
							<input type="checkbox" className={styles.input} />
							<label>Zara</label>
						</div>
					</td>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const MobileScroll: Story = {
	decorators,
	parameters: {
		viewport: {
			defaultViewport: "mobile2", // Large mobile default viewport
		},
	},
	render: () => (
		<figure>
			<table
				className={styles.table}
				aria-label="Mobile scrollable table"
				data-nowrap
			>
				<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>Description</th>
						<th>Age</th>
						<th>Visits</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Antoni</td>
						<td>Foyston</td>
						<td>Lorem ipsum dolor sit amet consectetur.</td>
						<td>74</td>
						<td>128</td>
					</tr>
					<tr>
						<td>Jenine</td>
						<td>Healey</td>
						<td>Lorem ipsum dolor sit amet consectetur.</td>
						<td>22</td>
						<td>194</td>
					</tr>
					<tr>
						<td>Leigh</td>
						<td>Klein</td>
						<td>Lorem ipsum dolor sit amet consectetur.</td>
						<td>26</td>
						<td>114</td>
					</tr>
					<tr>
						<td>Zara</td>
						<td>Greenrodd</td>
						<td>Lorem ipsum dolor sit amet consectetur.</td>
						<td>28</td>
						<td>36</td>
					</tr>
				</tbody>
			</table>
		</figure>
	),
};

export const MobileDivided: Story = {
	decorators,
	parameters: {
		viewport: {
			defaultViewport: "mobile2", // Large mobile default viewport
		},
	},
	render: () => (
		<table
			className={styles.table}
			data-mobile="divided"
			aria-label="Mobile divided table"
		>
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Antoni</th>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<th>Jenine</th>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<th>Leigh</th>
					<td>Klein</td>
					<td>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis
						quam, pulvinar et lacus et, molestie semper ante.
					</td>
					<td>114</td>
				</tr>
				<tr>
					<th>Zara</th>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const MobileSpaced: Story = {
	decorators,
	parameters: {
		viewport: {
			defaultViewport: "mobile2", // Large mobile default viewport
		},
	},
	render: () => (
		<table
			className={styles.table}
			data-mobile="spaced"
			aria-label="Mobile spaced table"
		>
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Antoni</th>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<th>Jenine</th>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<th>Leigh</th>
					<td>Klein</td>
					<td>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis
						quam, pulvinar et lacus et, molestie semper ante.
					</td>
					<td>114</td>
				</tr>
				<tr>
					<th>Zara</th>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};

export const MobileStacked: Story = {
	decorators,
	parameters: {
		viewport: {
			defaultViewport: "mobile2", // Large mobile default viewport
		},
	},
	render: () => (
		<table
			className={styles.table}
			data-mobile="stacked"
			aria-label="Mobile stacked table"
		>
			<thead>
				<tr>
					<th>First name</th>
					<th>Last name</th>
					<th>Age</th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Antoni</th>
					<td>Foyston</td>
					<td>74</td>
					<td>128</td>
				</tr>
				<tr>
					<th>Jenine</th>
					<td>Healey</td>
					<td>22</td>
					<td>194</td>
				</tr>
				<tr>
					<th>Leigh</th>
					<td>Klein</td>
					<td>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis
						quam, pulvinar et lacus et, molestie semper ante.
					</td>
					<td>114</td>
				</tr>
				<tr>
					<th>Zara</th>
					<td>Greenrodd</td>
					<td>28</td>
					<td>36</td>
				</tr>
			</tbody>
		</table>
	),
};
