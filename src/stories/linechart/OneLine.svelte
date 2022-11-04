<script>
	import { Grafico, XAxis, YAxis, Tick, get, Line } from 'graficos';
	import { csv, extent, scaleLinear, scaleTime, timeParse } from 'd3';
	import { line } from 'd3-shape';

	export let args = {};

	let data = [];

	const parser = timeParse('%Y-%m-%d');

	const xAccessor = (d) => d.date;
	const yAccessor = (d) => d.close;

	csv('./aapl.csv', (d) => ({
		date: parser(xAccessor(d)),
		close: +yAccessor(d)
	})).then((res) => (data = res));

	let innerWidth;
	let innerHeight;

	$: xScale = scaleTime(extent(data.map(xAccessor)), [0, innerWidth]);
	$: yScale = scaleLinear(extent(data.map(yAccessor)), [innerHeight, 0]);

	$: xGet = get(xScale, xAccessor);
	$: yGet = get(yScale, yAccessor);

	$: dataPath = line(xGet, yGet);
</script>

<Grafico
	padding={{ left: 72, top: 16, right: 16, bottom: 16 }}
	fontSize="16"
	{...args}
	{data}
	bind:innerWidth
	bind:innerHeight
>
	<YAxis scale={yScale} let:tick>
		<Tick {tick} x2={-innerWidth} />
		<text slot="label">Daily close (<tspan>$</tspan>)</text>
	</YAxis>

	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<Tick {tick} y2={-innerHeight} />
		<text slot="label" x={innerWidth}>Years</text>
	</XAxis>

	<text
		x={innerWidth}
		text-anchor="end"
		dominant-baseline="text-before-edge"
		font-size="24pt"
		font-weight="600"
		fill="rgba(0,0,0, .1)"
	>
		Daily close of Apple stock
	</text>

	<Line d={dataPath(data)} stroke="rgba(0 0 0 / .6)" strokeWidth="1" />
</Grafico>
