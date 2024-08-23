import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Story from "./Story.vue";

import "@digdir/designsystemet-css";
import "@digdir/designsystemet-theme";
import "./style.css"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Story', Story)
  }
} satisfies Theme
