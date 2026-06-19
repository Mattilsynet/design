import groovy.json.JsonSlurper
import java.io.File
import java.util.Locale

plugins {
    kotlin("jvm") version "2.0.21"
    `java-library`
    `maven-publish`
}

val designRoot = layout.projectDirectory.dir("..")
val mtdsDir = designRoot.dir("mtds")
val componentMetadataDir = mtdsDir.dir("component-metadata")
val stylesJson = mtdsDir.file("styles.json")
val packageJson = designRoot.file("package.json")
val generatedSourcesDir = layout.buildDirectory.dir("generated/mtds")
val generatedResourcesDir = layout.buildDirectory.dir("generated/resources/main")

fun packageVersion(): String {
    val text = packageJson.asFile.readText()
    return Regex("\"version\"\\s*:\\s*\"([^\"]+)\"")
        .find(text)
        ?.groupValues
        ?.get(1)
        ?: "0.0.0-SNAPSHOT"
}

group = "io.mattilsynet"
version = packageVersion()

description = "Kotlin kotlinx-html + HTMX helpers for @mattilsynet/design"

base {
    archivesName.set("design-htmx-kotlin")
}

java {
    withSourcesJar()
}

kotlin {
    sourceSets {
        val main by getting {
            kotlin.srcDir(generatedSourcesDir)
        }
    }
}

sourceSets {
    named("main") {
        resources.srcDir(generatedResourcesDir)
    }
}

dependencies {
    api("org.jetbrains.kotlinx:kotlinx-html-jvm:0.11.0")

    testImplementation(kotlin("test-junit5"))
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.4")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

data class TagSpec(
    val builder: String,
    val receiver: String,
    val customTagName: String? = null,
)

data class ComponentParameter(
    val name: String,
    val attribute: String,
    val type: String,
    val enumName: String?,
    val values: List<String>,
    val required: Boolean,
    val defaultValue: String?,
)

fun requireBuildOutput(file: File, displayName: String) {
    if (!file.exists()) {
        throw GradleException(
            "Missing $displayName at ${file.relativeTo(designRoot.asFile)}. Run `npm run build` in the repository root before building the Kotlin package."
        )
    }
}

fun quote(value: String): String = buildString {
    append('"')
    value.forEach { char ->
        when (char) {
            '\\' -> append("\\\\")
            '"' -> append("\\\"")
            '\n' -> append("\\n")
            '\r' -> append("\\r")
            '\t' -> append("\\t")
            else -> append(char)
        }
    }
    append('"')
}

fun Map<String, Any?>.string(key: String): String? = this[key]?.toString()
fun Map<String, Any?>.boolean(key: String, default: Boolean = false): Boolean =
    when (val value = this[key]) {
        is Boolean -> value
        null -> default
        else -> value.toString().toBooleanStrictOrNull() ?: default
    }

@Suppress("UNCHECKED_CAST")
fun Map<String, Any?>.map(key: String): Map<String, Any?> =
    this[key] as? Map<String, Any?> ?: emptyMap()

@Suppress("UNCHECKED_CAST")
fun Map<String, Any?>.listOfMaps(key: String): List<Map<String, Any?>> =
    this[key] as? List<Map<String, Any?>> ?: emptyList()

@Suppress("UNCHECKED_CAST")
fun parseJsonMap(file: File): Map<String, Any?> = JsonSlurper().parse(file) as Map<String, Any?>

fun tagSpec(tag: String): TagSpec {
    val generatedElementTags = setOf(
        "label",
        "fieldset",
        "legend",
        "section",
        "nav",
        "menu",
        "ol",
        "li",
        "details",
        "summary",
        "dialog",
        "select",
        "textarea",
        "table",
        "thead",
        "tbody",
        "tfoot",
        "tr",
        "th",
        "td",
        "caption",
    )

    return when {
        tag == "a" -> TagSpec("a", "A")
        tag == "button" -> TagSpec("button", "BUTTON")
        tag == "div" -> TagSpec("div", "DIV")
        tag == "h1" -> TagSpec("h1", "H1")
        tag == "h2" -> TagSpec("h2", "H2")
        tag == "h3" -> TagSpec("h3", "H3")
        tag == "h4" -> TagSpec("h4", "H4")
        tag == "h5" -> TagSpec("h5", "H5")
        tag == "h6" -> TagSpec("h6", "H6")
        tag == "hr" -> TagSpec("hr", "HR")
        tag == "input" -> TagSpec("input", "INPUT")
        tag == "output" -> TagSpec("output", "OUTPUT")
        tag == "p" -> TagSpec("p", "P")
        tag == "small" -> TagSpec("small", "SMALL")
        tag == "span" -> TagSpec("span", "SPAN")
        tag in generatedElementTags -> TagSpec("mtdsGeneratedElement", "MtdsGeneratedElement", tag)
        tag.startsWith("ds-") || tag.startsWith("u-") || tag.startsWith("mtds-") -> TagSpec("mtdsGeneratedElement", "MtdsGeneratedElement", tag)
        else -> throw GradleException("Unsupported Kotlin HTML tag `$tag` in component metadata")
    }
}

fun componentOpenCall(tagSpec: TagSpec, className: String): String = when (val customTagName = tagSpec.customTagName) {
    null -> "${tagSpec.builder}(classes = Mtds.c(${quote(className)}))"
    else -> "${tagSpec.builder}(${quote(customTagName)}, classes = Mtds.c(${quote(className)}))"
}

fun upperFirst(value: String): String = value.replaceFirstChar { char ->
    if (char.isLowerCase()) char.titlecase(Locale.ROOT) else char.toString()
}

fun lowerFirst(value: String): String = value.replaceFirstChar { char ->
    char.lowercase(Locale.ROOT)
}

fun camelFromAttribute(attribute: String): String =
    attribute
        .removePrefix("data-")
        .split('-', '_')
        .filter { it.isNotBlank() }
        .mapIndexed { index, part -> if (index == 0) lowerFirst(part) else upperFirst(part) }
        .joinToString("")

fun enumEntryName(value: String): String {
    val digitWords = mapOf(
        '0' to "Zero",
        '1' to "One",
        '2' to "Two",
        '3' to "Three",
        '4' to "Four",
        '5' to "Five",
        '6' to "Six",
        '7' to "Seven",
        '8' to "Eight",
        '9' to "Nine",
    )

    if (value.all { it.isDigit() }) return "Value$value"

    val rawParts = value.split(Regex("[^A-Za-z0-9]+"))
        .filter { it.isNotBlank() }

    val name = rawParts.joinToString("") { raw ->
        buildString {
            raw.forEachIndexed { index, char ->
                when {
                    index == 0 && char.isDigit() -> append(digitWords[char] ?: "Value$char")
                    index == 0 -> append(char.uppercaseChar())
                    else -> append(char)
                }
            }
        }
    }

    return name.ifBlank { "Value" }
}

fun parameterFromJson(json: Map<String, Any?>): ComponentParameter {
    val attribute = json.string("attribute") ?: throw GradleException("Component parameter is missing `attribute`")
    val type = json.string("type") ?: "string"
    val values = (json["values"] as? List<*>)?.map { it.toString() } ?: emptyList()
    return ComponentParameter(
        name = json.string("name") ?: camelFromAttribute(attribute),
        attribute = attribute,
        type = type,
        enumName = json.string("enumName"),
        values = values,
        required = json.boolean("required"),
        defaultValue = json.string("default"),
    )
}

fun parameterDeclaration(parameter: ComponentParameter): String = when (parameter.type) {
    "enum" -> {
        val enumName = parameter.enumName ?: throw GradleException("Enum parameter `${parameter.name}` is missing `enumName`")
        "${parameter.name}: $enumName? = null"
    }
    "boolean" -> "${parameter.name}: Boolean = false"
    "string" -> when {
        parameter.required -> "${parameter.name}: String"
        parameter.defaultValue != null -> "${parameter.name}: String = ${quote(parameter.defaultValue)}"
        else -> "${parameter.name}: String? = null"
    }
    else -> throw GradleException("Unsupported parameter type `${parameter.type}` for `${parameter.name}`")
}

fun parameterStatement(parameter: ComponentParameter): String = when (parameter.type) {
    "enum" -> "${parameter.name}?.let { attributes[${quote(parameter.attribute)}] = it.value }"
    "boolean" -> "if (${parameter.name}) attributes[${quote(parameter.attribute)}] = \"true\""
    "string" -> when {
        parameter.required || parameter.defaultValue != null -> "attributes[${quote(parameter.attribute)}] = ${parameter.name}"
        else -> "${parameter.name}?.let { attributes[${quote(parameter.attribute)}] = it }"
    }
    else -> throw GradleException("Unsupported parameter type `${parameter.type}` for `${parameter.name}`")
}

fun enumBlock(parameter: ComponentParameter): String {
    val enumName = parameter.enumName ?: throw GradleException("Enum parameter `${parameter.name}` is missing `enumName`")
    if (parameter.values.isEmpty()) throw GradleException("Enum parameter `${parameter.name}` has no values")

    val usedNames = mutableMapOf<String, Int>()
    val entries = parameter.values.joinToString(",\n") { value ->
        val baseName = enumEntryName(value)
        val count = usedNames.getOrDefault(baseName, 0)
        usedNames[baseName] = count + 1
        val entryName = if (count == 0) baseName else "$baseName${count + 1}"
        "    $entryName(${quote(value)})"
    }

    return """
        |enum class $enumName(val value: String) {
        |$entries
        |}
    """.trimMargin()
}

fun generateStyles(styles: Map<String, Any?>, outputDir: File) {
    val packageDir = outputDir.resolve("io/mattilsynet/design")
    packageDir.mkdirs()

    val entries = styles.entries
        .sortedBy { it.key }
        .joinToString(",\n") { (key, value) -> "        ${quote(key)} to ${quote(value.toString())}" }

    packageDir.resolve("GeneratedStyles.kt").writeText(
        """
            |package io.mattilsynet.design
            |
            |internal const val GeneratedMtdsVersion = ${quote(project.version.toString())}
            |
            |internal object GeneratedStyles {
            |    val classes: Map<String, String> = mapOf(
            |$entries
            |    )
            |}
            |
        """.trimMargin()
    )
}

fun generateEnums(metadataFiles: List<File>, outputDir: File) {
    val enums = linkedMapOf<String, List<String>>()

    metadataFiles.forEach { file ->
        val metadata = parseJsonMap(file)
        metadata.listOfMaps("parameters")
            .map(::parameterFromJson)
            .filter { it.type == "enum" }
            .forEach { parameter ->
                val enumName = parameter.enumName
                    ?: throw GradleException("Enum parameter `${parameter.name}` in ${file.relativeTo(designRoot.asFile)} is missing `enumName`")
                val existing = enums[enumName]
                if (existing != null && existing != parameter.values) {
                    throw GradleException("Enum `$enumName` is declared with conflicting values in component metadata")
                }
                enums[enumName] = parameter.values
            }
    }

    val body = buildString {
        appendLine("@file:Suppress(\"EnumEntryName\")")
        appendLine()
        appendLine("package io.mattilsynet.design.html")
        appendLine()
        appendLine("// Generated from component metadata. Do not edit generated output by hand.")
        enums.forEach { (enumName, values) ->
            appendLine()
            appendLine(enumBlock(ComponentParameter(enumName.replaceFirstChar { it.lowercase(Locale.ROOT) }, "", "enum", enumName, values, false, null)))
        }
    }

    val packageDir = outputDir.resolve("io/mattilsynet/design/html")
    packageDir.mkdirs()
    packageDir.resolve("Enums.kt").writeText(body)
}

fun generateComponent(metadataFile: File, metadata: Map<String, Any?>, styles: Map<String, Any?>, outputDir: File) {
    val name = metadata.string("name") ?: throw GradleException("${metadataFile.path} is missing `name`")
    val className = metadata.string("className") ?: throw GradleException("$name is missing `className`")
    val tag = metadata.string("tag") ?: throw GradleException("$name is missing `tag`")
    val content = metadata.boolean("content", default = true)
    val tagSpec = tagSpec(tag)
    val parameters = metadata.listOfMaps("parameters").map(::parameterFromJson)
    val fixedAttributes = metadata.map("fixedAttributes") + metadata.map("defaultAttributes")

    if (!styles.containsKey(className)) {
        throw GradleException("$name references missing className `$className` from ${metadataFile.relativeTo(designRoot.asFile)}")
    }

    val functionParameters = buildList {
        parameters.forEach { add("    ${parameterDeclaration(it)},") }
        add("    attrs: ${tagSpec.receiver}.() -> Unit = {},")
        if (content) add("    content: ${tagSpec.receiver}.() -> Unit = {},")
    }.joinToString("\n")

    val statements = buildList {
        fixedAttributes.entries.sortedBy { it.key }.forEach { (attribute, value) ->
            add("        attributes[${quote(attribute)}] = ${quote(value.toString())}")
        }
        parameters.forEach { add("        ${parameterStatement(it)}") }
        add("        attrs()")
        if (content) add("        content()")
    }.joinToString("\n")

    val generatedFrom = metadataFile.relativeTo(designRoot.asFile).invariantSeparatorsPath
    val body = """
        |@file:Suppress("FunctionName")
        |
        |package io.mattilsynet.design.html
        |
        |import io.mattilsynet.design.Mtds
        |import kotlinx.html.*
        |
        |// Generated from $generatedFrom. Do not edit generated output by hand.
        |
        |fun FlowContent.$name(
        |$functionParameters
        |) {
        |    ${componentOpenCall(tagSpec, className)} {
        |$statements
        |    }
        |}
        |
    """.trimMargin()

    val packageDir = outputDir.resolve("io/mattilsynet/design/html")
    packageDir.mkdirs()
    packageDir.resolve("$name.kt").writeText(body)
}

val generateMtdsKotlin by tasks.registering {
    val metadataTree = componentMetadataDir.asFileTree.matching {
        include("**/*.component.json")
    }

    inputs.file(stylesJson)
    inputs.files(metadataTree)
    inputs.file(packageJson)
    outputs.dir(generatedSourcesDir)

    doLast {
        requireBuildOutput(stylesJson.asFile, "styles.json")
        requireBuildOutput(componentMetadataDir.asFile, "component metadata directory")

        val outputDir = generatedSourcesDir.get().asFile
        outputDir.deleteRecursively()
        outputDir.mkdirs()

        val styles = parseJsonMap(stylesJson.asFile)
        generateStyles(styles, outputDir)

        val metadataFiles = componentMetadataDir.asFileTree.matching {
            include("**/*.component.json")
        }.files.sortedBy { it.invariantSeparatorsPath }

        if (metadataFiles.isEmpty()) {
            throw GradleException("No component metadata files found under mtds/component-metadata. Run `npm run build` in the repository root before building the Kotlin package.")
        }

        generateEnums(metadataFiles, outputDir)

        metadataFiles.forEach { file ->
            generateComponent(file, parseJsonMap(file), styles, outputDir)
        }
    }
}

val verifyMtdsGeneratorFixture by tasks.registering {
    group = "verification"
    description = "Verifies Kotlin generator support for native/custom tags and parameter edge cases."

    val fixtureOutputDir = layout.buildDirectory.dir("generator-fixture")
    outputs.dir(fixtureOutputDir)

    doLast {
        val root = fixtureOutputDir.get().asFile
        val metadataDir = root.resolve("component-metadata")
        val outputDir = root.resolve("generated")
        root.deleteRecursively()
        metadataDir.mkdirs()
        outputDir.mkdirs()

        fun writeComponent(
            fileName: String,
            name: String,
            tag: String,
            content: Boolean = true,
            extraJson: String = "",
        ) {
            metadataDir.resolve(fileName).writeText(
                """
                    |{
                    |  "name": "${name}",
                    |  "className": "fixture",
                    |  "tag": "${tag}",
                    |  "content": ${content}${extraJson}
                    |}
                    |
                """.trimMargin()
            )
        }

        metadataDir.resolve("fixture-primary.component.json").writeText(
            """
                |{
                |  "name": "FixturePrimary",
                |  "className": "fixture",
                |  "tag": "div",
                |  "content": true,
                |  "fixedAttributes": {
                |    "data-fixed": "fixed"
                |  },
                |  "defaultAttributes": {
                |    "role": "button"
                |  },
                |  "parameters": [
                |    {
                |      "name": "label",
                |      "attribute": "aria-label",
                |      "type": "string",
                |      "required": true
                |    },
                |    {
                |      "name": "tone",
                |      "attribute": "data-tone",
                |      "type": "enum",
                |      "enumName": "FixtureTone",
                |      "values": ["primary", "25", "true"]
                |    },
                |    {
                |      "name": "enabled",
                |      "attribute": "data-enabled",
                |      "type": "boolean"
                |    }
                |  ]
                |}
                |
            """.trimMargin()
        )

        writeComponent("fixture-secondary.component.json", "FixtureSecondary", "span")
        writeComponent("fixture-input.component.json", "FixtureInput", "input", content = false)

        listOf(
            "label",
            "fieldset",
            "legend",
            "section",
            "nav",
            "menu",
            "ol",
            "li",
            "details",
            "summary",
            "dialog",
            "select",
            "textarea",
            "table",
            "thead",
            "tbody",
            "tfoot",
            "tr",
            "th",
            "td",
            "caption",
        ).forEach { tag ->
            val name = "Native" + tag.split("-").joinToString("") { upperFirst(it) }
            writeComponent("native-$tag.component.json", name, tag)
        }

        listOf("ds-fixture", "u-progress", "mtds-chart").forEach { tag ->
            val name = "Custom" + tag.split("-").joinToString("") { upperFirst(it) }
            writeComponent("custom-$tag.component.json", name, tag)
        }

        val styles = mapOf<String, Any?>("fixture" to "fixture_hash")
        val metadataFiles = metadataDir.listFiles { file -> file.name.endsWith(".component.json") }
            ?.sortedBy { it.invariantSeparatorsPath }
            ?: emptyList()

        generateEnums(metadataFiles, outputDir)
        metadataFiles.forEach { file ->
            generateComponent(file, parseJsonMap(file), styles, outputDir)
        }

        val packageDir = outputDir.resolve("io/mattilsynet/design/html")
        fun generatedSource(name: String): String = packageDir.resolve("$name.kt").readText()
        fun assertContains(text: String, snippet: String, description: String) {
            if (!text.contains(snippet)) throw GradleException("Generator fixture missing $description: $snippet")
        }
        fun assertNotContains(text: String, snippet: String, description: String) {
            if (text.contains(snippet)) throw GradleException("Generator fixture unexpectedly contains $description: $snippet")
        }

        val enums = packageDir.resolve("Enums.kt").readText()
        assertContains(enums, "Value25(\"25\")", "numeric enum entry")
        assertContains(enums, "True(\"true\")", "boolean-like enum entry")

        val primary = generatedSource("FixturePrimary")
        assertContains(primary, "label: String,", "required string parameter")
        assertContains(primary, "tone: FixtureTone? = null,", "enum parameter")
        assertContains(primary, "enabled: Boolean = false,", "boolean parameter")
        assertContains(primary, "attributes[\"data-fixed\"] = \"fixed\"", "fixed attribute")
        assertContains(primary, "attributes[\"role\"] = \"button\"", "default attribute")

        val input = generatedSource("FixtureInput")
        assertNotContains(input, "content:", "content parameter for no-content element")
        assertNotContains(input, "content()", "content invocation for no-content element")

        assertContains(generatedSource("FixturePrimary"), "fun FlowContent.FixturePrimary", "first family contract")
        assertContains(generatedSource("FixtureSecondary"), "fun FlowContent.FixtureSecondary", "second family contract")
        assertContains(generatedSource("NativeLabel"), "mtdsGeneratedElement(\"label\", classes = Mtds.c(\"fixture\"))", "native generated element tag")
        assertContains(generatedSource("CustomDsFixture"), "mtdsGeneratedElement(\"ds-fixture\", classes = Mtds.c(\"fixture\"))", "ds-* custom element tag")
        assertContains(generatedSource("CustomUProgress"), "mtdsGeneratedElement(\"u-progress\", classes = Mtds.c(\"fixture\"))", "u-* custom element tag")
        assertContains(generatedSource("CustomMtdsChart"), "mtdsGeneratedElement(\"mtds-chart\", classes = Mtds.c(\"fixture\"))", "mtds-* custom element tag")
    }
}

val copyMtdsResources by tasks.registering(Sync::class) {
    from(mtdsDir.asFile) {
        include("styles.css")
        include("index.iife.js")
        include("atlas.iife.js")
        include("favicon*")
        include("logo*.svg")
        include("ai/**")
        include("icons/**")
        include("illustrations/**")
        into("META-INF/resources/mtds")
    }

    from(mtdsDir.asFile) {
        include("styles.json")
        into("mattilsynet-design")
    }

    into(generatedResourcesDir)

    doFirst {
        requireBuildOutput(mtdsDir.asFile, "mtds directory")
        requireBuildOutput(mtdsDir.file("styles.css").asFile, "styles.css")
        requireBuildOutput(mtdsDir.file("styles.json").asFile, "styles.json")
    }
}

tasks.named("compileKotlin") {
    dependsOn(generateMtdsKotlin)
}

tasks.named("processResources") {
    dependsOn(copyMtdsResources)
}

tasks.named("check") {
    dependsOn(verifyMtdsGeneratorFixture)
}

tasks.named("sourcesJar") {
    dependsOn(generateMtdsKotlin)
    dependsOn(copyMtdsResources)
}

tasks.test {
    useJUnitPlatform()
    workingDir = projectDir
}

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            from(components["java"])
            artifactId = "design-htmx-kotlin"

            pom {
                name.set("Mattilsynet Design Kotlin HTMX")
                description.set(project.description)
                url.set("https://github.com/Mattilsynet/design")
                licenses {
                    license {
                        name.set("MIT")
                        url.set("https://opensource.org/license/mit")
                    }
                }
            }
        }
    }
}
