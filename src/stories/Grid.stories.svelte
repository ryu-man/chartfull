<script context="module">
	export const meta = {
		title: 'Components/Grid'
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Chartfull, XAxis, YAxis, Tick, Grid } from 'chartfull';
	import { csv, extent, scaleLinear, scaleTime, scaleBand } from 'd3';

	let innerWidth = 0;
	let innerHeight = 0;

	let cellsize = 5;
	let tilesize = cellsize * 5;
</script>

<Story id="grid" name="Grid">
	<Chartfull bind:innerWidth bind:innerHeight>
		<Grid width={innerWidth} height={innerHeight} />
	</Chartfull>
</Story>

<style>
	/* :global(body) {
		background-color: hsl(220 10% 10%);
	} */

	.gray-40 {
		stroke: hsl(220 10% 40%);
	}

	.gray-80 {
		stroke: hsl(220 10% 80%);
	}
</style>
