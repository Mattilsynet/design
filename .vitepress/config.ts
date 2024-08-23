import { defineConfig } from "vitepress"
import { fileURLToPath } from "node:url";
import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'

import path from "node:path";
import fs from "node:fs";


const toNorwegian = (str: string) => str.replace(/--/g, ' ').replace(/aa/g, 'å').replace(/ae/g, 'æ').replace(/ooo/g, 'ø');
const toTitleCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;
const getFiles = (folderPath: string) => {
  const docsPath = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  const files: Array<{ text: string; link: string }> = [];

  for(const file of fs.readdirSync(path.resolve(docsPath, folderPath)))
    if (file !== 'index.md' && file.endsWith('.md') && !file.startsWith('_'))
      files.push({
        text: toTitleCase(toNorwegian(file.slice(0, -3))),
        link: path.join('/', folderPath, file.slice(0, -3)) // Need the preceding slash for prev/next buttons to work
      });

  return files;
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      whyframe({ components: [{ name: 'Story', showSource: true }] }),
      whyframeVue({ include: /\.(?:vue|md)$/ }) // Files to scan
    ]
  },
  lang: "nb-NO",
  title: "Mattilsynet Design",
  description: "Mattilsynet Design",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: "/symbol.svg" }],
    // ["script", { acync: "", defer: "", src: "https://scripts.withcabin.com/hello.js" }], // Analytics
  ],
  appearance: false,
  themeConfig: {
    logo: "/logo.svg",
    darkModeSwitchLabel: "Fargemodus",
    darkModeSwitchTitle: "Bytt til mørk fargemodus",
    langMenuLabel: "Språk",
    lightModeSwitchTitle: "Bytt til lyse fargemodus",
    returnToTopLabel: "Til toppen",
    sidebarMenuLabel: "Navigasjon",
    editLink: {
			pattern: "https://github.com/Mattilsynet/design/blob/master/:path",
			text: "Foreslå endringer på denne siden",
		},
    nav: [
      { text: "Home", link: "/identitet" },
      { text: "Komponenter", link: "/components" }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ],
    sidebar: [
      {
        text: "Identitet",
        collapsed: true,
        items: getFiles("identitet")
      },
      {
        text: "Komponenter",
        collapsed: true,
        items: getFiles("components")
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
