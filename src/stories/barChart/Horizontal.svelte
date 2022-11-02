<script>
	import { Grafico, ScaleOrdinal, XAxis, Tick, get, Rect } from 'graficos';
	import Spring from 'graficos/components/Spring.svelte';
	import { csv, schemeCategory10, max } from 'd3';
	import { scaleLinear, scaleBand } from 'd3-scale';

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

	$: xGet = get(xScale, xAccessor);
	$: yGet = get(yScale, yAccessor);
</script>

<Grafico padding={{ left: 196 }} bind:innerWidth bind:innerHeight {...args}>
	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<Tick {tick} y2={-innerHeight} />+
	</XAxis>
	<ScaleOrdinal domain={data.map(yAccessor)} range={schemeCategory10} let:scale={scaleOrdinale}>
		{#each data as item, i (i)}
			<Spring from={0} to={1} damping={0.5} stiffness={0.04} let:value={v}>
				<g transform={`translate(${0},${yGet(item)})`} opacity={v}>
					<text
						dx={-16 * v}
						dy={yScale.bandwidth() / 2}
						text-anchor="end"
						dominant-baseline="middle"
						font-size="24"
						font-weight="400"
						fill={scaleOrdinale(yAccessor(item))}
					>
						{yAccessor(item)}
					</text>
					<Rect
						width={xGet(item) * v}
						height={yScale.bandwidth()}
						fill={scaleOrdinale(yAccessor(item))}
						fill-opacity=".3"
						stroke={scaleOrdinale(yAccessor(item))}
						r="0 2 2 0"
					/>
				</g>
			</Spring>
		{/each}
	</ScaleOrdinal>
</Grafico>
