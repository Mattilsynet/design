export type ComponentParameterType = "string" | "boolean" | "enum";

export type ComponentAttributeMap = Readonly<Record<string, string>>;

type ComponentParameterBase = Readonly<{
	name?: string;
	attribute: string;
}>;

export type StringComponentParameter = ComponentParameterBase &
	Readonly<{
		type?: "string";
		required?: boolean;
		default?: string;
		enumName?: never;
		values?: never;
	}>;

export type BooleanComponentParameter = ComponentParameterBase &
	Readonly<{
		type: "boolean";
		required?: never;
		default?: never;
		enumName?: never;
		values?: never;
	}>;

export type EnumComponentParameter = ComponentParameterBase &
	Readonly<{
		type: "enum";
		enumName: string;
		values: readonly string[];
		required?: boolean;
		default?: never;
	}>;

export type ComponentParameter =
	| StringComponentParameter
	| BooleanComponentParameter
	| EnumComponentParameter;

export type ComponentContract = Readonly<{
	name: string;
	className: string;
	tag: string;
	content?: boolean;
	fixedAttributes?: ComponentAttributeMap;
	defaultAttributes?: ComponentAttributeMap;
	parameters?: readonly ComponentParameter[];
}>;

export function defineComponentContract<const Contract extends ComponentContract>(
	contract: Contract,
): Contract {
	return contract;
}

export function defineComponentContracts<
	const Contracts extends readonly ComponentContract[],
>(contracts: Contracts): Contracts {
	return contracts;
}
