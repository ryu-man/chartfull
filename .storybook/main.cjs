const path = require('path');
const preprocess = require('svelte-preprocess');
const {
  mergeConfig,
  defineConfig
} = require('vite');
module.exports = {
  "stories": ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  "addons": ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf', '@storybook/addon-mdx-gfm'],
  "framework": "@storybook/sveltekit",
  staticDirs: ['../static'],
  async viteFinal(config) {
    return mergeConfig(config, defineConfig({
      resolve: {
        alias: {
          "$lib": path.resolve('./src/lib'),
          "graficos": path.resolve('./src/lib')
        }
      }
    }));
  },
  docs: {
    autodocs: true
  }
};