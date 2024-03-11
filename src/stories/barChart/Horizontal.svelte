<script>
	import { Chartfull, XAxis, Tick, get, Rect } from 'graficos';
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

	$: xScale = scaleLinear([0, max(data, xAccessor)], [0, innerWidth]);
	$: yScale = scaleBand(data.map(yAccessor), [innerHeight, 0]).padding(0.2);
	$: colorScale = scaleOrdinal(data.map(yAccessor), schemeCategory10);

	$: xGet = get(xScale, xAccessor);
	$: yGet = get(yScale, yAccessor);
</script>

<Chartfull padding={{ left: 0, top:8, bottom: 48 }} bind:innerWidth bind:innerHeight {...args}>
	<XAxis scale={xScale} y={innerHeight} orient="bottom" tickArguments={[10, '.2f']} let:tick>
		<Tick {tick} y2={-innerHeight} />

		<text
			slot="label"
			x={innerWidth}
			y={-innerHeight}
			font-weight="700"
			font-size="24pt"
			fill="black"
			fill-opacity=".2"
			text-anchor="end"
			dominant-baseline="hanging">INCOME</text
		>
	</XAxis>

	{#each data as item, i (i)}
		{@const min_range = min(xScale.range())}
		{@const max_range = max(xScale.range())}
		{@const x = xGet(item)}
		{@const width = x - min_range}

		<g transform={`translate(${min_range},${yGet(item)})`}>
			<text
				x={Math.min(width+16, max_range-164 )}
				
				dy={yScale.bandwidth() / 2}
				text-anchor="start"
				dominant-baseline="middle"
				font-size="14pt"
				font-weight="400"
				fill={colorScale(yAccessor(item))}
			>
				{yAccessor(item)}
			</text>

			<Rect
				width={width}
				height={yScale.bandwidth()}
				fill={colorScale(yAccessor(item))}
				fill-opacity=".3"
				stroke={colorScale(yAccessor(item))}
				r="4"
			/>
		</g>
	{/each}
</Chartfull>
