`@mattilsynet/design`
================

Mattilsynets designsystem bygger oppå [designsystemet.no](https://www.designsystemet.no/), men utvider med egenart, visuelle identitet og interne behov. Designsystemet fungerer som et felles språk mellom team og fagfelt, slik at vi lettere kan skape gode og gjenkjennbare brukeropplevelser som er tilgjengelig for alle.

## Kom i gang

- Se [design.mattilsynet.no](https://design.mattilsynet.no/?path=/docs/designsystem-introduksjon--docs) for hvordan bruke `@mattilsynet/design`

## Henvendelser

- Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub
- Mattilsynet-ansatte kan benytte Slack-kanalen [#designsystem](https://mattilsynet-hq.slack.com/archives/C03FAJ7N1EU).

## Utvikling

Klon ned `@mattilsynet/design`, installer og kjør:
1. `git clone git@github.com:Mattilsynet/design.git`
2. `cd design`
3. `npm install`
4. `npm run storybook`
     - Du har nå dokumentasjonen kjørende med hot-reloading
5. Sjekk ut egen branck `git checkout -b fix/din-branch-her` - vi følger [conventional commits navnekonvensjon](https://www.conventionalcommits.org/)
6. Lag PR mot `next` branchen


## Publisering
1. Mannuelt oppdatert versjonsnummer i `package.json` (vi følger [semver](https://semver.org/))
2. Run `npm install`
3. Commit the update with the message `chore: update version to x.y.z` to the `next` branch, and push it
4. Create a pull request from `next` into `main`
5. After the pull request is merged, the new version will be published automatically by a GitHub action