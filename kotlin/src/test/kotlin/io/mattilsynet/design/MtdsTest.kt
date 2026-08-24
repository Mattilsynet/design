package io.mattilsynet.design

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/**
 * Røyktest for kodegenereringen. Hele modulen er generert fra designsystemets
 * `styles.json`, så disse testene er den eneste reelle verifikasjonen av at
 * `:generateMtds` kjørte og produserte noe fornuftig.
 */
class MtdsTest {

    @Test
    fun `npm-versjon stemmer med monorepoets package json`() {
        val expected = System.getProperty("mtds.expectedNpmVersion")
        assertFalse(expected.isNullOrBlank(), "Testoppsettet satte ikke mtds.expectedNpmVersion")
        assertEquals(expected, Mtds.NPM_VERSION)
    }

    @Test
    fun `unpkg-base peker paa samme versjon`() {
        assertEquals("https://unpkg.com/@mattilsynet/design@${Mtds.NPM_VERSION}/mtds", Mtds.UNPKG_BASE)
    }

    @Test
    fun `kjente komponentklasser er generert og hashet`() {
        // Verdiene er hashede CSS-moduler, f.eks. "_button_14zqc_1 _ds-button_1s2lo_1".
        // Vi låser ikke hashen -- den endres hver utgivelse -- men formen skal holde.
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
}
