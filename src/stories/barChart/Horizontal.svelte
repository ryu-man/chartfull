<script>
	import { Grafico, ScaleOrdinal, XAxis, Tick, get, Rect } from 'graficos';
	import Spring from 'graficos/components/Spring.svelte';
	import { csv, schemeCategory10, max } from 'd3';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { scaleOrdinal } from 'd3';
	import { min } from 'd3';

	export let args = {};

	let data = [];

	csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
		Country: Country + '',
		Value: +Value
	})).then((res) => (data = res));

	let innerWidth;
	let innerHeight;

	const [xAccessor, yAccessor] = [(d) => +d.Value, (d) => d.Country];

	$: xScale = scaleLinear([0, max(data, xAccessor)], [196, innerWidth]);
	$: yScale = scaleBand(data.map(yAccessor), [innerHeight, 0]).padding(0.2);
	$: colorScale = scaleOrdinal(data.map(yAccessor), schemeCategory10);

	$: xGet = get(xScale, xAccessor);
	$: yGet = get(yScale, yAccessor);
</script>

<Grafico padding={{ left: 0 }} bind:innerWidth bind:innerHeight {...args}>
	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<Tick {tick} y2={-innerHeight} />

		<text
			slot="label"
			x={innerWidth}
			y={-innerHeight}
			font-weight="700"
			font-size="32pt"
			fill="black"
			fill-opacity=".2"
			letter-spacing="4pt"
			text-anchor="end"
			dominant-baseline="hanging">INCOME</text
		>
	</XAxis>
	{#each data as item, i (i)}
		{@const min_range = min(xScale.range())}

		<Spring from={0} to={1} damping={0.5} stiffness={0.04} let:value={v}>
			<g transform={`translate(${min_range},${yGet(item)})`} opacity={v}>
				<text
					dx={-16 * v}
					dy={yScale.bandwidth() / 2}
					text-anchor="end"
					dominant-baseline="middle"
					font-size="24"
					font-weight="400"
					fill={colorScale(yAccessor(item))}
				>
					{yAccessor(item)}
				</text>
				<Rect
					width={(xGet(item) - min_range) * v}
					height={yScale.bandwidth()}
					fill={colorScale(yAccessor(item))}
					fill-opacity=".3"
					stroke={colorScale(yAccessor(item))}
					r="0 2 2 0"
				/>
			</g>
		</Spring>
	{/each}
</Grafico>
