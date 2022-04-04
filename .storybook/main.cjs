const path = require('path')
const preprocess = require('svelte-preprocess')

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
    config.resolve.alias = {
      graficos: path.resolve('./src/lib')
    }

    return config
  }
};
