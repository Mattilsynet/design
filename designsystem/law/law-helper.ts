import { attr } from "../utils";

// NOTE: The law format is documentet in https://api.lovdata.no/xmldocs
const REGEX_ID = /<[^>]+\bid="([^"]+)[^>]+>/gi;
const REGEX_FORORDNING = /\([^)]{1,4}\).{1,9}\d+\/\d+/i; // Match (EU) 2016/2031, (EF) nr. 2020/1054, (EFF) ..., etc.
const REGEX_HEADING = /<(h\d|[^>]+role="heading")[^>]*>(.*?)<\/?(h\d|br|div)/i; // Can be both <h1>-<h6> and or <div> with role="heading" if level 7+
const REGEX_KAPITTEL_LEDD = /kapittel-\d+-ledd-\d+/; // If ledd is direct child of kapittel, and not has a paragraph in between
const REGEX_STRIP_BUTTONS = /<button[^>]+>.*?<\/button>/g;
const REGEX_STRIP_POINTER = /►m\d+/i;
const REGEX_STRIP_TAGS = /<[^>]+>/g;
const REGEX_META =
	/<dt([^>]*class="([^"]+)")?[^>]*>(.*?)<\/dt><dd[^>]*>(.*?)<\/dd>/gis;

const REGEX_FIX_TAGS = /<(\/?)(article|footer|section)/gi;
const REGEX_FIX_BASEURL = /(src|href)="([^"]+)"/gi;
const REGEX_FIX_LISTS = /(<li[^>]*)>\s*<div([^>]*>)|<\/div>(<\/li>)/gi;
const REGEX_FIX_SPAN_ID =
	/(<li[^>]+data-name="([^"]+)[^>]+>)(\s*<(ul|ol|div)[^>]+>)/gis; // Only create span if no span exists
const REGEX_FIX_NUMBEREDLEGALP =
	/(<[^>]+class="[^"]*\bnumberedLegalP\b[^>]+>\s*)(\d+\.)(.*?)(?=<\/?(ul|ol|div)|$)/gis;

const BASE_URL = "https://lovdata.no/";
const GUIDE_URL = "https://www.mattilsynet.no/regelveiledning/?regelverk=";
const META_DEFAULT: Record<
	"legacyid" | "title" | "titleshort" | "url" | (string & {}), // Ensure title and titleShort are always present
	{ label: string; value: string }
> = {
	dokid: { label: "DokumentID", value: "" },
	legacyid: { label: "Datokode", value: "" },
	refid: { label: "RefID", value: "" },
	title: { label: "Tittel", value: "" },
	titleshort: { label: "Korttittel", value: "" },
	url: { label: "Url", value: "" },
};

type Ids = string | string[] | HTMLButtonElement | HTMLButtonElement[];
const toIdArray = (ids: Ids): string[] =>
	Array.from(Array.isArray(ids) ? ids : [ids], (id) =>
		id instanceof HTMLButtonElement ? id.value : id,
	);

export const getLawChecked = (lawElement?: HTMLElement | null) =>
	Array.from(
		lawElement?.querySelectorAll(`button[aria-checked="true"]`) || [],
		(btn) => (btn as HTMLButtonElement).value,
	);

export const toggleLawChecked = (ids: Ids, lawElement?: HTMLElement | null) => {
	const idArray = toIdArray(ids);
	lawElement?.querySelectorAll(`button`).forEach((btn) => {
		if (idArray.includes(btn.value))
			attr(btn, "aria-checked", `${attr(btn, "aria-checked") !== "true"}`);
	});
};

export const setLawChecked = (ids: Ids, lawElement?: HTMLElement | null) => {
	const idArray = toIdArray(ids);
	lawElement?.querySelectorAll("button").forEach((btn) => {
		attr(btn, "aria-checked", `${idArray.includes(btn.value) || false}`);
	});
};

export const parseLawIds = (ids: string | string[], lawHtml: string) => {
	const html = fixLawHtml(lawHtml);
	return toIdArray(ids)
		.map((id) => parseLawId(id, html))
		.filter((unit) => !!unit);
};

export const parseLawMeta = (lawHtml: string) => {
	const html = lawHtml.slice(0, lawHtml.indexOf("</dl>"));
	const meta = { ...META_DEFAULT };
	for (const m of html.matchAll(REGEX_META)) {
		const key = m[2].replace(/-/g, "").toLowerCase();
		meta[key] = { label: m[3], value: m[4] };
	}
	return meta;
};

export const fixLawHtml = (lawHtml: string) => {
	if (!lawHtml.includes("<main")) return lawHtml; // Already rendered
	return (lawHtml.split(/<\/?main[^>]*>/)[1] || "") // Only need content in <main>
		.replace(REGEX_FIX_TAGS, "<$1div") // Better for accessibility, must run before other REGEX_FIX
		.replace(REGEX_FIX_LISTS, "$1$2$3") // Merge <li> with inner <div> to reduce unnecessary elements
		.replace(REGEX_FIX_BASEURL, (_, attr, url) => {
			return `${attr}="${url.includes(":") ? "" : BASE_URL}${url}" ${attr === "href" ? 'rel="noopener noreferrer" target="_blank"' : ""}`;
		})
		.replace(REGEX_FIX_NUMBEREDLEGALP, (_, tag, id, ledd) => {
			return `${tag}<span class="data-originalId">${id}</span><div class="legalP" id="${getAttr("id", tag)}-ledd-0">${ledd}</div>`;
		})
		.replace(REGEX_FIX_SPAN_ID, (_, tag, id, child) => {
			return `${tag}<span class="data-originalId">${id}</span>${child}`;
		})
		.replace(REGEX_ID, (tag, id, idx, html) => {
			const label = getLabel(tag, id, idx, html);
			return `${tag}${label ? `<button type="button" role="checkbox" aria-label="${label}" value="${id}"></button>` : ""}`;
		});
};

const parseLawId = (id: string, html: string) => {
	const isKapitellLedd = REGEX_KAPITTEL_LEDD.test(id);
	const path = id
		.split("-")
		.map((_, i, all) =>
			i % 2
				? parseLawItem(all.slice(0, i + 1).join("-"), html, isKapitellLedd)
				: null,
		)
		.filter((unit) => !!unit);

	if (!path.length) return null;
	const guideUrl = path.filter(({ guideUrl }) => guideUrl).pop()?.guideUrl; // The closest units item might not have an guideUrl
	const closestWithUrl = path.filter(({ url }) => url).pop(); // The closest units item might not have an URL, so we provide the last found URL
	const closestForordning = path
		.filter((u) => u.className === "section" && REGEX_FORORDNING.test(u.label))
		.pop();

	const url = closestWithUrl ? `${BASE_URL}${closestWithUrl.url}` : "";
	const label = path
		.slice(path.indexOf(closestForordning || path[0]))
		.map(({ label }) => label)
		.join(", ");

	return { ...path.slice(-1)[0], path, label, url, guideUrl };
};

const parseLawItem = (id: string, html: string, isKapitellLedd: boolean) => {
	const idx = html.lastIndexOf("<", html.indexOf(` id="${id}"`));
	const tag = html.slice(idx, html.indexOf(">", idx) + 1);
	const className = getAttr("class", tag);
	const url = getAttr("data-lovdata-url", tag);
	const label = getLabel(tag, id, idx, html);
	const [_, type, key] = url.match(/(lov|forskrift)\/([^/]+)/) || [];
	const legacyId = `${type?.slice(0, 3).toUpperCase()}-${key}`; // Recreate legacyId format from lovdata.no

	return {
		id,
		className,
		guideUrl: url && `${GUIDE_URL}${legacyId}_${id}`, // Recreate "chapterOrParagraphs" format stored in in mattilsynet.no Veiledning
		html: getOuterHTML(id, html),
		url,
		label:
			(!isKapitellLedd &&
				className === "section" &&
				label?.match(REGEX_FORORDNING)?.[0]) ||
			label,
	};
};

const getAttr = (attr: string, html: string) => {
	const query = ` ${attr.toLowerCase()}="`;
	const idx = html.toLowerCase().indexOf(query); // Need to lowercase to sanitize html variations
	const start = idx + query.length;
	return idx === -1 ? "" : html.slice(start, html.indexOf('"', start)); // Using slice for performance
};

const getOuterHTML = (id: string, html: string) => {
	const idx = html.lastIndexOf("<", html.indexOf(` id="${id}"`));
	const max = html.length;
	let i = idx + 1; // Using + 1 to get 0 if not found, and to ensure we start searching inside element
	let depth = 0;

	while (i && i < max) {
		i = html.indexOf("<", i) + 1;
		if (html[i] !== "/") depth++;
		else if (--depth < 0) break;
	}
	const end = html.indexOf(">", i) + 1;
	return i ? html.slice(idx, end).replace(REGEX_STRIP_BUTTONS, "") : "";
};

const getLabel = (tag: string, id: string, idx: number, html: string): string =>
	LABELS[getAttr("class", tag)]?.(tag, id, idx, html) || "";

const LABELS: Record<string, typeof getLabel> = {
	numberedLegalP: (tag) => `nr. ${getAttr("data-numerator", tag)}.`,
	section: (_tag, _id, idx, html) => {
		const head = html.slice(idx).match(REGEX_HEADING)?.[2];
		const clean = head?.replace(REGEX_STRIP_TAGS, "");
		return clean?.replace(REGEX_STRIP_POINTER, "").trim() || "";
	},
	legalArticle: (_tag, _id, idx, html) => {
		const at = html.indexOf(">", html.indexOf("legalArticleValue", idx));
		const id = html.slice(at + 1, html.indexOf("</span>", at)); // .legalArticleValue is always a <span>
		return id.replace(REGEX_STRIP_TAGS, "").replace("Artikkel", "artikkel");
	},
	legalP: (_tag, id) => {
		const [idx, type, _, parent] = id.split("-").reverse(); // If placed inside numberedLegalP, parent is "nummer"
		const count = type === "nummer" ? 1 : Number(idx); // If "fake" ledd 1 created by fixNumberedLegalP, type is "number"
		return `avsnitt ${count + (parent === "nummer" ? 1 : 0)}`; // Adjust for numberedLegalP creating fake legalP starting at 1
	},
	listArticle: (tag, id, idx, html) => {
		const path = id.split("-");
		const parentTag = ` id="${path.slice(0, -2).join("-")}"`; // Since lists can be nested, we need to find parent law unit to get correct list
		const parentIdx = html.lastIndexOf(parentTag, idx);
		const list = html.slice(html.indexOf("<ol", parentIdx), idx); // Find first <ol> after parent element opening tag
		const name = getAttr("data-name", tag) || "-"; // Name can be empty or dash so allways fallback to dash
		const type = getAttr("type", list) || "-";

		let unit = "punkt";
		if (type === "1") unit = "tall";
		if (type === "a") unit = "bokstav";
		if (type === "i") unit = "romtertall";
		return `${unit} ${name === "-" ? path.pop() : name.replace(REGEX_STRIP_TAGS, "")}`;
	},
	marginIdArticle: (_tag, _id, idx, html) => {
		const at = html.indexOf(">", html.indexOf("data-marginOriginalId", idx));
		const id = html.slice(at + 1, html.indexOf("</span>", at));
		return `nr. ${id.replace(REGEX_STRIP_TAGS, "")}`;
	},
};
