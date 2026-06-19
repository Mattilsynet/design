# Kotlin + HTMX support plan

This document describes how we can add Kotlin/HTMX support to `@mattilsynet/design` without requiring the design system team to manually maintain a large Kotlin codebase.

The main idea is:

- keep the design system source of truth in JS/TS/CSS
- generate as much Kotlin as possible from build output and simple metadata
- provide a small, ergonomic Kotlin HTML DSL for server-rendered HTML + HTMX
- test locally with `publishToMavenLocal` before adding Maven/GitHub publishing or CI workflows

## Goals

1. Let Kotlin applications render Mattilsynet design system HTML on the server.
2. Make the API smooth to use with HTMX.
3. Keep Kotlin maintenance minimal for the design system team.
4. Reuse existing npm build artifacts instead of duplicating CSS/assets.
5. Start with simple components only.
6. Leave complex components as explicit TODOs until we understand their server-rendered HTML contract.

## Non-goals for the first iteration

- No GitHub workflow changes.
- No Maven Central, GitHub Packages, or other remote publishing setup.
- No attempt to translate React components directly into Kotlin.
- No full component parity in the first PR.
- No bundled HTMX runtime initially.
- No Kotlin-specific implementation of advanced browser behavior where the existing JS bundle should be used.

## Local development workflow

The package should be testable locally before we set up publishing.

From this repo:

```sh
npm run build
./gradlew -p kotlin publishToMavenLocal
```

Then in a consuming Kotlin app:

```kotlin
repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation("io.mattilsynet:design-htmx-kotlin:<local-version>")
}
```

For active development, a consuming Gradle app can also use a composite build:

```kotlin
// settings.gradle.kts in the consuming app
includeBuild("../path/to/design/kotlin")
```

## Proposed package layout

```txt
design/
  kotlin/
    README.md
    settings.gradle.kts
    build.gradle.kts
    src/main/kotlin/io/mattilsynet/design/
      Mtds.kt
      Htmx.kt
      assets/...
      html/
        Button.kt              # generated
        Alert.kt               # generated
        Badge.kt               # generated
        ...
    src/main/resources/
      META-INF/resources/mtds/
        styles.css             # copied from mtds/styles.css
        index.iife.js          # copied from mtds/index.iife.js
        atlas.iife.js          # copied from mtds/atlas.iife.js, if relevant
        icons/                 # copied from mtds/icons
        illustrations/         # copied from mtds/illustrations
      mattilsynet-design/
        styles.json            # copied from mtds/styles.json
    src/test/kotlin/...
```

The root npm build remains the source of CSS/assets:

```sh
npm run build
```

The Kotlin build consumes the generated `mtds/` directory.

## Public Kotlin API style

Use smooth, uppercase component names:

```kotlin
import io.mattilsynet.design.html.Button
import io.mattilsynet.design.html.Alert
import io.mattilsynet.design.html.ButtonVariant.Primary
import io.mattilsynet.design.htmx.hxPost
import io.mattilsynet.design.htmx.hxTarget

Button(variant = Primary) {
    hxPost("/lagre")
    hxTarget("#resultat")
    +"Lagre"
}

Alert(color = AlertColor.Warning) {
    +"Noe gikk galt"
}
```

This should render normal HTML:

```html
<button class="..." data-variant="primary" hx-post="/lagre" hx-target="#resultat">
  Lagre
</button>
```

Uppercase function names are intentional. They match common UI DSL conventions such as Jetpack Compose and avoid noisy names like `mtdsButton`.

Implementation files can suppress the Kotlin naming warning:

```kotlin
@Suppress("FunctionName")
fun FlowContent.Button(...) { ... }
```

If consumers have naming conflicts, they can use import aliases:

```kotlin
import io.mattilsynet.design.html.Button as MtdsButton
```

## HTMX support

HTMX support should be generic attribute helpers, not component-specific logic.

Example helpers:

```kotlin
fun CommonAttributeGroupFacade.hxGet(url: String) {
    attributes["hx-get"] = url
}

fun CommonAttributeGroupFacade.hxPost(url: String) {
    attributes["hx-post"] = url
}

fun CommonAttributeGroupFacade.hxTarget(selector: String) {
    attributes["hx-target"] = selector
}

fun CommonAttributeGroupFacade.hxSwap(value: String) {
    attributes["hx-swap"] = value
}
```

The package should not require HTMX as a dependency. Applications can include HTMX however they already manage frontend assets:

```html
<script src="https://unpkg.com/htmx.org@2.0.4"></script>
```

or via WebJars/npm/internal asset pipeline.

## Resource serving

The jar should include static resources under `META-INF/resources/mtds`.

Ktor example:

```kotlin
routing {
    staticResources("/mtds", "META-INF/resources/mtds")
}
```

HTML example:

```kotlin
head {
    link(rel = "stylesheet", href = "/mtds/styles.css")
    script(src = "/mtds/index.iife.js") {}
}
```

## Keeping Kotlin automatic

The design system team should not need to manually keep Kotlin and React code in sync.

We should split outputs into three categories.

### 1. Fully automatic from existing npm build output

These should be copied/generated automatically every Kotlin build:

| Output | Source |
| --- | --- |
| CSS file | `mtds/styles.css` |
| CSS class map | `mtds/styles.json` |
| icons | `mtds/icons` |
| illustrations | `mtds/illustrations` |
| IIFE behavior JS | `mtds/index.iife.js`, `mtds/atlas.iife.js` |
| version | root `package.json` |

### 2. Generated from component metadata

Kotlin component wrappers should be generated from small metadata files, not handwritten one by one.

Example metadata shape:

```json
{
  "name": "Button",
  "className": "button",
  "elements": ["button", "a"],
  "defaultElement": "button",
  "attributes": {
    "data-variant": ["primary", "secondary", "tertiary"],
    "data-size": ["sm", "md", "lg"],
    "data-color": ["danger"],
    "data-arrow": ["left", "right", true],
    "data-justify": ["start", "center", "end", "right", "left"]
  },
  "defaults": {
    "type": "button"
  }
}
```

Generated Kotlin could expose:

```kotlin
@Suppress("FunctionName")
fun FlowContent.Button(
    variant: ButtonVariant? = null,
    size: Size? = null,
    color: ButtonColor? = null,
    attrs: BUTTON.() -> Unit = {},
    content: BUTTON.() -> Unit = {},
) { ... }
```

The metadata is intentionally simple and JS-land friendly. Long term, the Kotlin build should consume JSON emitted by the npm/TS build rather than hand-authored Kotlin-side metadata. Updating the TS-side component contract should be part of adding or changing a design system component, but it should not require Kotlin knowledge.

### 3. Manual/TODO for complex components

Some components have behavior that is not just “HTML tag + CSS class + data attributes”. These should be left as TODOs initially.

Examples:

- components that depend on DOM observers
- components with custom JS behavior
- components with advanced accessibility logic
- components with complex nested structure
- components that wrap third-party widgets
- components whose server-rendered contract is unclear

For these, the generated Kotlin can provide either:

```kotlin
// TODO: Generate once server-rendered HTML contract is defined.
```

or no component function yet, with a clear entry in the README.

## Why not generate Kotlin directly from React?

React components are executable TypeScript/TSX. Translating them to Kotlin would be brittle because they can contain:

- arbitrary logic
- polymorphic `as` props
- React-specific types
- conditional defaults
- accessibility behavior
- event handling
- component composition

Instead, we should define a small metadata contract for the server-rendered HTML surface. That metadata can generate Kotlin reliably and can also be validated against snapshots.

## Follow-up plan: generate component metadata from TS contracts

The current MVP can use checked-in `*.component.json` files as simple source metadata, but the better long-term model is:

- keep the component contract in TS-land next to the component source
- generate JSON metadata as part of `npm run build`
- make Kotlin consume generated metadata from `mtds/`
- do not check in generated JSON

This keeps Kotlin generation downstream of the existing npm build output and reduces Kotlin-specific maintenance.

### Target layout

```txt
designsystem/button/button.contract.ts          # checked in source contract
designsystem/alert/alert.contract.ts            # checked in source contract
mtds/component-metadata/button.component.json    # generated by npm build, not checked in
mtds/component-metadata/alert.component.json     # generated by npm build, not checked in
kotlin/build/generated/mtds/...                  # generated by Gradle, not checked in
```

### Contract source shape

The TS-side contract should be explicit and boring. It should not require parsing arbitrary React implementation details.

Example:

```ts
// designsystem/button/button.contract.ts
import { defineComponentContract } from "../component-contract";

export const buttonVariants = ["primary", "secondary", "tertiary"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export default defineComponentContract({
  name: "Button",
  className: "button",
  variants: [
    {
      name: "Button",
      tag: "button",
      defaultAttributes: { type: "button" },
    },
    {
      name: "ButtonLink",
      tag: "a",
      parameters: [
        { name: "href", attribute: "href", type: "string", required: true },
      ],
    },
  ],
  parameters: [
    {
      name: "variant",
      attribute: "data-variant",
      type: "enum",
      enumName: "ButtonVariant",
      values: buttonVariants,
    },
  ],
});
```

The React component should reuse the same constants/types where practical:

```ts
import type { ButtonVariant } from "./button.contract";

type ButtonBaseProps<Href> = {
  "data-variant"?: ButtonVariant;
};
```

That makes common drift visible to TypeScript instead of relying on Kotlin or Gradle to infer TSX changes.

### Build flow

```sh
npm run build
  -> emits mtds/styles.css
  -> emits mtds/styles.json
  -> emits mtds/component-metadata/*.component.json

./gradlew -p kotlin build
  -> reads mtds/styles.json
  -> reads mtds/component-metadata/*.component.json
  -> generates Kotlin wrappers under kotlin/build/generated/mtds
  -> compiles and tests
```

The Kotlin build should fail with a clear message if `mtds/component-metadata` is missing, just like it should fail if `mtds/styles.json` is missing.

### Migration phases

#### Phase A: Emit metadata from npm build while keeping current JSON source

1. Keep the current checked-in `designsystem/**/*.component.json` files temporarily.
2. Add an npm metadata task that validates and copies them to:

   ```txt
   mtds/component-metadata/*.component.json
   ```

3. Run that task from `npm run build` after the final Vite build has created `mtds/`.
4. Update Gradle to consume metadata from `mtds/component-metadata` instead of `designsystem/**/*.component.json`.
5. Keep Gradle validation that metadata `className` values exist in `mtds/styles.json`.

This moves Kotlin to consuming npm build output without changing the metadata authoring model yet.

#### Phase B: Replace checked-in JSON with checked-in TS contracts

1. Add a small `defineComponentContract(...)` helper and TypeScript types for the metadata schema.
2. Convert each `designsystem/**/*.component.json` file to a nearby `*.contract.ts` file.
3. Generate JSON from the TS contracts into `mtds/component-metadata` during `npm run build`.
4. Delete the checked-in `*.component.json` source files once all Gradle/Kotlin tasks read from generated metadata.
5. Keep generated JSON ignored via the existing `mtds/` ignore rule.

#### Phase C: Tie React props to contract values where useful

For components with enum-like props, export constants/types from the contract file and use them from React props. This prevents many common drift cases at TypeScript compile time.

Examples:

- `buttonVariants` powers both `ButtonVariant` React prop type and generated Kotlin `ButtonVariant` enum.
- `alertColors` powers both `AlertColor` React prop type and generated Kotlin `AlertColor` enum.

#### Phase D: Add publishing and CI gates

Publishing should not be responsible for sync, but it should be gated by sync checks.

Add checks so CI/publishing runs:

```sh
npm run build
./gradlew -p kotlin check
```

Publishing tasks should depend on Gradle `check`, and Gradle `check` should include metadata validation.

### What not to do

Do not attempt to infer the contract by scraping arbitrary TSX/React implementation code. React components can contain polymorphic rendering, defaults, arbitrary conditionals, event behavior, accessibility behavior, and composition. The metadata contract should be explicit.

## Component scope for MVP

Start with components that are mostly semantic HTML + CSS class + data attributes.

### Good first candidates

| Component | Reason |
| --- | --- |
| `Button` | Thin wrapper; important for HTMX actions |
| `Alert` | Thin wrapper; useful for server responses |
| `Badge` | Simple visual component |
| `Tag` | Simple visual component |
| `Divider` | Simple structural component |
| `Spinner` | Simple loading indicator |
| `Skeleton` | Simple loading indicator |
| `Input` | Important for forms; likely manageable |
| `Field` | Important for forms, if structure is simple enough |
| `Validation` | Useful for server-side validation responses |
| `Logo` | Thin wrapper, but confirm asset/style behavior |
| `Link` | Simple and common |
| `Card` | Likely simple container |
| `Typography` helpers | Useful if they map cleanly to classes/elements |
| `Layout` helpers | Useful if `Flex`/`Grid` are class + data attrs only |

### TODO initially

| Component | Reason to defer |
| --- | --- |
| `Chart` | Custom element / behavior likely needed |
| `Dialog` | Accessibility and browser behavior need careful contract |
| `Popover` | Depends on popover behavior/observer logic |
| `Toast` | Dynamic JS helper/observer behavior |
| `Tooltip` | Custom behavior |
| `Table` | Has observer behavior; may need deeper contract |
| `Tabs` | Keyboard/a11y behavior should be verified |
| `FileUpload` | Browser/file state complexity |
| `Combobox` / legacy `u-combobox` | Third-party/custom element behavior |
| `Atlas` | Separate package/surface, defer |
| `Law` | Has helper behavior, defer until contract is clear |
| `App` | App observer behavior, defer |
| `Pagination` | Could be simple, but defer if structure is opinionated |
| `Breadcrumbs` | Could be simple, but defer until nested API is designed |
| `Details` | Could be simple, but confirm interaction/legacy behavior |
| `HelpText` | Could be simple, but confirm tooltip/popover behavior |
| `ToggleGroup` | Needs form/input behavior review |
| `Steps` | Needs nested structure/API design |
| `Avatar` | Confirm image/fallback API |
| `Progress` | Custom element package is loaded; defer until contract is clear |

The TODO list is not permanent. It is a safety boundary for the first iteration.

## Code generation plan

### Inputs

1. `mtds/styles.json`
2. generated component metadata files, for example:

```txt
mtds/component-metadata/button.component.json
mtds/component-metadata/alert.component.json
```

3. root `package.json`
4. generated assets under `mtds/`

During the MVP/interim phase, Gradle may temporarily read checked-in `designsystem/**/*.component.json` files. The target state is that Kotlin consumes metadata emitted into `mtds/component-metadata` by the npm build.

### Outputs

Generated Kotlin source:

```txt
kotlin/build/generated/mtds/io/mattilsynet/design/html/Button.kt
kotlin/build/generated/mtds/io/mattilsynet/design/html/Alert.kt
kotlin/build/generated/mtds/io/mattilsynet/design/html/Styles.kt
```

Generated/copied resources:

```txt
kotlin/build/generated/resources/main/META-INF/resources/mtds/...
kotlin/build/generated/resources/main/mattilsynet-design/styles.json
```

The checked-in Kotlin should be mostly stable infrastructure:

```txt
Mtds.kt
Htmx.kt
codegen task/build logic
```

Component wrappers should preferably be generated and not edited manually.

## Drift prevention

To avoid Kotlin silently drifting from JS-land:

1. Kotlin generation should run as part of `./gradlew -p kotlin build`.
2. Tests should render representative components and snapshot/check their HTML.
3. Tests should verify that every generated component class exists in `styles.json`.
4. Tests should fail if a component metadata file references a missing CSS class.
5. README should document that generated Kotlin files are not hand-maintained.

Optional later improvement:

- Add a script that compares component metadata with exported React component names and reports missing metadata/TODO entries.

## Example generated component

Potential user-facing API:

```kotlin
Button(variant = ButtonVariant.Primary) {
    hxPost("/animals/123/save")
    hxTarget("#save-result")
    +"Lagre"
}

ButtonLink(href = "/animals/123", variant = ButtonVariant.Secondary) {
    +"Se detaljer"
}
```

Potential implementation shape:

```kotlin
@Suppress("FunctionName")
fun FlowContent.Button(
    variant: ButtonVariant? = null,
    size: Size? = null,
    attrs: BUTTON.() -> Unit = {},
    content: BUTTON.() -> Unit = {},
) {
    button(classes = Mtds.c("button")) {
        type = ButtonType.button
        variant?.let { attributes["data-variant"] = it.value }
        size?.let { attributes["data-size"] = it.value }
        attrs()
        content()
    }
}
```

For link-style buttons, expose a separate `ButtonLink(...)` function in the MVP. This avoids a polymorphic `Button(href = ...)` API and keeps generated code simpler and safer.

## Example consumer app

```kotlin
routing {
    staticResources("/mtds", "META-INF/resources/mtds")

    get("/") {
        call.respondHtml {
            head {
                link(rel = "stylesheet", href = "/mtds/styles.css")
                script(src = "https://unpkg.com/htmx.org@2.0.4") {}
                script(src = "/mtds/index.iife.js") {}
            }
            body {
                Button(variant = ButtonVariant.Primary) {
                    hxPost("/save")
                    hxTarget("#result")
                    +"Lagre"
                }

                div {
                    id = "result"
                }
            }
        }
    }

    post("/save") {
        call.respondHtml {
            body {
                Alert(color = AlertColor.Success) {
                    +"Lagret"
                }
            }
        }
    }
}
```

## Implementation phases

### Phase 1: Local Kotlin package skeleton

- Add `kotlin/settings.gradle.kts`.
- Add `kotlin/build.gradle.kts` with:
  - Kotlin JVM plugin
  - `kotlinx-html`
  - `maven-publish`
  - generated source/resource directories
- Add local `publishToMavenLocal` support.
- Add `README.md` with local testing instructions.

### Phase 2: Automatic resources and class map

- Copy `mtds/styles.css` into jar resources.
- Copy icons/illustrations/assets into jar resources.
- Copy `mtds/styles.json` into jar resources.
- Generate or load `Mtds.c(...)` class resolver.
- Add tests for class resolution.

### Phase 3: HTMX helpers

- Add generic HTMX attribute helper functions.
- Include common attributes:
  - `hx-get`
  - `hx-post`
  - `hx-put`
  - `hx-patch`
  - `hx-delete`
  - `hx-target`
  - `hx-swap`
  - `hx-trigger`
  - `hx-include`
  - `hx-indicator`
  - `hx-confirm`
  - `hx-boost`
  - `hx-push-url`
  - `hx-select`
  - `hx-vals`
- Avoid depending on HTMX runtime.

### Phase 4: Component metadata and generator

- Define minimal component metadata schema.
- Add metadata for MVP components.
- Generate uppercase Kotlin component functions.
- Generate enums/sealed values for known `data-*` attributes.
- Generate tests that verify metadata class names exist in `styles.json`.

Interim implementation may use checked-in `designsystem/**/*.component.json` files. Follow-up implementation should move the checked-in source contract to TS files and emit generated JSON into `mtds/component-metadata` during `npm run build`.

### Phase 5: MVP components

Generate and test:

- `Button`
- `ButtonLink` if needed
- `Alert`
- `Badge`
- `Tag`
- `Divider`
- `Spinner`
- `Skeleton`
- `Input`
- `Link`
- `Card`
- `Validation`
- simple `Flex`/`Grid` layout helpers if metadata is clear

Leave the complex components as TODOs in the README and/or metadata registry.


## Decisions for the first iteration

1. Artifact coordinates: `io.mattilsynet:design-htmx-kotlin`.
2. Generated Kotlin source should not be checked in. It should be created under `kotlin/build/generated/...` during the Gradle build.
3. Kotlin should consume JSON component metadata, but the target source of truth should be TS-side component contracts emitted as JSON during `npm run build`. Checked-in `*.component.json` files are acceptable only as an MVP/interim step.
4. The package should not include the HTMX runtime. Applications include HTMX themselves through CDN, WebJar, npm, or their existing asset pipeline.
5. Link-style buttons should use a separate `ButtonLink(...)` function in the MVP.

## Success criteria for the first PR

- `npm run build` still produces the normal npm package.
- `./gradlew -p kotlin build` works locally.
- `./gradlew -p kotlin publishToMavenLocal` works locally.
- A Kotlin app can add `mavenLocal()` and consume `io.mattilsynet:design-htmx-kotlin:<local-version>`.
- A Kotlin app can render at least `Button` and `Alert` with resolved design system classes.
- HTMX attributes can be added ergonomically.
- Static CSS/assets can be served from the jar.
- Most component Kotlin code is generated, not manually maintained.
- Complex components are explicitly documented as TODO rather than half-supported.
