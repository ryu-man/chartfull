<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Histogram',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'number' } },
			height: { control: { type: 'number' } }
		}
	};
</script>

<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, Tick, get } from 'graficos';
	import { first, last } from 'graficos/utils/array';
	import { bin, csv, extent, scaleLinear } from 'd3';
	import { onMount } from 'svelte';

	let data = [];

	onMount(() => {
		csv('unemployment-x.csv', (d) => ({
			id: d.id,
			state: d.state,
			county: d.county,
			rate: +d.rate
		})).then((res) => (data = res));
	});

	const valueAccessor = (d) => d.rate;

	let innerWidth;
	let innerHeight;

	$: bins = bin().domain([10, 25]).value(valueAccessor)(data);
	$: console.log(bins);

	$: yScale = scaleLinear(
		extent(bins, (d) => d.length),
		[innerHeight, 0]
	);
	$: xScale = scaleLinear([first(bins).x0, last(bins).x1], [0, innerWidth]);

	$: x0Get = get(xScale, (d) => d.x0);
	$: x1Get = get(xScale, (d) => d.x1);
	$: yGet = get(yScale, (d) => d.length);
</script>

<Meta
	title="Charts/Histogram"
	component={Chartfull}
	argTypes={{
		height: { control: { type: 'number' } },
		thresholds: { control: { type: 'number' } }
	}}
/>

<Story
	name="Histogram"
	args={{
		height: 0,
		padding: {
			left: 48,
			top: 24,
			right: 24,
			bottom: 24
		},
		thresholds: undefined
	}}
	let:args
>
	<Chartfull {...args} bind:innerWidth bind:innerHeight>
		<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
			<Tick {tick} y2={-innerHeight} />
		</XAxis>
		<YAxis scale={yScale} let:tick>
			<Tick {tick} x2={-innerWidth} />
		</YAxis>

		<g class="data">
			{#each bins as d, i (i)}
				<rect
					x={1}
					width={+x1Get(d) - +x0Get(d) - 1}
					height={innerHeight - +yGet(d)}
					fill-opacity=".6"
					transform={`translate(${x0Get(d)},${yGet(d)})`}
				/>
			{/each}
		</g>
	</Chartfull>
</Story>
