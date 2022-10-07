<script>
	import { Grafico, Declare, ScaleOrdinal, XAxis, YAxis, Tick } from 'graficos';
	import Spring from 'graficos/components/Spring.svelte';
	import { csv, schemeCategory10, max } from 'd3';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

	export let args = {};

	let data = [];

	csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
		Country: Country + '',
		Value: +Value
	})).then((res) => (data = res));

	let samples = [];

	let innerWidth;
	let innerHeight;
	const [xAccessor, yAccessor] = [(d) => d.Country, (d) => +d.Value];

	$: xScale = scaleBand(data.map(xAccessor), [innerWidth, 0]).padding(0.1);
	$: yScale = scaleLinear([0, max(data, (d) => +d.Value)], [innerHeight, 0]);
	$: colorScale = scaleOrdinal(data.map(xAccessor), schemeCategory10);

	$: xGet = (d) => xScale(xAccessor(d));
	$: yGet = (d) => yScale(yAccessor(d));
</script>

<Grafico
	bind:innerWidth
	bind:innerHeight
	{...args}
	data={samples}
	padding={{ bottom: 32, left: 32 }}
	fontSize="16"
>
	{#each data as item (xAccessor(item))}
		<Spring from={innerHeight} to={yGet(item)} damping={0.5} stiffness={0.04} let:value={y}>
			{@const yProgress = (innerHeight - y) / (innerHeight - yGet(item))}

			<g transform={`translate(${xGet(item)},${0})`}>
				<rect
					class={item.Country}
					{y}
					width={xScale.bandwidth()}
					height={innerHeight - y}
					fill={colorScale(item.Country)}
					fill-opacity=".8"
				/>
				<text
					dy={innerHeight - 16 * yProgress}
					dx={xScale.bandwidth() / 2}
					text-anchor="middle"
					font-size="11pt"
					style:mix-blend-mode="plus-lighter"
					fill="rgb(0 0 0 / 1)">{xAccessor(item)}</text
				>
			</g>
		</Spring>
	{/each}
	<text
		x={innerWidth / 2}
		y={innerHeight}
		dy={54}
		text-anchor="middle"
		font-size="36pt"
		font-weight="900"
		letter-spacing="8pt"
		fill="rgb(0 0 0 / .3)">Countries</text
	>

	<YAxis
		scale={yScale}
		orient="left"
		tickSize={innerWidth}
		tickFormat={(d) => {
			const q = d / 1000;
			return q === 0 ? '0' : q + 'K';
		}}
		let:tick
	>
		<Tick {tick} x2={-innerWidth} />
		<text
			slot="label"
			font-weight="700"
			font-size="32pt"
			fill="black"
			fill-opacity=".2"
			letter-spacing="4pt">Income</text
		>
	</YAxis>

	<!-- <XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<text
			slot="label"
			x={innerWidth}
			text-anchor="end"
			font-weight="700"
			font-size="32pt"
			fill="black"
			fill-opacity=".2">Country</text
		>
		<Tick {tick} dx={xScale.bandwidth() / 2} stroke="#e8e8e8" />
	</XAxis> -->
</Grafico>
