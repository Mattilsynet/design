package io.mattilsynet.design

/**
 * Helper extensions for loading SVG content.
 */
object Svg {
    fun load(id: String): String = DesignSystem.loadSvg(id)
}
