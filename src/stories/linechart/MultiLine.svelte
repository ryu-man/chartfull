<script>
	import { Grafico, Line, XAxis, YAxis, Tick, get } from 'graficos';
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

	$: xGet = get(xScale, xAccessor);
	$: yGet = get(yScale, yAccessor);
</script>

<Grafico {...args} {data} bind:innerWidth bind:innerHeight fontSize="12pt">
	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<Tick {tick} y2={-innerHeight} />
		<text slot="label" x={innerWidth}>Years</text>
	</XAxis>

	<YAxis scale={yScale} let:tick>
		<text slot="label">↑ Unemployment (%)</text>
		<Tick {tick} x2={-innerWidth} />
	</YAxis>

	<text
		x={innerWidth}
		text-anchor="end"
		dominant-baseline="text-before-edge"
		font-size="16pt"
		font-weight="600"
		fill="rgba(0,0,0, .1)"
		letter-spacing=".1"
	>
		Unemployment rate of various U.S. metro divisions from 2000 through 2013
	</text>

	<g class="data">
		{#each [...groups.entries()] as [key, data]}
			<Line {data} y={yGet} x={xGet} stroke={colorScale(key)} />
		{/each}
	</g>
</Grafico>
