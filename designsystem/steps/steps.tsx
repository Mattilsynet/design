import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type StepsProps = React.ComponentPropsWithoutRef<"ul"> & {
	"data-size"?: "sm" | "md" | "lg";
};

export const Steps = forwardRef<HTMLUListElement, StepsProps>(function Steps(
	{ className, ...rest },
	ref,
) {
	return <ul className={clsx(styles.steps, className)} ref={ref} {...rest} />;
});
