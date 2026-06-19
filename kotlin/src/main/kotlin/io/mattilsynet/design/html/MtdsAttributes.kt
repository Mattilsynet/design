package io.mattilsynet.design.html

import kotlinx.html.CommonAttributeGroupFacade

enum class TooltipPosition(val value: String) {
    Top("top"),
    Right("right"),
    Bottom("bottom"),
    Left("left"),
}

enum class PopoverTargetAction(val value: String) {
    Toggle("toggle"),
    Show("show"),
    Hide("hide"),
}

fun CommonAttributeGroupFacade.dataTooltip(text: String, position: TooltipPosition? = null) {
    attributes["data-tooltip"] = text
    position?.let { dataTooltipPosition(it) }
}

fun CommonAttributeGroupFacade.dataTooltipPosition(position: TooltipPosition) {
    attributes["data-tooltip-position"] = position.value
}

fun CommonAttributeGroupFacade.popoverTarget(id: String) {
    attributes["popovertarget"] = id
}

fun CommonAttributeGroupFacade.popoverTargetAction(action: PopoverTargetAction) {
    attributes["popovertargetaction"] = action.value
}

fun CommonAttributeGroupFacade.command(value: String) {
    attributes["command"] = value
}

fun CommonAttributeGroupFacade.commandFor(id: String) {
    attributes["commandfor"] = id
}

fun CommonAttributeGroupFacade.dataSize(value: String) {
    attributes["data-size"] = value
}

fun CommonAttributeGroupFacade.dataColor(value: String) {
    attributes["data-color"] = value
}

fun CommonAttributeGroupFacade.dataVariant(value: String) {
    attributes["data-variant"] = value
}

fun CommonAttributeGroupFacade.dataAlign(value: String) {
    attributes["data-align"] = value
}

fun CommonAttributeGroupFacade.dataJustify(value: String) {
    attributes["data-justify"] = value
}

fun CommonAttributeGroupFacade.dataNowrap(enabled: Boolean = true) {
    if (enabled) attributes["data-nowrap"] = "true"
}
