import { forwardRef } from "react";
import styles from "../styles.module.css";

export type LawProps = React.ComponentPropsWithoutRef<"div"> & {
	"data-variant"?: "view" | "readonly";
};

export const Law = forwardRef<HTMLDivElement, LawProps>(function Law(
	{ className, ...rest },
	ref,
) {
	return <div className={styles.law} ref={ref} {...rest} />;
});
