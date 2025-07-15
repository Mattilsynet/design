import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	type ColumnDef,
	type ExpandedState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { Fragment, useEffect, useMemo, useState } from "react";
import { pagination } from "../";
import { Button, Field, Pagination, Table } from "../react";
import styles from "../styles.module.css";
import mockData from "./table.mockData";

const meta = {
	title: "Designsystem/Table",
	decorators: [
		(Story) => (
			<div className={styles.grid} data-gap="4">
				<Story />
			</div>
		),
	],
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

const mockDataSmall = mockData.slice(0, 4);
const mockExpand = mockData.slice(0, 10).map((row: RowType) => ({
	...row,
	expand: (
		<div>
			Content {row.firstName} {row.lastName}
		</div>
	),
}));

const mockColumns = [
	{ accessorKey: "firstName", header: "First name" },
	{ accessorKey: "lastName", header: "Last name" },
	{ header: "Age", accessorKey: "age" },
	{ header: "Visits", accessorKey: "visits" },
];

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

export const React: Story = {
	render: () => (
		<Table aria-label="Example table">
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
		</Table>
	),
};

export const DefaultTanstack: Story = {
	render: function Render(args) {
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			data: mockDataSmall,
			columns: mockColumns,
		});

		return (
			<Table aria-label="Tanstack table" {...args}>
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
									{cell.getValue() as React.ReactNode}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		);
	},
};

export const HeadingsSimple: Story = {
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
	render: function Render(args) {
		const isNumeric = ["age", "visits", "date"];
		const columns: ColumnDef<RowType>[] = useMemo(
			() => [
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
			],
			[],
		);

		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			data: mockDataSmall,
			columns,
		});

		return (
			<Table aria-label="Headings Tanstack table" {...args}>
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
									{cell.getValue() as React.ReactNode}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		);
	},
};

export const SortableSimple: Story = {
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
	render: function Render(args) {
		const [sorting, setSorting] = useState<SortingState>([]);
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			onSortingChange: setSorting,
			state: { sorting },
			data: mockData,
			columns: mockColumns,
		});

		const sort = {
			asc: "ascending",
			desc: "descending",
			false: "none",
		} as const;

		return (
			<Table aria-label="Sortable Tanstack table" {...args}>
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
									<Button onClick={header.column.getToggleSortingHandler()}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</Button>
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
									{cell.getValue() as React.ReactNode}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		);
	},
};

export const PaginatableSimple: Story = {
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
	render: function Render(args) {
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			data: mockData,
			columns: mockColumns,
		});

		const { pages, next, prev } = pagination({
			current: table.getState().pagination.pageIndex + 1,
			total: table.getPageCount(),
			show: 7,
		});

		return (
			<>
				<Table aria-label="Paginatable Tanstack table" {...args}>
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
										{cell.getValue() as React.ReactNode}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
				<Pagination data-size="sm" aria-label="Sidenavigering">
					<ul>
						<li>
							<Button
								disabled={!prev}
								onClick={() => table.setPageIndex(prev - 1)}
							>
								Forrige
							</Button>
						</li>
						{pages.map(({ current, key, page }) => (
							<li key={key}>
								{!!page && (
									<Button
										aria-current={current}
										onClick={() => table.setPageIndex(page - 1)}
									>
										{page}
									</Button>
								)}
							</li>
						))}
						<li>
							<Button
								disabled={!next}
								onClick={() => table.setPageIndex(next - 1)}
							>
								Neste
							</Button>
						</li>
					</ul>
				</Pagination>
			</>
		);
	},
};

export const SearchableSimple: Story = {
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
	render: function Render(args) {
		const [search, setSearch] = useState("");
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			onGlobalFilterChange: setSearch,
			data: mockData,
			state: { globalFilter: search },
			columns: mockColumns,
		});

		return (
			<>
				<Field
					as="input"
					type="search"
					label="Search"
					onChange={({ target }) => setSearch(target.value)}
					value={search}
				/>
				<Table aria-label="Searchable Tanstack table" data-fixed {...args}>
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
										{cell.getValue() as React.ReactNode}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</>
		);
	},
};

export const ExpandableSimple: Story = {
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
	render: function Render(args) {
		const [expanded, setExpanded] = useState<ExpandedState>({});
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			onExpandedChange: setExpanded,
			state: { expanded },
			data: mockExpand,
			columns: mockColumns,
		});

		return (
			<Table aria-label="Expandable Tanstack table" {...args}>
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
											<Button
												aria-expanded={row.getIsExpanded()}
												onClick={() => row.toggleExpanded()}
											>
												{cell.getValue() as React.ReactNode}
											</Button>
										) : (
											(cell.getValue() as React.ReactNode)
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
			</Table>
		);
	},
};

export const CheckableSimple: Story = {
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
	render: function Render(args) {
		const isNumeric = ["age", "visits"];
		const table = useReactTable({
			getCoreRowModel: getCoreRowModel(),
			data: mockData,
			columns: mockColumns,
		});

		return (
			<Table aria-label="Checkable Tanstack table" {...args}>
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
										(cell.getValue() as React.ReactNode)
									) : (
										<Field
											as="input"
											type="checkbox"
											checked={row.getIsSelected()}
											onChange={row.getToggleSelectedHandler()}
											label={cell.getValue() as React.ReactNode}
										/>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		);
	},
};

export const WithHorizontalTitles: Story = {
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

export const WithBorderAround: Story = {
	render: () => (
		<table
			className={styles.table}
			data-border="true"
			aria-label="Table with border around"
		>
			<thead>
				<tr>
					<th data-nowrap>First name</th>
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

export const WithoutBorders: Story = {
	render: () => (
		<div className={styles.grid} style={{ minWidth: 400 }}>
			<h2 className={styles.heading}>Table heading</h2>
			<table
				className={styles.table}
				data-border="false"
				aria-label="Table without borders"
			>
				<tbody>
					<tr>
						<th>Antoni Foyston</th>
						<td>74</td>
					</tr>
					<tr>
						<th>Jenine Healey</th>
						<td>22</td>
					</tr>
					<tr>
						<th>Leigh Klein</th>
						<td>14</td>
					</tr>
					<tr>
						<th>Zara Greenrodd</th>
						<td>28</td>
					</tr>
				</tbody>
			</table>
		</div>
	),
};

export const Sizes: Story = {
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
	tags: ["!dev"],
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
	decorators: mobileDecorators,
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
	decorators: mobileDecorators,
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
	decorators: mobileDecorators,
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
	decorators: mobileDecorators,
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
