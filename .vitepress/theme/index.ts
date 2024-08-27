import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Colors from "./Colors.vue";
import Overview from "./Overview.vue";
import Story from "./Story.vue";

import "@digdir/designsystemet-css";
import "@digdir/designsystemet-theme";
import "./style.css"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Colors', Colors);
    app.component('Overview', Overview);
    app.component('Story', Story);
  }
} satisfies Theme
