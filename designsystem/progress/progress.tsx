import { forwardRef } from "react";
import styles from "../styles.module.css";
import { toCustomElementProps } from "../utils";

export type ProgressProps = React.ComponentPropsWithoutRef<"progress">;
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
	function Progress(props, ref) {
		return (
			<u-progress ref={ref} {...toCustomElementProps(props, styles.progress)} />
		);
	},
);
