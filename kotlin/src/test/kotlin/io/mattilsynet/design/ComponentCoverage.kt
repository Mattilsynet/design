package io.mattilsynet.design

enum class KotlinCoverageKind {
    GeneratedContract,
    ManualWrapper,
    Deferred,
}

data class KotlinComponentCoverageDecision(
    val kind: KotlinCoverageKind,
    val track: String,
    val surface: String,
    val notes: String,
)

object KotlinComponentCoverage {
    val decisions: Map<String, KotlinComponentCoverageDecision> = mapOf(
        "alert" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Alert",
            notes = "Generated wrapper; track data-size as a separate polish gap.",
        ),
        "app" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.Deferred,
            track = "phase 5",
            surface = "AppShell/AppHeader/AppSidebar/AppMain/AppFooter later",
            notes = "Depends on app observer behavior, dialogs, localStorage sidebar state, and layout conventions.",
        ),
        "atlas" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.Deferred,
            track = "phase 5",
            surface = "Atlas/AtlasMarker/AtlasMatgeo/AtlasWms later",
            notes = "Requires the atlas bundle, Leaflet, map tiles, Matgeo/external services, and custom element events.",
        ),
        "avatar" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Avatar, AvatarLink, AvatarButton",
            notes = "Generated explicit span/link/button wrappers with typed data-size and default button type.",
        ),
        "badge" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Badge",
            notes = "Generated wrapper; verify public color API separately.",
        ),
        "breadcrumbs" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 3",
            surface = "Low-level Breadcrumbs, optional item DSL later",
            notes = "Needs ds-breadcrumbs custom element support; higher-level list/current-page semantics can follow.",
        ),
        "button" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Button, ButtonLink",
            notes = "Generated wrappers with typed variant/arrow/justify/self attributes and default button type.",
        ),
        "card" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Card/CardLink/Group family",
            notes = "Generated coverage according to the Kotlin parity plan; API polish can be tracked separately.",
        ),
        "chart" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.Deferred,
            track = "phase 5",
            surface = "Chart DSL later",
            notes = "Requires mtds-chart JavaScript behavior, table parsing, observers, and tooltip behavior.",
        ),
        "chip" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "Chip, RemovableChip",
            notes = "Needs label/native tag support and accessibility tests for selectable/removable variants.",
        ),
        "details" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "Details, Summary helper",
            notes = "Native details/summary behavior; document or enforce summary-first markup.",
        ),
        "dialog" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "Dialog plus command helpers",
            notes = "Needs dialog native tag support plus closedby/command/commandfor helper decisions.",
        ),
        "divider" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Divider",
            notes = "Generated wrapper covered by the current plan baseline.",
        ),
        "errorsummary" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 3",
            surface = "Low-level ErrorSummary, optional ErrorSummaryList helper later",
            notes = "Needs ds-error-summary custom element support; useful high-level list/link DSL can follow.",
        ),
        "field" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.ManualWrapper,
            track = "phase 4",
            surface = "Field(label, description, validation, helpText, count, prefix, suffix) { ... }",
            notes = "Compound ds-field structure needs explicit server-side semantics and child ordering.",
        ),
        "fieldset" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "Fieldset, optional Legend/Description helpers",
            notes = "Needs fieldset/legend support while preserving native semantics and child order.",
        ),
        "fileupload" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "FileUpload label container",
            notes = "Render label/input markup only; upload state and preview/removal stay application-owned.",
        ),
        "helptext" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.ManualWrapper,
            track = "phase 4",
            surface = "HelpText(id, label) { ... }",
            notes = "Requires button/popover markup, explicit/generated IDs, and accessibility decisions.",
        ),
        "input" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Input baseline",
            notes = "Generated Input wrapper; Select/Textarea are tracked as separate parity gaps.",
        ),
        "law" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.Deferred,
            track = "phase 5",
            surface = "LawHtml/LawContainer later",
            notes = "Depends on transformed Lovdata HTML, helper functions, sanitization, and external markup assumptions.",
        ),
        "layout" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Flex, Grid",
            notes = "Generated layout wrappers; child layout attributes can use generic helpers or future polish.",
        ),
        "link" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Link",
            notes = "Generated wrapper covered by the current plan baseline.",
        ),
        "logo" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Logo, LogoLink",
            notes = "Generated coverage according to the Kotlin parity plan; logo observer behavior requires JS when used.",
        ),
        "pagination" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.ManualWrapper,
            track = "phase 4",
            surface = "Pagination(current, total, show, hrefFor/pageAttrs) { ... }",
            notes = "Needs the JS pagination algorithm ported and HTMX-friendly link/button callbacks.",
        ),
        "popover" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "Popover, PopoverMenu, trigger attr helpers",
            notes = "Needs menu/popover attrs and browser popover behavior; observer JS may enhance behavior.",
        ),
        "print" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "PrintSection/Print",
            notes = "Mostly CSS/print-engine behavior; needs section tag support.",
        ),
        "progress" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 3",
            surface = "Progress",
            notes = "Needs u-progress custom element support and runtime registration from the JS bundle/package import.",
        ),
        "skeleton" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Skeleton",
            notes = "Generated wrapper; inline/text skeleton variants can be tracked separately.",
        ),
        "spinner" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Spinner",
            notes = "Generated wrapper covered by the current plan baseline.",
        ),
        "steps" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "phase 2",
            surface = "Steps, optional Step helper",
            notes = "Needs ol/li support and markup discipline for current/completed states.",
        ),
        "table" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.ManualWrapper,
            track = "phase 4",
            surface = "Table, Thead, Tbody, Tr, Th, Td, ThSortable",
            notes = "Low-level wrappers are simple, but useful API needs subcomponents, sortable headers, responsive attrs, and observer behavior.",
        ),
        "tabs" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.ManualWrapper,
            track = "phase 4",
            surface = "Tabs(idPrefix), TabList, Tab, TabPanel",
            notes = "Requires custom elements plus keyboard/a11y behavior from Designsystemet and server-side selection decisions.",
        ),
        "tag" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Tag, TagLink",
            notes = "Generated coverage; color/size parity should be checked against stories/CSS separately.",
        ),
        "toast" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.Deferred,
            track = "phase 5",
            surface = "Static ToastDialog/HTMX out-of-band helpers later",
            notes = "React/plain JS exposes imperative helpers; Kotlin should first define static server-rendered toast markup.",
        ),
        "togglegroup" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.ManualWrapper,
            track = "phase 4",
            surface = "ToggleGroup(name) { RadioItem(...) }",
            notes = "Requires nested fieldset/label/input/button structure and correct radio semantics.",
        ),
        "typography" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Heading, Info, Ingress, Muted, Prose",
            notes = "Generated coverage according to the Kotlin parity plan; additional heading levels can be explicit wrappers later.",
        ),
        "validation" to KotlinComponentCoverageDecision(
            KotlinCoverageKind.GeneratedContract,
            track = "current",
            surface = "Validation",
            notes = "Generated wrapper; validation observer behavior requires JS when dynamic client updates are used.",
        ),
    )
}
