import clsx from "clsx";
import { forwardRef, type JSX } from "react";
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from "../react-types";
import styles from "../styles.module.css";

export type FileuploadProps<As extends React.ElementType = "label"> =
	PolymorphicComponentPropWithRef<As>;

type FileuploadComponent = <As extends React.ElementType = "label">(
	props: FileuploadProps<As>,
) => JSX.Element;

export const Fileupload: FileuploadComponent = forwardRef<null>(
	function Fileupload<As extends React.ElementType = "label">(
		{ as, className, ...rest }: FileuploadProps<As>,
		ref?: PolymorphicRef<As>,
	) {
		const Tag = as || "label";

		return (
			<Tag className={clsx(styles.fileupload, className)} ref={ref} {...rest} />
		);
	},
) as FileuploadComponent; // Needed to tell Typescript this does not return ReactNode but acutally JSX.Element
