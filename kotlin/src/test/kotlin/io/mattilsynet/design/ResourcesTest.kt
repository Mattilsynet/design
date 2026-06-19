package io.mattilsynet.design

import kotlin.test.Test
import kotlin.test.assertNotNull

class ResourcesTest {
    @Test
    fun jarResourcesExposeCssAndStylesJson() {
        val classLoader = Thread.currentThread().contextClassLoader

        assertNotNull(classLoader.getResource("META-INF/resources/mtds/styles.css"))
        assertNotNull(classLoader.getResource("mattilsynet-design/styles.json"))
    }
}
