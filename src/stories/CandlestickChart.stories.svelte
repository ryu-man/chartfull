<script context="module">
	import { Chartfull } from 'chartfull';

	export const meta = {
		title: 'Charts/Candlestick chart',
		component: Chartfull,
		argTypes: {
			width: { type: 'string' },
			height: { type: 'string' }
		}
	};
</script>

<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, scaleFinance, Candle, Tick, Grid } from 'chartfull';
	import { csv, min, max, scaleLinear } from 'd3';
	import { getISOWeek, getWeekOfMonth, format } from 'date-fns';

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

	let inFocusTick = undefined;

	const xAccessor = (d) => d.date;
	const lowAccessor = (d) => d.low;
	const highAccessor = (d) => d.high;

	$: xScale = scaleFinance(data.map(xAccessor), [0, innerWidth]).paddingInner(0.03);
	$: yScale = scaleLinear([min(data, lowAccessor), max(data, highAccessor)], [innerHeight, 0]);

	function xScaleFormatter(date: Date) {
		if (getISOWeek(date) === 1) {
			return format(date, 'yyyy');
		}

		if (getWeekOfMonth(date, { weekStartsOn: 1 }) === 1) {
			return format(date, 'MMM');
		}

		return getWeekOfMonth(date, { weekStartsOn: 1 });
	}
</script>

<Story name="Candlestick chart" args={{}} let:args>
	<Chartfull bind:innerWidth bind:innerHeight {data} {...args}>
		<text
			fill-opacity=".1"
			font-size="32pt"
			font-weight="700"
			text-anchor="end"
			dominant-baseline="text-top"
			x={innerWidth}
			dx="0"
			dy="-32">Daily stock status of Apple stock</text
		>

		<Grid width={innerWidth} height={innerHeight} />

		<XAxis
			scale={xScale}
			y={innerHeight}
			orient="bottom"
			tickArguments={[16]}
			tickFormat={xScaleFormatter}
			let:tick
			let:tickFormat
		>
			<Tick
				{tick}
				y2={-innerHeight}
				on:pointerenter={(e) => {
					inFocusTick = tick;
				}}
				on:pointerleave={() => {
					inFocusTick = undefined;
				}}
			>
				<text>{tickFormat(tick)}</text>
				{#if tick === inFocusTick}
					<!-- content here -->
					<text dy="24" text-anchor="middle" font-size="8pt">{format(tick, 'dd MMM yyyy')}</text>
				{/if}
			</Tick>

			<text slot="label" x={innerWidth}>Time</text>
		</XAxis>

		<YAxis scale={yScale} tickArguments={[13, '.1f']} let:tick>
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
	</Chartfull>
</Story>
