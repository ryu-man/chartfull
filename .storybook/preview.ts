import type { Preview } from '@storybook/svelte';
import './global.css';

import MarginDecorator from '../src/stories/MarginDecorator.svelte';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [() => MarginDecorator]
};

export default preview;
