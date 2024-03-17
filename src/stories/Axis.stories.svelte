<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Components/Animated Path',
		component: Chartfull,
		argTypes: {
			width: { type: 'string' },
			height: { type: 'string' }
		}
	};
</script>

<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, Tick } from 'graficos';
	import { csv, extent, timeParse, timeMonths, scaleTime, timeFormat } from 'd3';
	import { startOfYear, endOfYear, addYears, set } from 'date-fns';
	import MarginDecorator from './MarginDecorator.svelte';
	import { onMount } from 'svelte';

	const timeParser = timeParse('%Y%m%d');

	const today = new Date();
	let data = [];
	const duration = 300;

	const delay = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

	let innerWidth = 0;
	let innerHeight = 0;

	onMount(async () => {
		const array = timeMonths(startOfYear(today), addYears(endOfYear(today), 5));
		for (const d of array) {
			data = [...data, d];
			await delay(duration * 4);
		}
	});

	$: xScale = scaleTime(extent(data), [0, innerWidth]);
	$: yScale = scaleTime(extent(data), [innerHeight, 0]);
</script>

<Meta title="Components/Axis" component={Chartfull} />

<MarginDecorator>
	<Story
		id="xaxis"
		name="XAxis"
		args={{
			top: false,
			duration: 1000
		}}
		let:args={{ top, duration }}
	>
		<Chartfull bind:innerWidth bind:innerHeight>
			<XAxis
				scale={xScale}
				y={innerHeight / 2}
				orient={top ? 'top' : 'bottom'}
				tickSize={6}
				{duration}
				let:tick
			>
				<Tick {tick} />
			</XAxis>
		</Chartfull>
	</Story>

	<Story
		id="yaxis"
		name="YAxis"
		args={{
			left: true,
			duration: 1000
		}}
		let:args={{ left, duration }}
	>
		<Chartfull bind:innerWidth bind:innerHeight padding={{top: 48, bottom: 48}}>
			<YAxis
				scale={yScale}
				x={innerWidth / 2}
				y={0}
				orient={left ? 'left' : 'right'}
				tickSize={6}
				stroke="gray"
				strokeWidth="2"
				{duration}
				let:tick
			>
				<Tick {tick} />
			</YAxis>
		</Chartfull>
	</Story>
</MarginDecorator>
