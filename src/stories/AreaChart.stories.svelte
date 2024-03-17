<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Area chart',
		component: Chartfull,
		argTypes: {
			width: { type: 'string' },
			height: { type: 'string' }
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, Tick, Area, Grid } from 'graficos';
	import { csv, extent, max, timeParse, scaleLinear, scaleTime, area } from 'd3';
	import { code } from './areaChart.code';

	let data = [];
	const parser = timeParse('%Y-%m-%d');

	const dataConverter = (d) => ({
		date: parser(d.date),
		value: +d.value
	});

	const ready = csv('./3_TwoNumOrdered_comma.csv', dataConverter).then(async (array) => {
		data = array;
	});

	const [xAccessor, yAccessor] = [(d) => d.date, (d) => +d.value];
	let innerWidth = 1;
	let innerHeight = 1;

	$: areaDataPath = area().x(xScaled).y0(innerHeight).y1(y1Scaled);

	$: xScale = scaleTime(extent(data, xAccessor), [0, innerWidth]);
	$: yScale = scaleLinear([0, max(data, yAccessor)], [innerHeight, 0]);

	$: xScaled = (d) => xScale(xAccessor(d));
	$: y1Scaled = (d) => yScale(yAccessor(d));
</script>

<Story name="Area chart" source={code} let:args>
	<Chartfull
		{...args}
		{data}
		padding={{ top: 24, left: 64, right: 0, bottom: 24 }}
		bind:innerWidth
		bind:innerHeight
	>
		<Grid width={innerWidth} height={innerHeight} />

		<XAxis scale={xScale} y={innerHeight} orient="bottom" duration={100} let:tick>
			<Tick {tick} y1={0} y2={-innerHeight} />
			<text slot="label" x={innerWidth}>Year</text>
		</XAxis>

		<YAxis scale={yScale} tickFormat={(d) => Math.trunc(d / 1000) + 'K'} duration={100} let:tick>
			<Tick {tick} x2={-innerWidth} />
			<text slot="label">Value</text>
		</YAxis>

		<Area d={areaDataPath(data)} stroke-width="1" />
	</Chartfull>
</Story>

<style>
	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}
</style>
