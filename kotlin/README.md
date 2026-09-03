# Mattilsynet designsystem — Kotlin

Typesikre CSS-klassekonstanter for [Mattilsynets designsystem](https://design.mattilsynet.no),
for JVM-apper som server-rendrer HTML (Ktor + kotlinx.html, htmx, Thymeleaf, …).

```kotlin
implementation("io.mattilsynet:design-kotlin:<versjon>")
```

## Hvorfor

Designsystemets CSS-klasser er **hashede CSS-moduler** — `button` kompileres til
`_button_14zqc_1 _ds-button_1s2lo_1`, og hashen endres for hver utgivelse. En frontend
med bundler får dette gratis; et JVM-backend gjør ikke det.

Denne pakken inneholder klassemappingen for én bestemt versjon av designsystemet,
generert fra pakkens `styles.json`. Skriv **aldri** hashede klassenavn direkte i markup.

## Bruk

```kotlin
import io.mattilsynet.design.Mtds

h1(classes = Mtds.heading) { +"Drikkevann" }
div(classes = Mtds.card) { … }
table(classes = Mtds.table) { … }
```

Kombiner fritt med egne klasser — det er vanlige strenger:

```kotlin
span(classes = "${Mtds.muted} htmx-indicator") { … }
```

Styling ellers styres av `data-*`-attributter (`data-variant`, `data-size`, `data-color`,
`data-pad`, `data-gap`, …), ikke av flere klasser:

```kotlin
button(classes = Mtds.button) {
    attributes["data-variant"] = "tertiary"
    +"Logg inn"
}
```

### Assets

Pakken inneholder **ingen** assets — kun klassekonstanter (~4 KB). CSS, web components
og ikoner lastes fra CDN. `Mtds.UNPKG_BASE` peker på samme versjon som konstantene, så
klasser og stilark aldri kommer i utakt:

```kotlin
link(rel = "stylesheet", href = "${Mtds.UNPKG_BASE}/styles.css")
script(src = "${Mtds.UNPKG_BASE}/index.iife.js") { defer = true }
link(rel = "icon", href = "${Mtds.UNPKG_BASE}/favicon.svg", type = "image/svg+xml")
```

`Mtds.NPM_VERSION` gir npm-versjonen alene om du trenger den (f.eks. mot en intern speiling
av CDN-en).

> `@mattilsynet/design/react` er React-komponenter og kan ikke brukes i server-rendret
> kotlinx.html — bruk CSS- og web-components-laget.

### Finne riktig markup

Ikke gjett. Bruk enten Storybook på [design.mattilsynet.no](https://design.mattilsynet.no)
(«Show code»), eller pakkekilden `mtds/<komponent>/<komponent>.js`, som viser element,
klasse og `data-*`-attributter.

## Versjonering

Artefaktversjonen er `<npm-versjon>.<antall commits>`, f.eks. `3.4.5.1271`. Selve
designsystem-versjonen ligger i `Mtds.NPM_VERSION` (`3.4.5`) og er den som må brukes i
CDN-URL-er.

Konstantene er `val`, ikke `const val` — verdiene inlines derfor **ikke** i konsumentens
bytecode. Bytter du JAR-versjon uten full rekompilering, følger klassenavnene JAR-et som
faktisk ligger på classpath.

## Bygge lokalt

Genereringen leser `mtds/styles.json` fra monorepoet, som produseres av npm-bygget:

```bash
npm ci && npm run build     # i repo-rota
cd kotlin && ./gradlew build
```

Ingen nettverkstilgang og ingen Clojure-verktøykjede kreves — i motsetning til
`clojure/`-modulen, som er en separat pakking av det samme designsystemet for Clojars.

`:generateMtds` skriver `build/generated/mtds/kotlin/io/mattilsynet/design/Mtds.kt`.
Modulen har ingen håndskrevne hovedkilder; alt under `io.mattilsynet.design` er generert.

### I IntelliJ

`kotlin/` er et frittstående Gradle-bygg nede i et npm-monorepo, så det må lenkes
eksplisitt: Gradle-vinduet → **+** → velg `kotlin/build.gradle.kts`.

Kodegenereringen er hektet på `prepareKotlinBuildScriptModel`, som IDE-en kjører under
sync. `Mtds` resolver derfor i editoren rett etter sync, uten at du må kjøre et bygg
først. Krever at `npm run build` har kjørt, siden `mtds/styles.json` er input.

## Status

`./gradlew build` fungerer. **`./gradlew publish` gjør ikke det ennå** — se TODO-en i
`build.gradle.kts`: OSSRH-endepunktet er nedlagt, credential-navnene matcher ikke
workflowen, og `sourcesJar`/`javadocJar`/`developers`/`scm` mangler for Maven Central.

Ikoner er bevisst utelatt. `mtds/icons/` inneholder kun sju domenespesifikke ikoner,
mens apper i praksis trenger Phosphor-settet, som designsystemet foreløpig ikke shipper.
