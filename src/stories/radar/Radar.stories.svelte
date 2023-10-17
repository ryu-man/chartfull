<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Radar',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'number' } },
			height: { control: { type: 'number' } }
		}
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import { onMount } from 'svelte';
	import Basic from './Basic.svelte';

	onMount(() => {});
</script>

<Story
	name="Radar/Basic"
	args={{
		height: 0
	}}
	let:args
>
	<Basic {args} />
</Story>

<style>
	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}
</style>
