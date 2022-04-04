<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico, XAxis, YAxis, scaleFinance, Candle, Tick } from 'graficos';
	import { csv } from 'd3';
	import { extent, min, max } from 'd3-array';
	import { schemeCategory10 } from 'd3-scale-chromatic';
	import { scaleLinear, scaleUtc } from 'd3-scale';
	import { timeFormat } from 'd3-time-format';
	import { timeWeek, timeMonth, timeDay } from 'd3-time';
	import { getWeekOfMonth, getWeeksInMonth } from 'date-fns';

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
		width: { control: { type: 'number' } },
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="Candlestick chart"
	args={{
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
		<XAxis scale={xScale} y={innerHeight} orient="bottom" />
		<YAxis scale={yScale} tickSize={-innerWidth} />

		<g class="data">
			{#each data as candle}
				<Candle
					data={candle}
					x={xScale(xAccessor(candle))}
					low={yScale(candle.low)}
					high={yScale(candle.high)}
					open={yScale(candle.open)}
					close={yScale(candle.close)}
					width={xScale.band()}
				/>
			{/each}
		</g>
	</Grafico>
</Story>
