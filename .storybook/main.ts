import type { StorybookConfig } from '@storybook/sveltekit';
import { mergeConfig, defineConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-styling',
		'@storybook/addon-svelte-csf'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	staticDirs: ['../static'],
	async viteFinal(config) {
		return mergeConfig(
			config,
			defineConfig({
				resolve: {
					alias: {
						$lib: path.resolve('./src/lib'),
						graficos: path.resolve('./src/lib')
					}
				}
			})
		);
	}
};

export default config;
