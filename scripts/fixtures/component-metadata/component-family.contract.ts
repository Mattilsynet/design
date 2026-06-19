import { defineComponentContracts } from "../../../designsystem/component-contract";

export default defineComponentContracts([
	{
		name: "FixtureContract",
		className: "fixture",
		tag: "button",
		content: true,
		fixedAttributes: {
			"data-fixed": "fixed",
		},
		defaultAttributes: {
			type: "button",
		},
		parameters: [
			{
				name: "label",
				attribute: "aria-label",
				type: "string",
				required: true,
			},
			{
				name: "variant",
				attribute: "data-variant",
				type: "enum",
				enumName: "FixtureVariant",
				values: ["primary", "25", "true"],
			},
			{
				name: "selected",
				attribute: "data-selected",
				type: "boolean",
			},
		],
	},
	{
		name: "FixtureNoContent",
		className: "fixture",
		tag: "input",
		content: false,
		defaultAttributes: {
			type: "text",
		},
		parameters: [
			{
				name: "value",
				attribute: "value",
				type: "string",
				default: "fixture",
			},
		],
	},
] as const);
