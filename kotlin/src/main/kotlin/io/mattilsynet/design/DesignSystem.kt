package io.mattilsynet.design

object DesignSystem {
    fun classes(vararg names: String): List<String> = CssModules.resolve(*names)
    fun c(vararg names: String): String = classes(*names).joinToString(" ")

    fun cssResource(): java.net.URL =
        DesignSystem::class.java.classLoader.getResource("public/mtds/styles.css")
            ?: error("styles.css not found on classpath")

    fun loadSvg(id: String): String {
        val stream = DesignSystem::class.java.classLoader
            .getResourceAsStream("public/mtds/${id}.svg")
            ?: error("SVG $id not found")
        return stream.readBytes().decodeToString()
    }

    fun renderSvg(icon: registry.Icon, attrs: Map<String, String> = emptyMap()): String {
        // For JVM we can return raw SVG. For DOM rendering use a library.
        return loadSvg(icon.key)
    }

    fun iconIds(): List<String> = registry.Icon.entries.map { it.key }
    fun illustrationIds(): List<String> = registry.Illustration.entries.map { it.key }
}
