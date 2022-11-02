const path = require('path')
const preprocess = require('svelte-preprocess')
const { mergeConfig, defineConfig } = require('vite');

module.exports = {
  "stories": ["../src/stories/**/*.stories.mdx", "../src/stories/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-svelte-csf"],
  "framework": "@storybook/svelte",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "svelteOptions": {
    "preprocess": preprocess()
  },
  staticDirs: ['../static'],

  async viteFinal(config) {

    return mergeConfig(config, defineConfig({
      resolve: {
        alias: {
          "$lib": path.resolve('./src/lib'),
          "graficos": path.resolve('./src/lib')
        }
      }
    }))
  }
};
