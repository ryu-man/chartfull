<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico, XAxis, YAxis, scaleFinance, Candle, Tick } from 'graficos';
	import { csv, min, max, scaleLinear } from 'd3';

	const converter = (d) => {
		return {
			date: new Date(d.Date),
			open: +d.Open,
			close: +d.Close,
			high: +d.High,
			low: +d.Low,
			volume: +d.Volume
		};
	};
	csv('./aapl-2.csv', converter).then((res) => (data = res.slice(-120)));

	let data = [];
	let innerWidth;
	let innerHeight;

	const xAccessor = (d) => d.date;
	const lowAccessor = (d) => d.low;
	const highAccessor = (d) => d.high;

	$: xScale = scaleFinance(data.map(xAccessor), [0, innerWidth]).paddingInner(0.03);
	$: yScale = scaleLinear([min(data, lowAccessor), max(data, highAccessor)], [innerHeight, 0]);
</script>

<Meta
	title="Charts/Candlestick chart"
	argTypes={{
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="Candlestick chart"
	args={{
		height: 0,
		padding: {
			left: 48,
			bottom: 48,
			top: 48,
			right: 48
		}
	}}
	let:args
>
	<Grafico bind:innerWidth bind:innerHeight {...args}>
		<text
			fill-opacity=".1"
			font-size="32pt"
			font-weight="600"
			text-anchor="end"
			dominant-baseline="text-before-edge"
			x={innerWidth}>Daily stock status of Apple stock</text
		>
		<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
			<Tick {tick} y2={-innerHeight} />
			<text slot="label" x={innerWidth}>Time</text>
		</XAxis>
		<YAxis scale={yScale} let:tick>
			<Tick {tick} x2={-innerWidth} />
			<text slot="label">Price ($)</text>
		</YAxis>

		<g class="data">
			{#each data as candle}
				<Candle
					{candle}
					x={xScale(xAccessor(candle))}
					scale={yScale}
					width={xScale.band()}
					fillOpacity={0.5}
					strokeOpacity={0.9}
				/>
			{/each}
		</g>
	</Grafico>
</Story>
