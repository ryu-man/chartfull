<script>
	import { Grafico, Line, XAxis, YAxis, Tick, access } from 'graficos';
	import { csv, extent, scaleLinear, scaleTime, timeParse } from 'd3';

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

	$: xGet = access(xScale, xAccessor);
	$: yGet = access(yScale, yAccessor);
</script>

<Grafico
	padding={{ left: 72, top: 16, right: 16, bottom: 16 }}
	fontSize="16"
	{...args}
	{data}
	bind:innerWidth
	bind:innerHeight
>
	<YAxis scale={yScale} let:y let:text>
		<text slot="label">Daily close (<tspan>$</tspan>)</text>

		<Tick {y} x2={-innerWidth}>
			<text>{text}</text>
		</Tick>
	</YAxis>

	<XAxis scale={xScale} y={innerHeight} orient="bottom" stroke="gray" let:text let:x>
		<Tick {x} y={0} y2={-innerHeight}>
			<text>{text}</text>
		</Tick>
		<!-- <text slot="label" x={innerWidth}>Years</text> -->
	</XAxis>

	<Line {data} y={yGet} x={xGet} stroke="black" strokeWidth="1" />

	<text x={innerWidth} dy="-16" text-anchor="end" font-size="24pt" fill="gray">
		Daily close of Apple stock
	</text>
</Grafico>
