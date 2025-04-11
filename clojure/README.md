# Mattilsynets designsystem - for Clojure!

Pakking av designsystemet for publisering til Clojars. Tilbyr systemets ressurer
sammen med noen bekvemmelighets-API-er for å bruke CSS-moduler og laste SVG-er
fra Clojure og ClojureScript.

```clj
io.mattilsynet/design {:mvn/version "x.y.z"}
```

Finn siste versjon [på Clojars](https://clojars.org/io.mattilsynet/design).

## Klasser

For å bruke klasser fra designsystemet:

```clj
(require '[mattilsynet.design :as mtds])

[:a {:class (mtds/classes :logo)}
  "Klikk her, a!"]
```

`mattilsynet.design/classes` kan kalles med en regle med klasser, både i og
utenfor designsystemet. De som er i designsystemet blir bytta ut med riktige
klasser, mens de øvrige forblir urørt:

```clj
(require '[mattilsynet.design :as mtds])

(mtds/classes :mt-4 :button :yolo)

;;=>
;; (:mt-4 "_button_1tlt5_12" "_ds-button_141tn_1" :yolo)
```

## CSS-fil

CSS-fila er tilgjengelig som:

```clj
(require '[clojure.java.io :as io])

(io/resource "public/mtds/styles.css")
```

## Ikoner og illustrasjoner

Ikoner og illustrasjoner kan rendres som hiccup. Fra Clojure er det bare å bruke
`mattilsynet.design/render-icon`:

```clj
(require '[mattilsynet.design :as mtds])

(mtds/render-svg :icon/cow)
;;=>
;; [:svg ,,, ]

(mtds/render-svg :illustration/animals.bird)
;;=>
;; [:svg ,,, ]
```

Fra ClojureScript må du sørge for å laste SVG-en inn i bygget ditt først med
`mattilsynet.design/svg`:

```clj
(require '[mattilsynet.design :as mtds])

(mtds/render-svg (mtds/svg :icon/cow))
;;=>
;; [:svg ,,, ]
```

For en liste med tilgjengelige ikoner og/eller illustrasjoner:

```clj
(require '[mattilsynet.design :as mtds])

(mtds/get-icon-ids)
[:icon/cow :icon/fish ,,,]

(mtds/get-illustration-ids)
[:illustration/animals.bird :illustration/animals.pig ,,,]
```

## Slippe ny release

Start med å installere Clojure:

```sh
brew install clojure/tools/clojure
brew install mvn
```

Når det er endringer i npm-pakken til designsystemet, eller i koden i dette
repoet bør det lages en ny versjon av Clojars-pakken. Det gjør du på følgende
vis:

```sh
./release.sh
```

Dette scriptet sørger for å oppdatere designsystemet, bygge `resources` på nytt,
bumpe versjonsnummeret, committe og tagge, bygge jar-fil og publisere den på
Clojars. Du må ha tilgang til `io.mattilsynet`-gruppen på Clojars, det får du av
noen på Team Mat.
