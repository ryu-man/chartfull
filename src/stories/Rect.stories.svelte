<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Components/Rect',
		component: Chartfull,
		width: { control: { type: 'string' } },
		height: { control: { type: 'string' } }
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import { Rect } from 'graficos';
</script>

<Story id="rect" name="Rect" args={{ width: 200, height: 500, r: '0' }} let:args>
	<Chartfull>
		<Rect {...args} />
	</Chartfull>
</Story>
