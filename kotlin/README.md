# Mattilsynet designsystem — Kotlin

Typesikre CSS-klassekonstanter for [Mattilsynets designsystem](https://design.mattilsynet.no),
for JVM-apper som server-rendrer HTML (Ktor + kotlinx.html, htmx, Thymeleaf, …).

Pakken ligger på [Clojars](https://clojars.org/io.mattilsynet/design-kotlin), som ikke er
et av Gradles standardrepoer. Legg det derfor til eksplisitt:

```kotlin
repositories {
    mavenCentral()
    maven("https://repo.clojars.org")
}

dependencies {
    implementation("io.mattilsynet:design-kotlin:<versjon>")
}
```

<details>
<summary>Maven</summary>

```xml
<repositories>
  <repository>
    <id>clojars</id>
    <url>https://repo.clojars.org/</url>
  </repository>
</repositories>

<dependency>
  <groupId>io.mattilsynet</groupId>
  <artifactId>design-kotlin</artifactId>
  <version>VERSJON</version>
</dependency>
```

</details>

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
og ikoner lastes fra [jsDelivr](https://www.jsdelivr.com/). `Mtds.CDN_BASE` peker på samme
versjon som konstantene, så klasser og stilark aldri kommer i utakt:

```kotlin
link(rel = "stylesheet", href = "${Mtds.CDN_BASE}/styles.css")
script(src = "${Mtds.CDN_BASE}/index.iife.js") { defer = true }
link(rel = "icon", href = "${Mtds.CDN_BASE}/favicon.svg", type = "image/svg+xml")
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

Artefaktversjonen er `<npm-versjon>.<antall commits i repoet>`, f.eks. `3.5.0.1282`. Selve
designsystem-versjonen ligger i `Mtds.NPM_VERSION` (`3.5.0`) og er den som må brukes i
CDN-URL-er.

> Merk at `io.mattilsynet/design` (Clojure-pakken) teller commits som rører `clojure/`,
> ikke hele repoet. Samme designsystemversjon gir derfor helt ulike haletall i de to
> pakkene — `3.5.0.42` mot `3.5.0.1282`. Det er kjent og bevisst; sammenlign
> `Mtds.NPM_VERSION`, ikke artefaktversjonene, hvis du skal avgjøre om to apper kjører
> samme designsystem.

Konstantene er `val`, ikke `const val` — verdiene inlines derfor **ikke** i konsumentens
bytecode. Bytter du JAR-versjon uten full rekompilering, følger klassenavnene JAR-et som
faktisk ligger på classpath.

## Bygge lokalt

Genereringen leser `mtds/styles.json` fra monorepoet, som produseres av npm-bygget:

```bash
npm ci && npm run build     # i repo-rota
cd kotlin && ./gradlew build
```

Ingen nettverkstilgang og ingen Clojure-verktøykjede kreves. `clojure/`-modulen er en
separat pakking av det samme designsystemet, publisert til samme Clojars-gruppe, men den
pakker med seg CSS og SVG-ressurser og bygges med Clojure-verktøy.

`:generateMtds` skriver `build/generated/mtds/kotlin/io/mattilsynet/design/Mtds.kt`.
Modulen har ingen håndskrevne hovedkilder; alt under `io.mattilsynet.design` er generert.

### I IntelliJ

`kotlin/` er et frittstående Gradle-bygg nede i et npm-monorepo, så det må lenkes
eksplisitt: Gradle-vinduet → **+** → velg `kotlin/build.gradle.kts`.

Kodegenereringen er hektet på `prepareKotlinBuildScriptModel`, som IDE-en kjører under
sync. `Mtds` resolver derfor i editoren rett etter sync, uten at du må kjøre et bygg
først. Krever at `npm run build` har kjørt, siden `mtds/styles.json` er input.

## Publisering

Pakken publiseres til Clojars av `.github/workflows/publish-clojars-kotlin.yml`, som
trigges av `npm_publish_done` etter at en ny npm-versjon er sluppet — samme trigger som
`clojure/`-modulen bruker. Auth skjer med `CLOJARS_USERNAME` / `CLOJARS_PASSWORD`
(sistnevnte er et Clojars **deploy token**, ikke et passord).

Clojars krever hverken GPG-signering, javadoc-jar eller namespace-verifisering — gruppen
`io.mattilsynet` finnes allerede fra `clojure/`-pakken, og medlemmer kan legge til nye
artefaktnavn i den. Deployet valideres derimot på at POM-en har minst én lisens, at ingen
dependencies har ustabile versjoner, og at versjonen ikke allerede finnes.

To Gradle-spesifikke tilpasninger var nødvendige, begge for å gjøre opplastingen identisk
med et vanlig Maven-deploy:

- `systemProp.org.gradle.internal.publish.checksums.insecure=true` i `gradle.properties`.
  Gradle laster ellers opp `.sha256`/`.sha512` i tillegg til `.md5`/`.sha1`. Clojars
  filtrerer kun bort de to siste før validering og behandler derfor de to første som
  selvstendige artefakter uten checksum — deployet avvises med «File missing checksum».
- `GenerateModuleMetadata` er skrudd av. Clojars validerer riktignok `.module`-filer,
  men ingen konsument av denne pakken bruker Gradle-variantmetadata.

Release-versjoner på Clojars er **immutable** — samme versjon kan aldri pushes to ganger.
SNAPSHOTs kan derimot redeployes fritt, så bruk `-Psnapshot` for å røyktest hele kjeden mot
ekte Clojars uten å brenne en versjon:

```bash
CLOJARS_USERNAME=<bruker> CLOJARS_PASSWORD=<deploy-token> \
  ./gradlew publish -Psnapshot
```

Det publiserer f.eks. `3.5.0.1282-SNAPSHOT` i stedet for `3.5.0.1282`. Flagget er opt-in
via kommandolinjen nettopp for at en SNAPSHOT-versjon ikke skal kunne bli stående igjen i
`build.gradle.kts` og committet ved et uhell.

Lokal røyktest av selve publiseringsoppsettet, uten nettverk:

```bash
./gradlew publishMavenJavaPublicationToMavenLocal
ls ~/.m2/repository/io/mattilsynet/design-kotlin/*/
```

## Status

`./gradlew build` og publiseringsoppsettet er på plass. Oppsettet er verifisert mot
Clojars' valideringsregler og mot hvilke filer Gradle faktisk laster opp — både for
release og SNAPSHOT — men det er **ennå ikke kjørt et ekte deploy**. Første publisering
bør derfor gjøres med `-Psnapshot` før en release slippes.

Ikoner er bevisst utelatt. `mtds/icons/` inneholder kun sju domenespesifikke ikoner,
mens apper i praksis trenger Phosphor-settet, som designsystemet foreløpig ikke shipper.
