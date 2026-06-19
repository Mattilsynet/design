package io.mattilsynet.design

import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.isDirectory
import kotlin.io.path.isRegularFile
import kotlin.io.path.readText
import kotlin.test.Test
import kotlin.test.assertTrue

class MetadataTest {
    @Test
    fun allComponentMetadataReferencesKnownStyleClasses() {
        val metadataRoot = Path.of("..", "mtds", "component-metadata")
        val classNameRegex = Regex("\"className\"\\s*:\\s*\"([^\"]+)\"")

        assertTrue(
            metadataRoot.isDirectory(),
            "Expected generated component metadata under mtds/component-metadata. Run `npm run build` before Kotlin tests.",
        )

        val metadataFiles = Files.walk(metadataRoot).use { paths ->
            paths
                .filter { it.isRegularFile() && it.fileName.toString().endsWith(".component.json") }
                .toList()
        }

        assertTrue(metadataFiles.isNotEmpty(), "Expected generated component metadata files")

        val missing = metadataFiles.mapNotNull { file ->
            val className = classNameRegex.find(file.readText())?.groupValues?.get(1)
            when {
                className == null -> "${file}: missing className"
                !Mtds.hasClass(className) -> "${file}: className `$className` is not in mtds/styles.json"
                else -> null
            }
        }

        assertTrue(missing.isEmpty(), missing.joinToString("\n"))
    }
}
