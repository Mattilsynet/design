package io.mattilsynet.design

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class MtdsTest {

    @Test
    fun `npm-versjon stemmer med monorepoets package json`() {
        val expected = System.getProperty("mtds.expectedNpmVersion")
        assertFalse(expected.isNullOrBlank(), "Testoppsettet satte ikke mtds.expectedNpmVersion")
        assertEquals(expected, Mtds.NPM_VERSION)
    }

    @Test
    fun `cdn-base peker paa samme versjon`() {
        assertEquals(
            "https://cdn.jsdelivr.net/npm/@mattilsynet/design@${Mtds.NPM_VERSION}/mtds",
            Mtds.CDN_BASE,
        )
    }

    @Test
    fun `kjente komponentklasser er generert og hashet`() {
        // Hashen endres hver utgivelse, så vi låser formen og ikke verdien.
        listOf(Mtds.button, Mtds.card, Mtds.heading, Mtds.table, Mtds.input).forEach { value ->
            assertTrue(value.isNotBlank(), "Klassekonstant var tom")
            assertTrue(value.startsWith("_"), "Forventet hashet CSS-modulklasse, fikk '$value'")
        }
    }

    @Test
    fun `klassekonstanter inneholder ikke ubehandlede plassholdere`() {
        assertFalse(Mtds.button.contains("$"), "Uinterpolert plassholder i generert kode")
        assertFalse(Mtds.button.contains("\""), "Uescapet hermetegn i generert kode")
    }

    @Test
    fun `styles css ligger paa classpath og matcher klassekonstantene`() {
        val path = "${Mtds.RESOURCE_BASE}/styles.css"
        val css = Mtds::class.java.classLoader.getResource(path)?.readText()
        assertNotNull(css, "Fant ikke $path på classpath")
        // Klassekonstantene og stilarket må komme fra samme bygg, ellers matcher ikke hashene.
        Mtds.button.split(" ").forEach { cls ->
            assertTrue(css.contains(".$cls"), "styles.css mangler klassen '$cls' fra Mtds.button")
        }
    }
}
