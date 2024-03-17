<script context="module">
	const storyName = 'Furtune 500';

	export const meta = {
		title: 'Charts/Furtune 500'
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Chartfull, XAxis, YAxis, Tick } from 'chartfull';
	import { csv, extent, scaleLinear, scaleTime, scaleBand } from 'd3';

	type Item = {
		company: string;
		value: number;
		year: number;
	};

	let data: Item[] = [];
	let companies = [];
	let currentYear: number | undefined = undefined;

	csv('./data/fortune_500_global.csv').then((d) => {
		companies = d.columns.slice(1);

		for (let i = 0; i < d.length; i++) {
			const item = d[i];

			for (let j = 0; j < companies.length; j++) {
				const company = companies[j];
				data.push({
					year: +item['Year'],
					company,
					value: +item[company]
				});
			}
		}

		data = data;
		currentYear = data[0].year;
	});

	let innerWidth = 0;
	let innerHeight = 0;

	$: yearData = data.filter((d) => d.year === currentYear);

	$: xScale = scaleLinear(
		extent(data, (d) => d.year),
		[0, innerWidth]
	);
	$: yScale = scaleLinear(
		extent(yearData, (d) => d.value),
		[innerHeight, 0]
	);

	$: console.log(xScale.ticks(), xScale.domain(), data);
</script>

<Story name="Furtune 500">
	<Chartfull bind:innerWidth bind:innerHeight>
		<XAxis scale={xScale} orient="bottom" y={innerHeight} duration={100} let:tick>
			<text slot="label" x={innerWidth}>Year</text>
			<Tick {tick} y2={-innerHeight} />>
		</XAxis>
		<YAxis scale={yScale} />
	</Chartfull>
</Story>
