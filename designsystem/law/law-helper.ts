// NOTE: The law format is documentet in https://api.lovdata.no/xmldocs
import { attr, IS_BROWSER, MTDSElement, off, on, tag } from "../utils";
import css from "./law.css?raw";

const REGEX_ID = /<[^>]+id="([^"]+)[^>]+>/gi;
const REGEX_FORORDNING = /\([^)]{1,4}\).{1,9}\d+\/\d+/i; // Match (EU) 2016/2031, (EF) nr. 2020/1054, (EFF) ..., etc.
const REGEX_HEADING = /<(h\d|[^>]+role="heading")[^>]*>(.*?)<\/?(h\d|br|div)/i; // Can be both <h1>-<h6> and or <div> with role="heading" if level 7+
const REGEX_KAPITTEL_LEDD = /kapittel-\d+-ledd-\d+/;
const REGEX_STRIP_POINTER = /►m\d+/i;
const REGEX_STRIP_TAGS = /<[^>]+>/g;
const REGEX_META =
	/<dt([^>]*class="([^"]+)")?[^>]*>(.*?)<\/dt><dd[^>]*>(.*?)<\/dd>/gis;
const REGEX_NUMBERED =
	/(<[^>]+class="[^"]*\bnumberedLegalP\b[^>]+>\s*)(\d+\.)(.*?)(?=<\/?(ul|ol|div|article)|$)/gis;

export class MTDSLawElement extends MTDSElement {
	_observer?: MutationObserver; // Using underscore instead of # for backwards compatibility

	static get observedAttributes() {
		return ["data-checked"]; // Using ES2015 syntax for backwards compatibility
	}
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).append(
			tag("style", {}, css),
			tag("article"),
		);
	}
	connectedCallback() {
		// this._observer = new MutationObserver(() => this.handleMutation());
		// this._observer.observe(this, { childList: true });
		this.handleMutation(); // Inital setup
		on(this, "click", this);
	}
	disconnectedCallback() {
		off(this, "click", this);
		this._observer?.disconnect();
		this._observer = undefined;
	}
	attributeChangedCallback() {
		const ids = this.checked;
		this.shadowRoot?.querySelectorAll("button").forEach((btn) => {
			attr(btn, "aria-checked", `${ids.includes(btn.value)}`);
		});
	}
	handleMutation() {
		const article = this.shadowRoot?.lastElementChild;
		if (article) article.innerHTML = renderLawHTML(this.innerHTML);
		this.attributeChangedCallback(); // Set checked
	}
	handleEvent(event: Event) {
		const btn = event.composedPath()[0];
		if (btn instanceof HTMLButtonElement) {
			attr(btn, "aria-checked", `${attr(btn, "aria-checked") !== "true"}`);

			const btns = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(
				"button[aria-checked='true']",
			);
			const ids = Array.from(btns || [], (btn) => btn.value);
			const html = this.shadowRoot?.innerHTML || "";

			this.checked = ids;
			this.dispatchEvent(
				new CustomEvent("mtdslawcheckedchange", {
					detail: parseLawIds(ids, html),
					bubbles: true,
				}),
			);
		}
	}
	scrollToId(id: string) {
		this.shadowRoot?.getElementById(id)?.scrollIntoView();
	}
	get checked() {
		const checked = attr(this, "data-checked")?.split(",") || [];
		const ids = checked.map((id) => id.trim()).filter((id) => id);
		return ids;
	}
	set checked(ids: string[]) {
		attr(this, "data-checked", ids.filter(Boolean).join(","));
	}
}

if (IS_BROWSER && !window.customElements.get("mtds-law"))
	window.customElements.define("mtds-law", MTDSLawElement);

const parseLawId = (id: string, html: string) => {
	const isKapittelLedd = REGEX_KAPITTEL_LEDD.test(id);
	const path = id
		.split("-")
		.map((_, i, all) =>
			i % 2
				? parseLawIdUnit(all.slice(0, i + 1).join("-"), html, isKapittelLedd)
				: null,
		)
		.filter((unit) => !!unit);

	if (!path.length) return null;
	const url = path.filter(({ url }) => url).pop()?.url || ""; // The closest units item might not have an URL, so we provide the last found URL
	const forordninger = path.filter(
		(u) => u.className === "section" && REGEX_FORORDNING.test(u.label),
	);
	const label = path
		.slice(path.indexOf(forordninger.pop() || path[0]))
		.map((u) => u.label)
		.join(", ");

	return { ...path.slice(-1)[0], path, label, url };
};

const parseLawIdUnit = (id: string, html: string, isKapittelLedd: boolean) => {
	const index = html.lastIndexOf("<", html.indexOf(` id="${id}"`));
	const tag = html.slice(index, html.indexOf(">", index) + 1);
	const className = getAttr(tag, "class");
	const urlPath = getAttr(tag, "data-lovdata-url");
	const url = urlPath ? `https://lovdata.no/${urlPath}` : "";
	const label = getLabel(tag, id, index, html);
	const short =
		!isKapittelLedd &&
		className === "section" &&
		label?.match(REGEX_FORORDNING)?.[0];

	return { className, id, label: short || label, url };
};

export const parseLawIds = (ids: string[], lawHtml: string) => {
	const html = fixNumberedLegalP(lawHtml);
	return ids.map((id) => parseLawId(id, html)).filter((unit) => !!unit);
};

const META_DEFAULT: Record<
	"legacyId" | "title" | "titleShort" | (string & {}), // Ensure title and titleShort are always present
	{ label: string; value: string }
> = {
	legacyId: { label: "Datokode", value: "" },
	titleShort: { label: "Korttittel", value: "" },
	title: { label: "Tittel", value: "" },
};

export const parseLawMeta = (lawHtml: string) => {
	const info = lawHtml.slice(0, lawHtml.indexOf("</dl>"));
	const meta = META_DEFAULT;

	for (const [_, _1, key, label, value] of info.matchAll(REGEX_META))
		meta[key] = { label, value };

	return meta;
};

export const renderLawHTML = (lawHtml: string) => {
	const baseUrl = lawHtml.match(/<base[^>]+href="([^">]+)"[^>]*>/)?.[1] || "";
	let html = lawHtml.split(/<\/?main[^>]*>/).slice(-2, 2)[0] || ""; // Only need content in <main>

	html = fixNumberedLegalP(html);
	html = html.replace(/(src|href)="([^"]+)"/g, (_, attr, url) => {
		return `${attr}="${url.includes(":") ? "" : baseUrl}${url}" ${attr === "href" ? 'rel="noopener noreferrer" target="_blank"' : ""}`; // Add baseUrl
	});
	html = html.replace(REGEX_ID, (tag, id, index) => {
		const label = getLabel(tag, id, index, html);
		return `${tag}${label ? `<button type="button" role="checkbox" aria-label="${label}" value="${id}"></button>` : ""}`;
	});

	return html;
};

// Put number and first paragraph of numberedLegalP in span + legalP // TODO: Ottar - should we really really do this?
const fixNumberedLegalP = (html: string) =>
	html.replace(REGEX_NUMBERED, (_, tag, id, ledd) => {
		return `${tag}<span class="data-originalId">${id}</span><div class="legalP" id="${getAttr(tag, "id")}-ledd-0">${ledd}</div>`;
	});

const getLabel = (
	tag: string,
	id: string,
	index: number,
	html: string,
): string => LABELS[getAttr(tag, "class")]?.(tag, id, index, html) || "";

const getAttr = (html: string, attr: string) => {
	const query = ` ${attr.toLowerCase()}="`;
	const index = html.toLowerCase().indexOf(query); // Need to lowercase to sanitize html variations
	const start = index + query.length;
	return index === -1 ? "" : html.slice(start, html.indexOf('"', start)); // Using slice for performance
};

const LABELS: Record<string, typeof getLabel> = {
	numberedLegalP: (tag) => `nr. ${getAttr(tag, "data-numerator")}`,
	section: (_tag, _id, index, html) => {
		const head = html.slice(index).match(REGEX_HEADING)?.[2];
		const clean = head?.replace(REGEX_STRIP_TAGS, "");
		return clean?.replace(REGEX_STRIP_POINTER, "").trim() || "";
	},
	legalArticle: (_tag, _id, index, html) => {
		const at = html.indexOf(">", html.indexOf("legalArticleValue", index));
		const id = html.slice(at + 1, html.indexOf("</span>", at)); // .legalArticleValue is always a <span>
		return id.replace(REGEX_STRIP_TAGS, "").replace("Artikkel", "artikkel");
	},
	legalP: (_tag, id) => {
		const [parent, _, type, idx] = id.split("-").slice(-4); // If placed inside numberedLegalP, parent is "nummer"
		const count = type === "nummer" ? 1 : Number(idx); // If "fake" ledd 1 created by fixNumberedLegalP, type is "number"
		return `avsnitt ${count + (parent === "nummer" ? 1 : 0)}`; // Adjust for numberedLegalP creating fake legalP starting at 1
	},
	listArticle: (_tag, id, index, html) => {
		const path = id.split("-");
		const parentTag = `id="${path.slice(0, -2).join("-")}"`; // Since lists can be nested, we need to find parent law unit to get correct list
		const parentIndex = html.lastIndexOf(parentTag, index); // Find index of parent element
		const list = html.slice(html.indexOf("<ol", parentIndex), index); // Find first <ol> after parent element opening tag
		const item = html.slice(html.lastIndexOf("<li", index), index); // Find current <li> tag
		const name = getAttr(item, "data-name") || "-"; // Name can be empty or dash so allways fallback to dash
		const type = getAttr(list, "type") || "-";

		let unit = "punkt";
		if (type === "1") unit = "tall";
		if (type === "a") unit = "bokstav";
		if (type === "i") unit = "romtertall";
		return `${unit} ${name === "-" ? path.pop() : name}`;
	},
	marginIdArticle: (_tag, _id, index, html) => {
		const at = html.indexOf(">", html.indexOf("data-marginOriginalId", index));
		const id = html.slice(at + 1, html.indexOf("</span>", at));
		return `nr. ${id.replace(REGEX_STRIP_TAGS, "")}`;
	},
};
