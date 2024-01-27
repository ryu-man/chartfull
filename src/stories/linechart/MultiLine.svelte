<script>
	import { Chartfull, XAxis, YAxis, Tick, get, Line, Grid, Legend } from 'graficos';
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
	import { line } from 'd3-shape';

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
	$: gen = line().x(xGet).y(yGet);
</script>

<Chartfull {...args} {data} bind:innerWidth bind:innerHeight fontSize="12pt">
	<Grid width={innerWidth} height={innerHeight} />

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
		dy={-54}
		text-anchor="end"
		dominant-baseline="text-before-edge"
		font-size="16pt"
		font-weight="600"
		fill="rgba(0 0 0 / .4)"
		letter-spacing="0"
	>
		Unemployment rate of various U.S. metro divisions from 2000 through 2013
	</text>

	<g class="data">
		{#each [...groups.entries()] as [key, data]}
			<Line d={gen(data)} stroke={colorScale(key)} />
		{/each}
	</g>

	<Legend x={64} y={16} dx="0" width="36vw">
		Risus eu ultrices lacus neque viverra efficitur himenaeos eros tristique senectus cras primis duis
	</Legend>
</Chartfull>
