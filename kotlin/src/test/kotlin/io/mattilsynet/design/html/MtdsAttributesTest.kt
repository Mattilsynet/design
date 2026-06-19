package io.mattilsynet.design.html

import kotlinx.html.button
import kotlinx.html.div
import kotlinx.html.stream.createHTML
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertFalse

class MtdsAttributesTest {
    @Test
    fun rendersCrossCuttingDesignSystemAttributes() {
        val html = createHTML().div {
            button {
                dataTooltip("Lagre", TooltipPosition.Right)
                popoverTarget("menu")
                popoverTargetAction(PopoverTargetAction.Show)
                command("show-modal")
                commandFor("dialog")
                dataSize("sm")
                dataColor("danger")
                dataVariant("primary")
                dataAlign("center")
                dataJustify("end")
                dataNowrap()
            }
        }

        assertContains(html, "data-tooltip=\"Lagre\"")
        assertContains(html, "data-tooltip-position=\"right\"")
        assertContains(html, "popovertarget=\"menu\"")
        assertContains(html, "popovertargetaction=\"show\"")
        assertContains(html, "command=\"show-modal\"")
        assertContains(html, "commandfor=\"dialog\"")
        assertContains(html, "data-size=\"sm\"")
        assertContains(html, "data-color=\"danger\"")
        assertContains(html, "data-variant=\"primary\"")
        assertContains(html, "data-align=\"center\"")
        assertContains(html, "data-justify=\"end\"")
        assertContains(html, "data-nowrap=\"true\"")
    }

    @Test
    fun dataNowrapCanBeDisabled() {
        val html = createHTML().div {
            button {
                dataNowrap(enabled = false)
            }
        }

        assertFalse(html.contains("data-nowrap"))
    }
}
