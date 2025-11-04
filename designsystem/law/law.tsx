// import type * as ReactTypes from "react";
import { forwardRef, useMemo } from "react";
import { attr, toCustomElementProps } from "../utils";
import { parseLawIds, renderLawHTML } from "./law-helper";
import "./law-helper";
import css from "./law.module.css";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			"mtds-law": LawProps;
		}
	}
}

// export type LawProps = ReactTypes.DetailedHTMLProps<
// 	ReactTypes.HTMLAttributes<MTDSLawElement>,
// 	MTDSLawElement
// > & {
// 	class?: string;
// 	html?: string;
// 	checked?: string[];
// 	onCheckedChange?: (checked: ReturnType<typeof parseLawIds>) => void;
// };

export type LawProps = React.ComponentPropsWithoutRef<"div"> & {
	// class?: string;
	html?: string;
	checked?: string[];
	onCheckedChange?: (checked: ReturnType<typeof parseLawIds>) => void;
};

export const Law = forwardRef<HTMLDivElement, LawProps>(function Law(
	{ className, checked = [], onCheckedChange, html = "", ...rest },
	ref,
) {
	const renderHTML = useMemo(() => ({ __html: renderLawHTML(html) }), [html]);

	return (
		<div
			className={css.law}
			data-checked={checked.join(",")}
			dangerouslySetInnerHTML={renderHTML}
			onClickCapture={({ target: btn, currentTarget: self }) => {
				if (!(btn instanceof HTMLButtonElement)) return;
				attr(btn, "aria-checked", `${attr(btn, "aria-checked") !== "true"}`);
				requestAnimationFrame(() => {
					// const ids = Array.from({ length: 100 }, () => btn.value);
					// const html = self.innerHTML || "";
					// console.time("parseLawIds");
					// parseLawIds(ids, html);
					// console.timeEnd("parseLawIds");

					const html = self.innerHTML || "";
					const btns = self.querySelectorAll<HTMLButtonElement>(
						"button[aria-checked='true']",
					);
					const ids = Array.from(btns || [], (btn) => btn.value);

					console.log?.(parseLawIds(ids, html));
				});
			}}
			ref={ref}
			{...toCustomElementProps({
				// onmtdslawcheckedchange: (e: CustomEvent<Checked>) =>
				// 	onCheckedChange?.(e.detail),
				...rest,
			})}
		/>
	);
});
