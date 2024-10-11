<script>
	import { Chartfull, XAxis, YAxis, Tick, get, Line, Grid, Tooltip } from 'graficos';
	import { csv, extent, scaleLinear, scaleTime, timeParse, line } from 'd3';
	import { format } from 'date-fns';

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

<Chartfull fontSize="16" {...args} {data} bind:innerWidth bind:innerHeight>
	<Grid width={innerWidth} height={innerHeight} />

	<YAxis scale={yScale} tickArguments={[10, '.2f']} let:tick>
		<Tick {tick} x2={-innerWidth} />
		<text slot="label">Daily close (<tspan>$</tspan>)</text>
	</YAxis>

	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<Tick {tick} y2={-innerHeight} />
		<text slot="label" x={innerWidth}>Years</text>
	</XAxis>

	<text
		x={innerWidth}
		dy={-64}
		text-anchor="end"
		dominant-baseline="text-before-edge"
		font-size="24pt"
		font-weight="600"
		fill="rgba(0,0,0, .4)"
	>
		Daily close of Apple stock
	</text>

	<Line d={dataPath(data)} stroke="rgba(0 0 0 / .6)" strokeWidth="1" />

	<Tooltip x={[xScale, xAccessor]} y={[yScale, yAccessor]} {data} let:value>
		{#if value}
			<div class="">
				<div>Years: {format(xAccessor(value), 'MMMM dd, yyyy')}</div>
				<div>Daily Close: {yAccessor(value)}</div>
			</div>
		{/if}
	</Tooltip>
</Chartfull>
