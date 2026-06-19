package io.mattilsynet.design

import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.isRegularFile
import kotlin.test.Test
import kotlin.test.assertTrue

class ComponentCoverageTest {
    @Test
    fun everyReactComponentFamilyHasAKotlinCoverageDecision() {
        val componentFamilies = reactComponentFamilies()
        val decisions = KotlinComponentCoverage.decisions.keys

        val missingDecisions = componentFamilies - decisions
        assertTrue(
            missingDecisions.isEmpty(),
            "Missing Kotlin coverage decision for React component family/families: ${missingDecisions.sorted().joinToString()}",
        )
    }

    @Test
    fun everyCoverageDecisionHasActionableMetadata() {
        val invalid = KotlinComponentCoverage.decisions.entries.mapNotNull { (family, decision) ->
            when {
                decision.track.isBlank() -> "$family has blank track"
                decision.surface.isBlank() -> "$family has blank surface"
                decision.notes.isBlank() -> "$family has blank notes"
                decision.kind == KotlinCoverageKind.Deferred && !decision.track.startsWith("phase") -> "$family deferred decision should reference a phase"
                else -> null
            }
        }

        assertTrue(invalid.isEmpty(), invalid.joinToString("\n"))
    }

    private fun reactComponentFamilies(): Set<String> {
        val designSystemRoot = Path.of("..", "designsystem")

        assertTrue(
            Files.isDirectory(designSystemRoot),
            "Expected designsystem directory at ${designSystemRoot.toAbsolutePath().normalize()}",
        )

        return Files.walk(designSystemRoot, 2).use { paths ->
            paths
                .filter { path -> path.isRegularFile() }
                .filter { path -> path.fileName.toString().endsWith(".tsx") }
                .filter { path -> !path.fileName.toString().endsWith(".stories.tsx") }
                .filter { path -> path.parent.parent == designSystemRoot }
                .map { path -> path.parent.fileName.toString() }
                .toList()
                .toSet()
        }
    }
}
