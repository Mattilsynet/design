import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type StepsProps = React.ComponentPropsWithoutRef<"ol"> & {
	"data-direction"?: "right" | "up" | "down";
	"data-fade"?: "true" | "false" | "start" | "end";
};
export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
	{ className, ...rest }: StepsProps,
	ref,
) {
	return <ol className={clsx(styles.steps, className)} ref={ref} {...rest} />;
});
