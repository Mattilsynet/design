import { defineComponentContracts } from "../component-contract";

const avatarSizeParameter = {
	name: "size",
	attribute: "data-size",
	type: "enum",
	enumName: "AvatarSize",
	values: ["xs", "sm", "md", "lg"],
} as const;

export default defineComponentContracts([
	{
		name: "Avatar",
		className: "avatar",
		tag: "span",
		content: true,
		parameters: [avatarSizeParameter],
	},
	{
		name: "AvatarLink",
		className: "avatar",
		tag: "a",
		content: true,
		parameters: [
			{
				name: "href",
				attribute: "href",
				type: "string",
				required: true,
			},
			avatarSizeParameter,
		],
	},
	{
		name: "AvatarButton",
		className: "avatar",
		tag: "button",
		content: true,
		defaultAttributes: {
			type: "button",
		},
		parameters: [avatarSizeParameter],
	},
] as const);
