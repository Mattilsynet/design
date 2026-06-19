package io.mattilsynet.design.html

import io.mattilsynet.design.Mtds
import io.mattilsynet.design.htmx.hxPost
import io.mattilsynet.design.htmx.hxTarget
import kotlinx.html.div
import kotlinx.html.stream.createHTML
import kotlin.test.Test
import kotlin.test.assertContains

class HtmlComponentsTest {
    @Test
    fun buttonRendersDesignClassesAndHtmxAttributes() {
        val html = createHTML().div {
            Button(
                variant = ButtonVariant.Primary,
                attrs = {
                    hxPost("/save")
                    hxTarget("#result")
                },
            ) {
                +"Lagre"
            }
        }

        assertContains(html, "<button")
        assertContains(html, "class=\"${Mtds.c("button")}\"")
        assertContains(html, "type=\"button\"")
        assertContains(html, "data-variant=\"primary\"")
        assertContains(html, "hx-post=\"/save\"")
        assertContains(html, "hx-target=\"#result\"")
        assertContains(html, "Lagre")
    }

    @Test
    fun avatarRendersInitialsLinkAndButtonVariants() {
        val html = createHTML().div {
            Avatar(size = AvatarSize.Sm) {
                +"MT"
            }
            AvatarLink(href = "/profile", size = AvatarSize.Md) {
                +"NN"
            }
            AvatarButton(size = AvatarSize.Lg) {
                +"AB"
            }
        }

        assertContains(html, "<span")
        assertContains(html, "class=\"${Mtds.c("avatar")}\"")
        assertContains(html, "data-size=\"sm\"")
        assertContains(html, "MT")
        assertContains(html, "<a")
        assertContains(html, "href=\"/profile\"")
        assertContains(html, "data-size=\"md\"")
        assertContains(html, "NN")
        assertContains(html, "<button")
        assertContains(html, "type=\"button\"")
        assertContains(html, "data-size=\"lg\"")
        assertContains(html, "AB")
    }

    @Test
    fun alertRendersAsOutputWithColor() {
        val html = createHTML().div {
            Alert(color = AlertColor.Warning) {
                +"Noe gikk galt"
            }
        }

        assertContains(html, "<output")
        assertContains(html, "class=\"${Mtds.c("alert")}\"")
        assertContains(html, "data-color=\"warning\"")
        assertContains(html, "Noe gikk galt")
    }

    @Test
    fun inputAndValidationRenderFormHelpers() {
        val html = createHTML().div {
            Input(attrs = {
                attributes["name"] = "animal"
            })
            Validation {
                +"Må fylles ut"
            }
        }

        assertContains(html, "<input")
        assertContains(html, "class=\"${Mtds.c("input")}\"")
        assertContains(html, "type=\"text\"")
        assertContains(html, "name=\"animal\"")
        assertContains(html, "data-field=\"validation\"")
        assertContains(html, "Må fylles ut")
    }
}
