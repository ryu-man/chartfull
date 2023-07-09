<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico, XAxis, YAxis, Tick, Line } from 'graficos';
	import { csv, zoom, select } from 'd3';
	import { extent } from 'd3-array';
	import { scaleLinear } from 'd3-scale';
	import { line } from 'd3';

	let data = [];

	const dataConverter = (d) => ({
		date: parseFloat(d.Date),
		co2: parseFloat(d.CO2),
		seasonally_adjusted: parseFloat(d.seasonally_adjusted)
	});

	csv('./monthly_in_situ_co2_mlo.csv', dataConverter).then((res) => {
		data = res.filter((d) => d.co2 >= 0);
	});

	let innerWidth;
	let innerHeight;

	const [xAccess, co2Acess, seasonallyAdjustedAccess] = [
		(d) => d.date,
		(d) => d.co2,
		(d) => d['seasonally_adjusted']
	];
	let _xScale;
	let _yScale;

	$: xScale = scaleLinear(extent(data, xAccess), [0, innerWidth]);
	$: yScale = scaleLinear(extent(data, co2Acess), [innerHeight, 0]);

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

<Meta
	title="Charts/Others"
	argTypes={{
		width: { control: { type: 'number' } },
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="Carbon clock chart"
	args={{
		height: 0
	}}
	let:args
>
	<Grafico
		height={args.height}
		{padding}
		bind:innerWidth
		bind:innerHeight
		on:pointermove={(e) => {
			offsetX = Math.max(0, e.offsetX - padding.left);
			offsetY = Math.max(0, e.offsetY - padding.top);
		}}
	>
		<defs>
			<clipPath id="clip">
				<rect width={innerWidth} height={innerHeight} />
			</clipPath>
		</defs>

		<rect width={innerWidth} height={innerHeight} use:zoomable={d3zoom} fill="white" />

		<YAxis scale={yScale} duration={100} let:tick let:index>
			<Tick {tick} x2={-innerWidth} />
			<text slot="label" fill="rgb(64 55 201 / 30%)" pointer-events="none" dy="32">Atmospheric CO₂</text>
		</YAxis>

		<XAxis
			scale={xScale}
			duration={100}
			orient="bottom"
			y={innerHeight}
			tickFormat={(d) => d + ''}
			let:tick
		>
			<Tick {tick} y2={-innerHeight} />
			<text slot="label" text-anchor="end" pointer-events="none" x={innerWidth} dx="-32">Year</text>
		</XAxis>

		<g stroke="rgb(0 0 0 / .3)" pointer-events="none">
			<line x2={innerWidth} y1={offsetY} y2={offsetY} />
			<line x1={offsetX} x2={offsetX} y2={innerHeight} />
		</g>

		<g clip-path="url(#clip)">
			{#each data as d}
				<circle
					cx={xScale(xAccess(d))}
					cy={yScale(co2Acess(d))}
					r="2"
					fill="rgb(64 55 201 / 40%)"
				/>
			{/each}
			<Line d={d1(data)} stroke="rgba(0,0,0, .1)" />
			<Line
				d2={d2(data)}
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
</Story>
