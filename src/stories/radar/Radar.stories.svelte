<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Chartfull } from 'graficos';
	import { onMount } from 'svelte';
	import Twitter from './Twitter.svelte';
	import Basic from './Basic.svelte';

	onMount(() => {});
</script>

<Meta title="Charts/Radar" component={Chartfull} />

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
