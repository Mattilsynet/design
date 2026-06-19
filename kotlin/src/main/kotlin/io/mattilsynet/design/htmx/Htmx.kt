package io.mattilsynet.design.htmx

import kotlinx.html.CommonAttributeGroupFacade

fun CommonAttributeGroupFacade.hxGet(url: String) {
    attributes["hx-get"] = url
}

fun CommonAttributeGroupFacade.hxPost(url: String) {
    attributes["hx-post"] = url
}

fun CommonAttributeGroupFacade.hxPut(url: String) {
    attributes["hx-put"] = url
}

fun CommonAttributeGroupFacade.hxPatch(url: String) {
    attributes["hx-patch"] = url
}

fun CommonAttributeGroupFacade.hxDelete(url: String) {
    attributes["hx-delete"] = url
}

fun CommonAttributeGroupFacade.hxTarget(selector: String) {
    attributes["hx-target"] = selector
}

fun CommonAttributeGroupFacade.hxSwap(value: String) {
    attributes["hx-swap"] = value
}

fun CommonAttributeGroupFacade.hxTrigger(value: String) {
    attributes["hx-trigger"] = value
}

fun CommonAttributeGroupFacade.hxInclude(selector: String) {
    attributes["hx-include"] = selector
}

fun CommonAttributeGroupFacade.hxIndicator(selector: String) {
    attributes["hx-indicator"] = selector
}

fun CommonAttributeGroupFacade.hxConfirm(message: String) {
    attributes["hx-confirm"] = message
}

fun CommonAttributeGroupFacade.hxBoost(enabled: Boolean = true) {
    attributes["hx-boost"] = enabled.toString()
}

fun CommonAttributeGroupFacade.hxPushUrl(value: String) {
    attributes["hx-push-url"] = value
}

fun CommonAttributeGroupFacade.hxPushUrl(enabled: Boolean) {
    attributes["hx-push-url"] = enabled.toString()
}

fun CommonAttributeGroupFacade.hxSelect(selector: String) {
    attributes["hx-select"] = selector
}

fun CommonAttributeGroupFacade.hxVals(json: String) {
    attributes["hx-vals"] = json
}
