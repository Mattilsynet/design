import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type TagProps = React.ComponentPropsWithoutRef<"span">;

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
	{ className, ...rest },
	ref,
) {
	return <span className={clsx(styles.tag, className)} ref={ref} {...rest} />;
});
