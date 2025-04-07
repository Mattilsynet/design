import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type ProgressProps = React.ComponentPropsWithoutRef<"progress">;
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
	function Progress({ className, ...rest }, ref) {
		return (
			<u-progress
				class={clsx(styles.progress, className)}
				ref={ref}
				{...rest}
			/>
		);
	},
);
