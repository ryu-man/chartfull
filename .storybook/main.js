import path from 'path'
import { mergeConfig, defineConfig } from 'vite'

export default {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-styling',
    '@storybook/addon-svelte-csf',
    '@storybook/addon-mdx-gfm'
  ],
  framework: "@storybook/sveltekit",
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
    autodocs: false
  }
}

