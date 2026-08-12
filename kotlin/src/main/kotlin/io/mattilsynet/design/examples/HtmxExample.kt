package io.mattilsynet.design.examples

import io.mattilsynet.design.DesignSystem

/**
 * Simple example showing how to use the Kotlin design system package together with htmx.
 *
 * The example renders a page with an htmx button that loads a partial fragment
 * on click, using DesignSystem classes and icons from the designsystem.
 */
object HtmxExample {

    fun renderPage(): String {
        val containerClass = DesignSystem.c("container", "p-4")
        val buttonClass = DesignSystem.c("button", "button--primary", "mt-2")
        val cardClass = DesignSystem.c("card", "p-4", "mt-4")

        val iconSvg = DesignSystem.loadSvg("icons/cow.svg") // replace with a real icon path

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

                <div class="$cardClass">
                    <button
                        class="$buttonClass"
                        hx-get="/api/items"
                        hx-target="#items"
                        hx-swap="innerHTML"
                    >
                        $iconSvg Last inn elementer
                    </button>

                    <div id="items" class="${DesignSystem.c("mt-4")}">
                        <!-- htmx vil injisere innhold her -->
                    </div>
                </div>
            </body>
            </html>
        """.trimIndent()
    }

    fun renderItemsPartial(items: List<String>): String {
        val listClass = DesignSystem.c("list", "list--unstyled", "mt-2")
        val itemClass = DesignSystem.c("list-item", "p-2", "border-bottom")
        val rows = items.joinToString("\n") { item ->
            """<li class="$itemClass">$item</li>"""
        }
        return """<ul class="$listClass">$rows</ul>"""
    }
}
