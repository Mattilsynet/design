package io.mattilsynet.design

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class MtdsTest {
    @Test
    fun resolvesClassesFromGeneratedStylesMap() {
        val button = Mtds.c("button")
        val alert = Mtds.c("alert")

        assertTrue(button.isNotBlank())
        assertTrue(alert.isNotBlank())
        assertEquals("$button $alert", Mtds.c("button alert"))
    }

    @Test
    fun unknownClassesFailFast() {
        assertFailsWith<IllegalArgumentException> {
            Mtds.c("does-not-exist")
        }
    }
}
