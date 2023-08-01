<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { Chartfull, XAxis, YAxis, Tick } from 'graficos';
	import { tweened } from 'svelte/motion';

	import { csv, schemeCategory10, max, extent, group, rollup, range, min } from 'd3';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import PopulationBar from './PopulationBar.svelte';

	export let args = {};

	let data = [];

	csv('./population.csv', ({ year, age, sex, people }) => ({
		year: +year,
		age: +age,
		sex: +sex,
		people: +people
	})).then((res) => (data = res));

	let year = 2000;
	let birthyear;

	let innerWidth = 0;
	let innerHeight = 0;
	const [xAccessor, yAccessor] = [(d) => +d.age, (d) => +d.people];

	const duration = 200;
	const t$ = tweened(
		[...Array(49)].map((d, i) => ({
			male: 0,
			female: 0,
			birthyear: 1760 + i * 5
		})),
		{
			duration
		}
	);

	$: barWidth = Math.floor(innerWidth / 20);
	$: barHalfWidth = barWidth / 2;

	$: age1 = max(data, (d) => d.age);
	$: year0 = min(data, (d) => d.year);
	$: year1 = max(data, (d) => d.year);
	$: {
		!year && (year = year1);
	}

	$: xRange = [innerWidth - barHalfWidth, 0 + barHalfWidth];
	$: xScale = scaleLinear([year1 - age1, year1], xRange);
	$: ageScale = scaleLinear([0, 95], xRange);
	$: yScale = scaleLinear([0, max(data, yAccessor) || 0], [innerHeight, 0]);
	$: colorScale = scaleOrdinal(data.map(xAccessor), schemeCategory10);

	$: _ = rollup(
		data,
		(d) => d.map((dd) => dd.people),
		(d) => d.year,
		(d) => d.year - d.age
	);

	$: birthyears = range(year0 - age1, year1 + 1, 5);

	$: tweenedData = birthyears.map((birthyear) => {
		const [male = 0, female = 0] = _.get(year)?.get(birthyear) ?? [0, 0];

		return {
			male,
			female,
			birthyear
		};
	});

	$: t$.update((val) => {
		if (val.length === tweenedData.length) {
			return tweenedData;
		}

		return val;
	});

	let startDrag = false;
</script>

<Meta
	title="Charts/Others"
	argTypes={{
		width: { control: { type: 'number' } },
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="Population"
	args={{
		height: 0
	}}
	component={Chartfull}
	let:args
>
	<Chartfull
		bind:innerWidth
		bind:innerHeight
		{...args}
		padding={{ bottom: 32, right: 64, left: 24, top: 24 }}
		fontSize="16"
	>
		<defs>
			<clipPath id="clip">
				<rect width={innerWidth} height={innerHeight} />
			</clipPath>
		</defs>

		<YAxis
			scale={yScale}
			x={innerWidth}
			orient="right"
			tickFormat={(d) => Math.round(d / 1e6) + 'M'}
			d=""
			let:tick
		>
			<Tick {tick} x2={-innerWidth} />
		</YAxis>

		<g style:transform="translate3d(0px, {innerHeight + 8}px, 1px)" dominant-baseline="hanging">
			{#each ageScale.ticks(15) as tick}
				<text x={ageScale(tick)} text-anchor="middle">{tick}</text>
			{/each}
		</g>

		<g class="data" clip-path="url(#clip)">
			{#each $t$ as { male, female, birthyear } (birthyear)}
				<PopulationBar
					male={yScale(male)}
					female={yScale(female)}
					{birthyear}
					width={barWidth}
					height={innerHeight}
					x={ageScale(year - birthyear)}
					dx={barHalfWidth}
					{duration}
				/>
			{/each}
		</g>

		<text
			x="0"
			y="0"
			font-size="72pt"
			font-weight="600"
			fill="rgba(0, 0, 0, 0.25)"
			dominant-baseline="hanging"
			style:cursor="pointer"
			style:user-select="none"
			on:mousedown={(e) => {
				startDrag = true;
				e.currentTarget.dataset.clientX = e.clientX;
				e.currentTarget.dataset.year = year;
			}}
			on:mouseup={() => {
				startDrag = false;
			}}
			on:mousemove={(e) => {
				if (!startDrag) return;
				year = Math.max(
					year0,
					Math.min(
						year1,
						+e.currentTarget.dataset.year +
							Math.round((e.clientX - +e.currentTarget.dataset.clientX) / 20) * 10
					)
				);
			}}>{year}</text
		>
	</Chartfull>
</Story>
