import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type FieldProps = React.ComponentPropsWithoutRef<"div">;

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
	{ className, ...rest },
	ref,
) {
	return <div className={clsx(styles.field, className)} ref={ref} {...rest} />;
});
