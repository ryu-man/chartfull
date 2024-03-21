<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Pie Chart',
		component: Chartfull,
		argTypes: {
			width: { type: 'string' },
			height: { type: 'string' }
		}
	};
</script>

<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, scaleFinance, Candle, Tick, Grid } from 'graficos';
	import { csv, min, max, scaleLinear, pie, scaleOrdinal, arc } from 'd3';
	import { getISOWeek, getWeekOfMonth, format } from 'date-fns';

	let innerWidth;
	let innerHeight;

	const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
	const accessor = (d: [string, number]) => d[1];

	const colorScale = scaleOrdinal()
		.domain(Object.keys(data))
		.range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']);

	$: pie_gen = pie<[string, number]>().value(accessor);
	$: arc_gen = arc().innerRadius(innerHeight / 3).outerRadius(innerHeight/2);
	$: render_data = pie_gen(Object.entries(data));

	$: console.log(render_data);
</script>

<Story
	name="Doughnut Chart"
	args={{
		padding: {
			left: 48,
			bottom: 48,
			top: 96,
			right: 48
		}
	}}
	let:args
>
	<Chartfull bind:innerWidth bind:innerHeight {data} {...args}>
		<g>
			{#each render_data as slice}
				<g
					fill={colorScale(slice.data[0])}
					transform="translate({innerWidth / 2}, {innerHeight / 2})"
				>
					<path d={arc_gen(slice)} />
				</g>
			{/each}
		</g>
	</Chartfull>
</Story>
