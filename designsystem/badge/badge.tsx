import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> & {
	"data-badge"?: string | number;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
	{ className, ...rest },
	ref,
) {
	return <span className={clsx(styles.badge, className)} ref={ref} {...rest} />;
});
