import type { Theme } from "vitepress";
import Svgs from "./Svgs.vue";
import Story from "./Story.vue";
import Overview from "./Overview.vue";
import DefaultTheme from "vitepress/theme";
import Colors from "./Colors.vue";

import "@digdir/designsystemet-css";
import "@digdir/designsystemet-theme";
import "./style.css"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Colors', Colors);
    app.component('Svgs', Svgs);
    app.component('Overview', Overview);
    app.component('Story', Story);
  }
} satisfies Theme
