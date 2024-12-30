import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Colors from "./Colors.vue";
import Overview from "./Overview.vue";
import Story from "./Story.vue";
import Svgs from "./Svgs.vue";
import "@u-elements/u-details";
import "@u-elements/u-tabs";
import "./style.css";

// @ts-ignore
import { styles as CSSModuleStyles } from "../../designsystem";
if (typeof window !== 'undefined') Object.assign(window, { CSSModuleStyles });

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Colors', Colors);
    app.component('Svgs', Svgs);
    app.component('Overview', Overview);
    app.component('Story', Story);

  }
} satisfies Theme
