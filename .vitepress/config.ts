import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress"

import fs from "node:fs";
import path from "node:path";

const toNorwegian = (str: string) => str.replace(/--/g, ' ').replace(/aa/g, 'å').replace(/ae/g, 'æ').replace(/ooo/g, 'ø');
const toTitleCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;
const getFiles = (folderPath: string, items: { text: string; link: string }[] = []) => {
  const docsPath = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  const existing = items.map(({ link }) => link);
  
  for(const file of fs.readdirSync(path.resolve(docsPath, folderPath))) {
    const link = path.join('/', folderPath, path.basename(file, '.md')); // Need the preceding slash for prev/next buttons to work
    const text = toTitleCase(toNorwegian(file.slice(0, -3)));

    if (file.endsWith('.md') && !file.startsWith('_') && !existing.includes(link))
      items.push({ text, link });
  }

  return items;
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  },
  lang: "nb-NO",
  title: "Mattilsynet Design",
  description: "Mattilsynet Design",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: '/docs/logo-symbol.svg' }],
    // ["script", { acync: "", defer: "", src: "https://scripts.withcabin.com/hello.js" }], // Analytics
  ],
  appearance: false,
  themeConfig: {
    logo: "/docs/logo-text.svg",
    darkModeSwitchLabel: "Fargemodus",
    darkModeSwitchTitle: "Bytt til mørk fargemodus",
    langMenuLabel: "Språk",
    lightModeSwitchTitle: "Bytt til lyse fargemodus",
    returnToTopLabel: "Til toppen",
    sidebarMenuLabel: "Navigasjon",
    editLink: {
			pattern: "https://github.com/Mattilsynet/design/edit/master/:path",
			text: "Foreslå endringer på denne siden",
		},
    nav: [
      { text: "Identitet", link: "/identitet" },
      { text: "Designsystem", link: "/designsystem" },
      { text: "Profilering", link: "/profilering" }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Mattilsynet/design/" }
    ],
    sidebar: [
      {
        text: "Identitet",
        collapsed: true,
        items: [
          { text: "Introduksjon", link: "/identitet/" },
          { text: "Kompasset og roller", link: "/identitet/kompasset" },
          { text: "Logo", link: "/identitet/logo" },
          { text: "Farger", link: "/identitet/farger" },
          { text: "Typografi", link: "/identitet/typografi" },
          { text: "Form og bevegelse", link: "/identitet/form" },
          { text: "Ikoner", link: "/identitet/ikoner" },
          { text: "Illustrasjoner", link: "/identitet/illustrasjoner" },
          { text: "Bilder", link: "/identitet/bilder" },
          { text: "Slik skriver vi", link: "/identitet/sprak" },
        ]
      },
      {
        text: "Designsystem",
        collapsed: true,
        items: [
          { text: "Introduksjon", link: "/designsystem/" },
          { text: "Alert", link: "/designsystem/alert/" },
          { text: "Breadcrumbs", link: "/designsystem/breadcrumbs/" },
          { text: "Button", link: "/designsystem/button/" },
          // { text: "Details", link: "/designsystem/details/" },
          { text: "Field", link: "/designsystem/field/" },
          { text: "Fieldset", link: "/designsystem/fieldset/" },
          { text: "Input", link: "/designsystem/input/" },
          { text: "Link", link: "/designsystem/link/" },
          { text: "Logo", link: "/designsystem/logo/" },
          { text: "Popover", link: "/designsystem/popover/" },
          { text: "Validation", link: "/designsystem/validation/" },
          // { text: "Alle komponenter", link: "/designsystem/all" },
          // { text: "Universell utforming", link: "/designsystem/uu" },
          // { text: "Tokens", link: "/designsystem/tokens" },
        ]
      },
      {
        text: "Profilering",
        collapsed: true,
        items: getFiles("profilering"),
      }
    ],
		search: {
			provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Søk",
            buttonAriaLabel: "Klikk for å søke"
          },
          modal: {
            displayDetails: 'Vis detaljert liste',
            resetButtonTitle: 'Tilbakestill søk',
            backButtonTitle: 'Lukk søk',
            noResultsText: 'Ingen resultater',
            footer: {
              selectText: 'Velg',
              selectKeyAriaLabel: 'Enter',
              navigateText: 'Navigasjon',
              navigateUpKeyAriaLabel: 'Pil opp',
              navigateDownKeyAriaLabel: 'Pil ned',
              closeText: 'Lukk',
              closeKeyAriaLabel: 'ESC'
            }
          }
        }
      }
		},
    outline: {
      label: "På denne siden"
    },
    docFooter: {
      prev: 'Forrige side:',
      next: 'Neste side:'
    }
  }
})
