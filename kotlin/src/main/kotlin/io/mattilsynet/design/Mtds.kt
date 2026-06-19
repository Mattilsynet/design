package io.mattilsynet.design

/**
 * Utilities for Mattilsynet design-system assets and generated CSS module classes.
 */
object Mtds {
    /** Version copied from the root npm package during Kotlin code generation. */
    val version: String = GeneratedMtdsVersion

    /**
     * Resolve one or more design-system class keys from `mtds/styles.json`.
     *
     * Example: `Mtds.c("button")` returns the generated CSS module classes for the
     * design-system `button` key. Multiple arguments and whitespace-separated keys
     * are supported for convenience.
     */
    fun c(vararg names: String): String = names
        .flatMap { it.split(Regex("\\s+")) }
        .filter { it.isNotBlank() }
        .joinToString(" ") { name ->
            GeneratedStyles.classes[name]
                ?: throw IllegalArgumentException("Unknown Mattilsynet design class `$name`. Check mtds/styles.json and component metadata.")
        }

    fun hasClass(name: String): Boolean = GeneratedStyles.classes.containsKey(name)

    fun classNames(): Set<String> = GeneratedStyles.classes.keys
}
