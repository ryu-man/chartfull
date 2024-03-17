<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Others',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'string' } },
			height: { control: { type: 'string' } }
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, Tick, Line, Grid } from 'graficos';
	import { csv, zoom, select, zoomIdentity } from 'd3';
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

	let transform = zoomIdentity;

	const [xAccess, co2Acess, seasonallyAdjustedAccess] = [
		(d) => d.date,
		(d) => d.co2,
		(d) => d['seasonally_adjusted']
	];

	$: _xScale = scaleLinear(extent(data, xAccess), [0, innerWidth]);
	$: _yScale = scaleLinear(extent(data, co2Acess), [innerHeight, 0]);

	$: xScale = transform.rescaleX(_xScale);
	$: yScale = transform.rescaleY(_yScale);

	$: d1 = line()
		.x((d) => xScale(xAccess(d)))
		.y((d) => yScale(co2Acess(d)));

	$: d2 = line()
		.x((d) => xScale(xAccess(d)))
		.y((d) => yScale(seasonallyAdjustedAccess(d)));

	let d3zoom = zoom()
		.scaleExtent([0.5, 5])
		.duration(100)
		.on('zoom', (e) => {
			transform = e.transform;
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

	function onPointerMoveHandler(e: PointerEvent) {
		const currentTarget = e.currentTarget as SVGRectElement;
		const { left, top } = currentTarget.getBoundingClientRect();
		offsetX = Math.max(0, e.offsetX - padding.left);
		offsetY = Math.min(innerHeight, Math.max(0, e.offsetY - padding.top));
	}
</script>

<Story name="Carbon clock chart" let:args>
	<Chartfull height={args.height} {padding} {data} bind:innerWidth bind:innerHeight>
		<defs>
			<clipPath id="clip">
				<rect width={innerWidth} height={innerHeight} />
			</clipPath>
		</defs>

		<rect
			width={innerWidth}
			height={innerHeight}
			use:zoomable={d3zoom}
			fill="transparent"
			on:pointermove={onPointerMoveHandler}
		/>

		<Grid width={innerWidth} height={innerHeight} />

		<YAxis scale={yScale} tickArguments={[13, '.1f']} duration={200} let:tick let:index>
			<Tick {tick} x2={-innerWidth} />
			<text slot="label" fill="rgb(64 55 201 / 20%)" pointer-events="none" dy="32"
				>Atmospheric CO₂</text
			>
		</YAxis>

		<XAxis
			scale={xScale}
			duration={200}
			orient="bottom"
			y={innerHeight}
			tickFormat={(d) => d + ''}
			let:tick
		>
			<Tick {tick} y2={-innerHeight} />
			<text
				slot="label"
				fill="rgb(64 55 201 / 20%)"
				text-anchor="end"
				pointer-events="none"
				x={innerWidth}
				dx="-32">Year</text
			>
		</XAxis>

		<g clip-path="url(#clip)">
			{#each data as d}
				<circle
					cx={xScale(xAccess(d))}
					cy={yScale(co2Acess(d))}
					r={transform.k * 1.2}
					fill="rgb(64 55 201 / 40%)"
					pointer-events="none"
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

		<g color="rgb(0 0 0 / .3)" pointer-events="none" stroke-dasharray="8">
			<g>
				<line x2={innerWidth} y1={offsetY} y2={offsetY} stroke="currentColor" />
				<text
					x={0}
					y={Math.max(40, offsetY)}
					dx={20}
					dy={-20}
					text-anchor="start"
					fill="currentColor"
					font-size="14pt"
					font-weight="900"
				>
					{yScale.invert(offsetY).toFixed(2)}
				</text>
			</g>

			<g>
				<line x1={offsetX} x2={offsetX} y2={innerHeight} stroke="currentColor" />
				<text
					x={Math.min(offsetX, innerWidth - 80)}
					y={innerHeight}
					dx={20}
					dy={-20}
					fill="currentColor"
					font-size="14pt"
					font-weight="900"
					text-anchor="start"
				>
					{xScale.invert(offsetX).toFixed(0)}
				</text>
			</g>
		</g>
	</Chartfull>
</Story>
