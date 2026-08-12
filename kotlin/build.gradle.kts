plugins {
    kotlin("jvm") version "1.9.22"
    `maven-publish`
    signing
}

group = "io.mattilsynet"
val versionParts = providers.execOutputOf {
    commandLine("sh", "-c", "node -p \"require('./../package.json').version\"")
}.get().trim().split(".")
val gitCommits = providers.execOutputOf {
    commandLine("git", "rev-list", "--count", "HEAD")
}.get().trim()
version = "${versionParts[0]}.${versionParts[1]}.${versionParts[2]}.$gitCommits"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
}

val clojureProjectDir = file("../clojure")
val generatedResourcesDir = layout.buildDirectory.dir("generated-resources")

tasks.register("prepareResources") {
    dependsOn("processResources")
    doLast {
        val cwd = clojureProjectDir
        listOf(
            "build-css-modules",
            "export-all-svgs",
            "export-css",
            "export-assets"
        ).forEach { taskName ->
            exec {
                workingDir(cwd)
                commandLine("clojure", "-A:dev", "-T:build", taskName)
            }
        }
        copy {
            from(cwd.resolve("resources/mattilsynet-design"))
            into(generatedResourcesDir.map { it.dir("mattilsynet-design") })
        }
        copy {
            from(cwd.resolve("resources/public/mtds"))
            into(generatedResourcesDir.map { it.dir("public/mtds") })
        }
    }
}

tasks.register("generateKotlinSources") {
    dependsOn("prepareResources")
    val outputDir = layout.buildDirectory.dir("generated-sources/kotlin")
    doLast {
        outputDir.get().asFile.mkdirs()
        val pkg = "io.mattilsynet.design"
        val cssModulesFile = generatedResourcesDir.get().asFile.resolve("mattilsynet-design/css-modules.edn")
        val cssModulesContent = if (cssModulesFile.exists()) {
            // Very simple EDN -> Kotlin map conversion for class -> [hashes]
            // Expect format { "logo" [_logo_...] ... }
            val text = cssModulesFile.readText()
            // Extract "key" [value] pairs via regex
            val pairs = Regex("\"([^\"]+)\"\\s*\\[([^\\]]+)\\]").findAll(text)
                .map { m ->
                    val key = m.groupValues[1]
                    val vals = m.groupValues[2].trim().split("\\s+".toRegex()).joinToString(", ", "\"", "\"")
                    "\"${key.replace("\"", "\\\"")}\" to \"$vals\""
                }.joinToString(",\n         ")
            """
            package $pkg
            object CssModules {
              private val map = mapOf(
               $pairs
              )
              fun resolve(vararg names: String): List<String> =
                names.flatMap { name ->
                  map[name]?.let { listOf(it) } ?: listOf(name)
                }
              fun of(name: String) = map[name] ?: name
            }
            """
        } else {
            """
            package $pkg
            object CssModules {
              private val map = mapOf<String, String>()
              fun resolve(vararg names: String): List<String> = names.toList()
              fun of(name: String) = name
            }
            """
        }
        outputDir.get().asFile.resolve("CssModules.kt").writeText(cssModulesContent)

        // Icons
        val iconsDir = generatedResourcesDir.get().asFile.resolve("mattilsynet-design/icons")
        val iconEntries = if (iconsDir.exists()) {
            iconsDir.walkTopDown().filter { it.isFile && it.name.endsWith(".edn") }
                .map { file ->
                    val rel = file.relativeTo(iconsDir).path.removeSuffix(".edn").replace("/", "/")
                    val name = rel.uppercase().replace("/", "_").replace("-", "_")
                    "  ${name}(\"icon/${rel}\", \"mattilsynet-design/icons/${rel}.edn\")"
                }.toList()
        } else emptyList()
        val iconFile = """
        package $pkg.registry
        public enum class Icon(val key: String, val resourcePath: String) {
        ${iconEntries.joinToString(",\n")}
        }
        """.trimIndent()
        outputDir.get().asFile.resolve("IconRegistry.kt").writeText(iconFile)

        // Illustrations
        val illDir = generatedResourcesDir.get().asFile.resolve("mattilsynet-design/illustrations")
        val illEntries = if (illDir.exists()) {
            illDir.walkTopDown().filter { it.isFile && it.name.endsWith(".edn") }
                .map { file ->
                    val rel = file.relativeTo(illDir).path.removeSuffix(".edn").replace("/", "/")
                    val name = rel.uppercase().replace("/", "_").replace("-", "_")
                    "  ${name}(\"illustration/${rel}\", \"mattilsynet-design/illustrations/${rel}.edn\")"
                }.toList()
        } else emptyList()
        val illFile = """
        package $pkg.registry
        public enum class Illustration(val key: String, val resourcePath: String) {
        ${illEntries.joinToString(",\n")}
        }
        """.trimIndent()
        outputDir.get().asFile.resolve("IllustrationRegistry.kt").writeText(illFile)
    }
}

sourceSets {
    main {
        kotlin.srcDir(layout.buildDirectory.dir("generated-sources/kotlin"))
        resources.srcDir(generatedResourcesDir)
    }
}

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            from(components["java"])
            groupId = "io.mattilsynet"
            artifactId = "design-kotlin"
            pom {
                name.set("Mattilsynet designsystem - Kotlin")
                description.set("Kotlin wrapper for Mattilsynet designsystem")
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
        maven {
            name = "sonatype"
            url = uri("https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/")
            credentials(PasswordCredentials::class)
        }
    }
}

signing {
    sign(publishing.publications["mavenJava"])
}
