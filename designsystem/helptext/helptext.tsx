import clsx from "clsx";
import { forwardRef, useId } from "react";
import styles from "../styles.module.css";

export type HelpTextProps = React.ComponentPropsWithoutRef<"button">;

export const HelpText = forwardRef<HTMLButtonElement, HelpTextProps>(
	function HelpText({ className, children, ...rest }, ref) {
		const popoverId = useId();
		return (
			<>
				<button
					aria-label="Hjelptekst"
					className={clsx(styles.helptext, className)}
					popoverTarget={popoverId}
					ref={ref}
					type="button"
					{...rest}
				/>
				<div className={styles.popover} id={popoverId} popover="auto">
					{children}
				</div>
			</>
		);
	},
);
