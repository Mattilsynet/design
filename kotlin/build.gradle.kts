import groovy.json.JsonSlurper

plugins {
    kotlin("jvm") version "2.2.21"
    `maven-publish`
}

group = "io.mattilsynet"

kotlin {
    jvmToolchain(21)
}

java {
    withSourcesJar()
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    testImplementation(kotlin("test"))
}

val designRoot = layout.projectDirectory.dir("..")
val packageJsonFile = designRoot.file("package.json")
val stylesJsonFile = designRoot.file("mtds/styles.json")

val designNpmVersion: String = run {
    val f = packageJsonFile.asFile
    require(f.isFile) { "Fant ikke ${f.path}. Er kotlin/ flyttet ut av monorepoet?" }
    val json = JsonSlurper().parse(f) as Map<*, *>
    json["version"] as? String ?: error("Mangler 'version' i ${f.path}")
}

// Clojars-releaser er immutable, så commit-count gjør hver publisering unik.
// CDN-URL-er må bruke npm-versjonen alene, som derfor eksponeres via Mtds.NPM_VERSION.
val gitCommitCount: String = runCatching {
    providers.exec {
        commandLine("git", "rev-list", "--count", "HEAD")
        isIgnoreExitValue = true
    }.standardOutput.asText.map { it.trim() }.orNull
}.getOrNull()?.takeIf { it.isNotEmpty() } ?: "0"

// SNAPSHOTs kan redeployes, i motsetning til releaser, og lar oss teste publiseringen.
val isSnapshot = providers.gradleProperty("snapshot").isPresent

version = "$designNpmVersion.$gitCommitCount" + if (isSnapshot) "-SNAPSHOT" else ""

abstract class GenerateMtds : DefaultTask() {

    @get:InputFile
    @get:PathSensitive(PathSensitivity.NONE)
    abstract val stylesJson: RegularFileProperty

    @get:Input
    abstract val npmVersion: Property<String>

    @get:OutputDirectory
    abstract val outputDir: DirectoryProperty

    private companion object {
        val KEYWORDS = setOf(
            "as", "break", "class", "continue", "do", "else", "false", "for", "fun", "if", "in",
            "interface", "is", "null", "object", "package", "return", "super", "this", "throw",
            "true", "try", "typealias", "typeof", "val", "var", "when", "while",
        )
    }

    private fun sanitize(key: String): String {
        val cleaned = key.replace(Regex("[^A-Za-z0-9_]"), "_")
        val safe = if (cleaned.firstOrNull()?.isDigit() == true) "_$cleaned" else cleaned
        return if (safe in KEYWORDS) "`$safe`" else safe
    }

    private fun escape(value: String): String =
        value.replace("\\", "\\\\").replace("\"", "\\\"").replace("$", "\${'$'}")

    /** Hindrer at en nøkkel kan lukke KDoc-blokken den beskrives i. */
    private fun escapeDoc(value: String): String = value.replace("*/", "*&#47;")

    @TaskAction
    fun generate() {
        val source = stylesJson.get().asFile
        val parsed = JsonSlurper().parse(source) as Map<*, *>

        val entries = parsed.entries
            .mapNotNull { (k, v) -> (k as? String)?.let { key -> (v as? String)?.let { key to it } } }
            .sortedBy { it.first }

        check(entries.isNotEmpty()) { "${source.path} inneholdt ingen klassemappinger." }

        val seen = mutableMapOf<String, String>()
        val consts = entries.joinToString("\n\n") { (key, value) ->
            val identifier = sanitize(key)
            seen.put(identifier, key)?.let { previous ->
                error("Nøklene '$previous' og '$key' i ${source.name} gir samme Kotlin-navn '$identifier'.")
            }
            """
            |    /** `${escapeDoc(key)}` fra designsystemets styles.json. */
            |    public val $identifier: String = "${escape(value)}"
            """.trimMargin()
        }

        val target = outputDir.get().file("io/mattilsynet/design/Mtds.kt").asFile
        target.parentFile.mkdirs()
        target.writeText(
            """
            |// GENERERT av :generateMtds fra @mattilsynet/design sin styles.json.
            |// IKKE rediger manuelt -- endringer overskrives ved neste bygg.
            |package io.mattilsynet.design
            |
            |/**
            | * Hashede CSS-modul-klasser fra @mattilsynet/design ${npmVersion.get()}.
            | *
            | * Klassenavnene hashes på nytt for hver utgivelse av designsystemet, så de skal
            | * aldri skrives direkte i markup. Bruk konstantene her i stedet.
            | *
            | * Kombiner fritt med egne klasser:
            | * ```
            | * span(classes = "${'$'}{Mtds.muted} min-egen-klasse")
            | * ```
            | */
            |public object Mtds {
            |
            |    /** Versjonen av npm-pakken disse klassene ble generert fra. */
            |    public val NPM_VERSION: String = "${escape(npmVersion.get())}"
            |
            |    /** Base-URL for å laste assets fra CDN for samme versjon. */
            |    public val CDN_BASE: String = "https://cdn.jsdelivr.net/npm/@mattilsynet/design@${'$'}NPM_VERSION/mtds"
            |
            |$consts
            |}
            |
            """.trimMargin(),
        )

        logger.lifecycle("Genererte ${entries.size} klassekonstanter fra ${source.name} (v${npmVersion.get()}).")
    }
}

val generateMtds by tasks.registering(GenerateMtds::class) {
    group = "build"
    description = "Genererer Mtds-klassekonstanter fra designsystemets styles.json."
    stylesJson.fileProvider(
        providers.provider {
            stylesJsonFile.asFile.also {
                require(it.isFile) {
                    "Fant ikke ${it.path}. Kjør 'npm ci && npm run build' i repo-rota først."
                }
            }
        },
    )
    npmVersion.set(designNpmVersion)
    outputDir.set(layout.buildDirectory.dir("generated/mtds/kotlin"))
}

kotlin.sourceSets.named("main") {
    kotlin.srcDir(generateMtds)
}

// Uten denne kjører ikke genereringen under IDE-sync, og io.mattilsynet.design
// vises som uresolvert i IntelliJ til noen har kjørt et bygg manuelt.
tasks.named("prepareKotlinBuildScriptModel") {
    dependsOn(generateMtds)
}

tasks.test {
    useJUnitPlatform()
    systemProperty("mtds.expectedNpmVersion", designNpmVersion)
}

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            from(components["java"])
            groupId = "io.mattilsynet"
            artifactId = "design-kotlin"
            pom {
                name.set("Mattilsynet designsystem - Kotlin")
                description.set("Typesikre CSS-klassekonstanter for Mattilsynets designsystem")
                url.set("https://github.com/Mattilsynet/design/tree/main/kotlin")
                licenses {
                    // Clojars avviser deploys uten lisens.
                    license {
                        name.set("MIT")
                        url.set("https://opensource.org/licenses/MIT")
                    }
                }
                scm {
                    connection.set("scm:git:git://github.com/mattilsynet/design.git")
                    developerConnection.set("scm:git:ssh://git@github.com/mattilsynet/design.git")
                    url.set("https://github.com/Mattilsynet/design/tree/main/kotlin")
                }
            }
        }
    }
    repositories {
        maven {
            name = "clojars"
            url = uri("https://clojars.org/repo")
            credentials {
                username = System.getenv("CLOJARS_USERNAME")
                password = System.getenv("CLOJARS_PASSWORD")
            }
        }
    }
}

// Clojars er et rent Maven-repo, og ingen konsument bruker Gradle-variantmetadata.
tasks.withType<GenerateModuleMetadata>().configureEach {
    enabled = false
}
