# Mattilsynet Designsystem - Kotlin

Kotlin JVM wrapper for the Mattilsynet designsystem.

## Build

```bash
./gradlew build
```

The build reuses the Clojure asset export:

1. `prepareResources` runs Clojure tasks to export CSS modules, SVGs, CSS and assets.
2. `generateKotlinSources` reads the exported EDN and generates `CssModules`, `Icon` and `Illustration` types.

## API

```kotlin
DesignSystem.c("logo", "mt-4")
DesignSystem.classes("logo", "mt-4")
DesignSystem.loadSvg("icons/cow.svg")
DesignSystem.renderSvg(Icon.COW)
```

## Example - htmx

A minimal example of using the Kotlin package together with htmx to render designsystem components in server-rendered HTML fragments:

```kotlin
import io.mattilsynet.design.DesignSystem

fun renderPage(): String {
    val containerClass = DesignSystem.c("container", "p-4")
    val buttonClass = DesignSystem.c("button", "button--primary", "mt-2")

    val iconSvg = DesignSystem.loadSvg("icons/cow.svg")

    return """
        <!doctype html>
        <html lang="no">
        <head>
            <meta charset="utf-8" />
            <title>Mattilsynet Designsystem + htmx</title>
            <link rel="stylesheet" href="/mtds/styles.css" />
            <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        </head>
        <body class="$containerClass">
            <header class="${DesignSystem.c("logo", "mt-4")}">
                $iconSvg
                <h1 class="${DesignSystem.c("heading", "mt-2")}">Htmx eksempel</h1>
            </header>

            <div class="${DesignSystem.c("card", "p-4", "mt-4")}">
                <button
                    class="$buttonClass"
                    hx-get="/api/items"
                    hx-target="#items"
                    hx-swap="innerHTML"
                >
                    Last inn elementer
                </button>

                <div id="items" class="${DesignSystem.c("mt-4")}"></div>
            </div>
        </body>
        </html>
    """.trimIndent()
}
```

See `src/main/kotlin/io/mattilsynet/design/examples/HtmxExample.kt` for a complete working example.

## Publishing

Version is `npm version.git-commits` and is published to Maven Central via Gradle.
