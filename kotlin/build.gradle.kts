import groovy.json.JsonSlurper

plugins {
    kotlin("jvm") version "2.2.21"
    `maven-publish`
    signing
}

group = "io.mattilsynet"

kotlin {
    jvmToolchain(21)
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    testImplementation(kotlin("test"))
}

// --- Kilder fra monorepoet ------------------------------------------------
//
// Begge produseres av `npm run build` i repo-rota. Vi leser dem direkte fra
// filsystemet -- ingen nedlasting fra CDN ved bygg.

val designRoot = layout.projectDirectory.dir("..")
val packageJsonFile = designRoot.file("package.json")
val stylesJsonFile = designRoot.file("mtds/styles.json")

// package.json er committet og alltid til stede -- trygt å lese under konfigurering.
val designNpmVersion: String = run {
    val f = packageJsonFile.asFile
    require(f.isFile) { "Fant ikke ${f.path}. Er kotlin/ flyttet ut av monorepoet?" }
    val json = JsonSlurper().parse(f) as Map<*, *>
    json["version"] as? String ?: error("Mangler 'version' i ${f.path}")
}

// Artefaktversjon = npm-versjon + antall commits, slik at hver publisering er unik.
// Selve designsystem-versjonen (npm) eksponeres separat som Mtds.NPM_VERSION,
// siden CDN-URL-er må bruke den og ikke artefaktversjonen.
//
// Faller tilbake til "0" både utenfor et git-repo og når git-binæren mangler,
// så bygget virker i tarball-checkouts og slanke containere.
val gitCommitCount: String = runCatching {
    providers.exec {
        commandLine("git", "rev-list", "--count", "HEAD")
        isIgnoreExitValue = true
    }.standardOutput.asText.map { it.trim() }.orNull
}.getOrNull()?.takeIf { it.isNotEmpty() } ?: "0"

version = "$designNpmVersion.$gitCommitCount"

// --- Kodegenerering -------------------------------------------------------

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

    /** styles.json-nøkler er frie strenger; gjør dem til gyldige Kotlin-identifikatorer. */
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
            |    /** Base-URL for å laste assets fra unpkg for samme versjon. */
            |    public val UNPKG_BASE: String = "https://unpkg.com/@mattilsynet/design@${'$'}NPM_VERSION/mtds"
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
    // mtds/styles.json er byggeoutput fra `npm run build`, så sjekken må være lat:
    // ellers ville `./gradlew clean` feilet i et rent checkout.
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

// IntelliJ kjører denne under Gradle-sync. Uten koblingen finnes ikke Mtds.kt før
// noen har kjørt et bygg manuelt, og hele io.mattilsynet.design vises som uresolvert
// i editoren selv om kommandolinjebygget er grønt.
tasks.named("prepareKotlinBuildScriptModel") {
    dependsOn(generateMtds)
}

// --- Test -----------------------------------------------------------------

tasks.test {
    useJUnitPlatform()
    // Røyktest: hele modulen er generert, så vi verifiserer at genereringen faktisk kjørte
    // og at versjonen stemmer med monorepoets package.json.
    systemProperty("mtds.expectedNpmVersion", designNpmVersion)
}

// --- Publisering ----------------------------------------------------------

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            from(components["java"])
            groupId = "io.mattilsynet"
            artifactId = "design-kotlin"
            pom {
                name.set("Mattilsynet designsystem - Kotlin")
                description.set("Typesikre CSS-klassekonstanter for Mattilsynets designsystem")
                url.set("https://github.com/Mattilsynet/design")
                licenses {
                    license {
                        name.set("MIT")
                    }
                }
            }
        }
    }
    repositories {
        // TODO: s01.oss.sonatype.org er nedlagt (OSSRH sunset juni 2025) -- må flyttes til
        // Central Portal. Merk også at .github/workflows/publish-maven.yml setter
        // OSSRH_USERNAME/OSSRH_PASSWORD, mens dette repoet krever sonatypeUsername/
        // sonatypePassword. POM mangler dessuten developers og scm, og det finnes ingen
        // sourcesJar/javadocJar. `publish` fungerer derfor ikke ennå.
        maven {
            name = "sonatype"
            url = uri("https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/")
            credentials(PasswordCredentials::class)
        }
    }
}

signing {
    // Signering krever nøkler som bare finnes i publiseringsjobben. Uten dette ville
    // `./gradlew build` feilet lokalt.
    setRequired { gradle.taskGraph.hasTask("publish") }
    sign(publishing.publications["mavenJava"])
}
