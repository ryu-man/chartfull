<script>
	import { Grafico, Line, XAxis, YAxis, Tick, access } from 'graficos';
	import {
		csv,
		extent,
		scaleLinear,
		scaleTime,
		schemeCategory10,
		timeParse,
		group,
		scaleOrdinal
	} from 'd3';

	export let args = {};

	let data = [];

	const timeParser = timeParse('%Y-%m-%d');
	const xAccessor = (d) => d.date;
	const yAccessor = (d) => d.unemployment;
	const zAccessor = (d) => d.division;

	csv('./bls-metro-unemployment.csv', (d) => ({
		date: timeParser(xAccessor(d)),
		unemployment: +yAccessor(d),
		division: zAccessor(d)
	})).then((res) => (data = res));

	let innerWidth;
	let innerHeight;

	$: xScale = scaleTime(extent(data, xAccessor), [0, innerWidth]);
	$: yScale = scaleLinear(extent(data, yAccessor), [innerHeight, 0]);
	$: groups = group(data, zAccessor);
	$: colorScale = scaleOrdinal(groups.keys(), schemeCategory10);

	$: xGet = access(xScale, xAccessor);
	$: yGet = access(yScale, yAccessor);
</script>

<Grafico {...args} {data} bind:innerWidth bind:innerHeight fontSize="12pt">
	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:text let:x>
		<Tick {x} y2={-innerHeight}>
			<text>{text}</text>
		</Tick>
		<text slot="label" x={innerWidth}>Years</text>
	</XAxis>

	<YAxis scale={yScale} let:y let:text>
		<text slot="label">↑ Unemployment (%)</text>
		<Tick {y} x2={-innerWidth}>
			<text>{text}</text>
		</Tick>
	</YAxis>

	<g class="data">
		{#each [...groups.entries()] as [key, data]}
			<Line {data} y={yGet} x={xGet} stroke={colorScale(key)} />
		{/each}
	</g>

	<text x={innerWidth} dy="-16" text-anchor="end" font-size="16pt" font-weight="600" fill="gray">
		Unemployment rate of various U.S. metro divisions from 2000 through 2013
	</text>
</Grafico>
