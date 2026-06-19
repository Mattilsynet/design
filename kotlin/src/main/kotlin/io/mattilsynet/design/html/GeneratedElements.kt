package io.mattilsynet.design.html

import kotlinx.html.FlowContent
import kotlinx.html.HTMLTag
import kotlinx.html.HtmlBlockTag
import kotlinx.html.TagConsumer
import kotlinx.html.visit

@DslMarker
annotation class MtdsGeneratedElementMarker

@MtdsGeneratedElementMarker
class MtdsGeneratedElement internal constructor(
    tagName: String,
    consumer: TagConsumer<*>,
    initialAttributes: Map<String, String>,
) : HTMLTag(tagName, consumer, initialAttributes, null, false, false), HtmlBlockTag

internal fun FlowContent.mtdsGeneratedElement(
    tagName: String,
    classes: String,
    block: MtdsGeneratedElement.() -> Unit = {},
) {
    MtdsGeneratedElement(tagName, consumer, mapOf("class" to classes)).visit(block)
}
