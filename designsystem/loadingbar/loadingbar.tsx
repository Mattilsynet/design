import clsx from "clsx";
import { forwardRef } from "react";
import styles from "../styles.module.css";

export type LoadingBarProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  children?: string;
};

export const LoadingBar = forwardRef<HTMLSpanElement, LoadingBarProps>(
  function LoadingBar({ className, children, ...rest }, ref) {
    return (
      <span
        className={clsx(styles.loadingbar, className)}
        ref={ref}
        aria-label={typeof children === "string" ? children : "Laster"}
        {...rest}
      />
    );
  },
);
