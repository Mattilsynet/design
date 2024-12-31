import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import '../designsystem/font.css';

const granskog = '#054449';
const gaasunge = '#faf6f3';
const white = '#ffffff;'

addons.setConfig({
  enableShortcuts: false,
  initialActive: 'sidebar',
  isFullscreen: false,
  panelPosition: 'bottom',
  selectedPanel: 'storybook/source-loader/panel',
  showNav: true,
  showPanel: true,
  showToolbar: true,
  theme: create({
    base: 'light',
    fontBase: 'Mattilsynet Sans, sans-serif',
  
    brandTitle: 'Mattilsynet Design',
    colorPrimary: granskog,
    colorSecondary: granskog,
  
    // UI
    appBg: gaasunge,
    appContentBg: white,
    appPreviewBg: white,
    // appBorderColor: 'transparent',
    appBorderRadius: 5,
  
    // Text colors
    textColor: granskog,
    textInverseColor: white,
  
    // Toolbar default and active colors
    barTextColor: granskog,
    barSelectedColor: granskog,
    barHoverColor: granskog,
    barBg: white,
  
    // Form colors
    // inputBg: white,
    // inputBorder: granskog,
    // inputTextColor: granskog,
    // inputBorderRadius: 2,
  }),
  toolbar: {
    'storybook/a11y/panel': { hidden: true }, // Vision simulation
    'storybook/background': { hidden: true }, // Dark mode
    'storybook/measure-addon/tool': { hidden: false }, // Ruler
    'storybook/outline': { hidden: false }, // Outlines
    'storybook/source-loader/panel': { hidden: false }, // Code
    'storybook/viewport': { hidden: false }, // Resize
    copy: { hidden: true }, // Copy link to canvar only
    eject: { hidden: false }, // Open canvas only in new window
    fullscreen: { hidden: false }, // Hide sidebar
    remount: { hidden: true }, // Same as reload
    title: { hidden: true },
    zoom: { hidden: true }
  }
});
