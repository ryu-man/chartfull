<script context="module">
		import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Components/Rect',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'number' } },
			height: { control: { type: 'number' } }
		}
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import { Rect } from 'graficos';
	import MarginDecorator from './MarginDecorator.svelte';
</script>

<MarginDecorator>
	<Story id="rect" name="Rect" args={{ width: 200, height: 500, r: '0' }} let:args>
		<Chartfull>
			<Rect {...args} />
		</Chartfull>
	</Story>
</MarginDecorator>
