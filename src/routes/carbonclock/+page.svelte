<script>
	import { Grafico, XAxis, YAxis, Tick, Line } from 'graficos';
	import { zoom, select, extent, scaleLinear, line } from 'd3';

	export let data = {
		array: []
	}

	let innerWidth;
	let innerHeight;

	const [xAccess, co2Acess, seasonallyAdjustedAccess] = [
		(d) => d.date,
		(d) => d.co2,
		(d) => d['seasonally_adjusted']
	];
	let _xScale;
	let _yScale;

	$: xScale = scaleLinear(extent(data.array, xAccess), [0, innerWidth]);
	$: yScale = scaleLinear(extent(data.array, co2Acess), [innerHeight, 0]);

	$: d1 = line()
		.x((d) => xScale(xAccess(d)))
		.y((d) => yScale(co2Acess(d)));
	$: d2 = line()
		.x((d) => xScale(xAccess(d)))
		.y((d) => yScale(seasonallyAdjustedAccess(d)));

	let d3zoom = zoom()
		.scaleExtent([0.5, 5])
		.duration(200)
		.on('zoom', (e) => {
			const transform = e.transform;

			if (!_xScale) {
				_xScale = xScale;
			}
			if (!_yScale) {
				_yScale = yScale;
			}

			xScale = transform.rescaleX(_xScale);
			yScale = transform.rescaleY(_yScale);
		});
	$: d3zoom.extent([
		[0, 0],
		[innerWidth, innerHeight]
	]);

	let padding = { top: 54, left: 72, bottom: 32 };
	let offsetX = 0;
	let offsetY = 0;

	function zoomable(node, zoom, x, y) {
		select(node).call(zoom);
	}
</script>

<Grafico
	height={0}
	{padding}
	bind:innerWidth
	bind:innerHeight
	on:mousemove={(e) => {
		offsetX = Math.max(0, e.offsetX - padding.left);
		offsetY = Math.max(0, e.offsetY - padding.top);
	}}
>
	<rect width={innerWidth} height={innerHeight} use:zoomable={d3zoom} fill="white" />
	<YAxis scale={yScale} let:tick let:index>
		<Tick {tick} x2={-innerWidth} duration={200} />
		<text slot="label" fill="rgb(64 55 201 / 30%)" pointer-events="none">Atmospheric CO₂</text>
	</YAxis>

	<XAxis scale={xScale} orient="bottom" y={innerHeight} tickFormat={(d) => d + ''} let:tick>
		<Tick {tick} y2={-innerHeight} duration={200} />
	</XAxis>

	<g stroke="rgb(0 0 0 / .3)" pointer-events="none">
		<line x2={innerWidth} y1={offsetY} y2={offsetY} />
		<line x1={offsetX} x2={offsetX} y2={innerHeight} />
	</g>

	<g>
		{#each data.array as d}
			<circle cx={xScale(xAccess(d))} cy={yScale(co2Acess(d))} r="2" fill="rgb(64 55 201 / 40%)" />
		{/each}
		<Line d={d1(data.array)} stroke="rgba(0,0,0, .1)" />
		<Line
			d2={d2(data.array)}
			stroke="rgb(64 55 201 / 50%)"
			strokeWidth="3"
			on:mouseenter={(e) => {}}
			on:mouseleave={(e) => {}}
		/>
	</g>

	<text x={offsetX} y={offsetY} dx={16}>
		{xScale.invert(offsetX).toFixed(2)}
	</text>
	<text x={offsetX} y={offsetY} dx={-16} text-anchor="end">
		{yScale.invert(offsetY).toFixed(2)}
	</text>
</Grafico>
