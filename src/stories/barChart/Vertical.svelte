<script>
	import { Chartfull, YAxis, Tick, Rect } from 'graficos';
	import Spring from 'graficos/components/Spring.svelte';
	import { csv, schemeCategory10, max, scaleBand, scaleLinear, scaleOrdinal } from 'd3';

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

<Chartfull
	bind:innerWidth
	bind:innerHeight
	{...args}
	data={samples}
	padding={{ bottom: 48, left: 32 }}
	fontSize="16"
>
	{#each data as item (xAccessor(item))}
		<Spring from={innerHeight} to={yGet(item)} damping={0.5} stiffness={0.04} let:value={y}>
			{@const yProgress = (innerHeight - y) / (innerHeight - yGet(item))}

			<g transform={`translate(${xGet(item)},${0})`}>
				<Rect
					class={item.Country}
					{y}
					width={xScale.bandwidth()}
					height={innerHeight - y}
					fill={colorScale(item.Country)}
					fill-opacity=".3"
					stroke={colorScale(item.Country)}
					r="2 2 0 0"
				/>
				<text
					y={Math.max(y - 8, 128)}
					dy="0"
					dx={xScale.bandwidth() / 2}
					text-anchor="end"
					font-size="12pt"
					fill={colorScale(item.Country)}
					writing-mode="vertical-lr"
					style:mix-blend-mode="plus-lighter">{xAccessor(item)}</text
				>
			</g>
		</Spring>
	{/each}
	<text
		x={innerWidth}
		y={innerHeight}
		dy={72}
		text-anchor="end"
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
		<text slot="label" letter-spacing="4pt">Income</text>
	</YAxis>
</Chartfull>
