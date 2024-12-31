import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: [
    "../@(identitet|designsystem|profilering)/**/*.mdx",
    "../@(identitet|designsystem|profilering)/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { // disable the addons
        actions: false,
        backgrounds: false, 
        highlight: false, 
        toolbars: false
      },
    },
    "@storybook/addon-storysource"
  ],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: false // Speed up as we put all props in argTypes
  }
} satisfies StorybookConfig;