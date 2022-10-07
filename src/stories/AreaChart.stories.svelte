<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico, XAxis, YAxis, Tick, Area } from 'graficos';
	import { csv, extent, max, timeParse } from 'd3';
	import { scaleLinear, scaleTime } from 'd3-scale';
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

	$: xScale = scaleTime(extent(data, xAccessor) ?? [], [0, innerWidth]);
	$: yScale = scaleLinear([0, max(data, yAccessor)] ?? [], [innerHeight, 0]);

	$: xScaled = (d) => xScale(xAccessor(d));
	$: y1Scaled = (d) => yScale(yAccessor(d));
</script>

<Meta
	title="Charts/Area chart"
	component={Grafico}
	argTypes={{
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="one"
	args={{
		height: 0
	}}
	source={code}
	let:args
>
	<Grafico
		{...args}
		{data}
		padding={{ top: 24, left: 64, right: 0, bottom: 24 }}
		bind:innerWidth
		bind:innerHeight
	>
		<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
			<Tick {tick} y1={8} y2={-innerHeight} duration={400} />
			<text slot="label" x={innerWidth}>Year</text>
		</XAxis>

		<YAxis scale={yScale} tickFormat={d=> Math.trunc(d/1000)+'K'} let:tick>
			<Tick {tick} x2={-innerWidth} duration={400} />
			<text slot="label">Value</text>
		</YAxis>

		<Area
			x={xScaled}
			y0={innerHeight}
			y1={y1Scaled}
			{data}
			fill="rgb(0 0 0 / 30%)"
			stroke="rgb(0 0 0 / 40%)"
			strokeWidth="1"
		/>
	</Grafico>
</Story>

<style>
	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}
</style>
