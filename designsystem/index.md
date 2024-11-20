---
title: Designsystem
---

# Designsystem <mark data-badge="Alfa"></mark>

> Mattilsynets designsystem bruker [designsystemet.no](https://www.designsystemet.no/) som grunnmur,
men utvider med vår visuelle identitet, egenart og interne behov. Det fungerer som et felles språk mellom team og fagfelt, slik at vi lettere kan dra skape gode og gjenkjennbare brukeropplevelser som er tilgjengelig for alle.

- **Spørsmål, tanker eller ideer?** Skriv gjerne til oss på [Slack](https://mattilsynet-hq.slack.com/archives/C03FAJ7N1EU) eller [Github](https://github.com/Mattilsynet/design/issues) :raised_hands:
- **Hva er siste nytt?** Se [versjonslogg på Github](https://github.com/Mattilsynet/design/releases) og [oppgaver vi jobber med](https://github.com/orgs/Mattilsynet/projects/22)


## Kom i gang for utviklere

Designsystemet tilbyr først og fremst en rekke CSS klassenavn som hjelper deg bygge responsive, fleksible og tilgjengelige grensesnitt. I tillegg får du tilgang til logoer, ikoner, illustasjoner og en rekke tokens/[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for enkel bygging av egne komponenter i Mattilsynet-drakt. Slik bruker du pakken:

1. **Installer** `@mattilsynet/design` fra Mattilsynets [NPM organsiasjon](https://www.npmjs.com/package/@mattilsynet/design):
    ::: code-group

    ```bash [NPM]
    npm install --save @mattilsynet/design
    ```

    ```bash [PNPM]
    pnpm add @mattilsynet/design
    ```

    ```bash [Yarn]
    yarn add @mattilsynet/design
    ```

    ```bash [Bun]
    bun add @mattilsynet/design
    ```
    :::

2. **Importer** stiler enten via Javascript eller CSS-fil:
    ::: code-group

    ```js [Javascript]
    import "@mattilsynet/design/styles.css";
    ```

    ```css [CSS]
    @import "@mattilsynet/design/styles.css";
    ```
    :::

    ::: tip Tips: `background`, `color` og `font` blir satt på `<body>` :nerd_face:
    `body { background: …; color: …; font: … }` og `b, strong, th { font-weight: 600 }` blir automatisk definert, slik at vi ivaretar [universell utforming](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html) og får samme font og farge på tvers. Dette er super lett å overstyre ved behov: din CSS vil alltid ha første prioritert - takket være teknikken [CSS @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) :green_heart:
    :::
3. **Ta i bruk** klassenavn ved å importere `styles` objektet:
    ::: code-group

    ```jsx [Javascript]
    import { styles } from "@mattilsynet/design";

    <button class={styles.button}></button>
    ```

    ```jsx [JSON]
    import styles from "@mattilsynet/design/styles.json";

    <button class={styles.button}></button>
    ```
    :::

    ::: tip Hvorfor ikke bare skrive `class="button"`?
    Det skal være trygt å importere designsystemet i eksisterende prosjekt, eller bruke flere versjoner samtidig. Ved å bruke [CSS-moduler](https://github.com/css-modules/css-modules) får vi hashede klassenavn, som hindrer konflikt og gjør at du slipper å tenke på versjonskontroll :partying_face:
    :::
4. **Ta i bruk** illustrasjoner og ikoner - [egen dokumentasjon kommer](#)

<!-- **Hvorfor CSS og ikke React komponenter?**-->

## Kom i gang for designere

Kommer