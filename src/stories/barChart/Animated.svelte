<script>
	import { Chartfull, XAxis, Tick, Rect } from 'graficos';
	import Spring from 'graficos/components/Spring.svelte';

	import { csv, schemeCategory10, max } from 'd3';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { onMount } from 'svelte';

	export let args = {};

	let data = [];

	csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
		Country: Country + '',
		Value: +Value
	})).then((res) => (data = res));

	let samples = [];

	onMount(() => {
		const interval = setInterval(() => {
			if (samples.length < data.length) {
				const [d] = data.slice(samples.length, data.length);
				samples = [...samples, d];
			} else {
				clearInterval(interval);
			}
		}, 900);

		return () => clearInterval(interval);
	});

	let innerWidth;
	let innerHeight;

	const [xAccessor, yAccessor] = [(d) => +d.Value, (d) => d.Country];

	$: xScale = scaleLinear([0, max(samples, (d) => +d.Value)], [0, innerWidth]);
	$: yScale = scaleBand(samples.map(yAccessor), [(innerHeight * samples.length) / 10, 0]).padding(
		0.2
	);
	$: scaleOrdinale = scaleOrdinal(samples.map(yAccessor), schemeCategory10);

	$: [xGet, yGet] = [(d) => xScale(xAccessor(d)), (d) => yScale(yAccessor(d))];
</script>

<Chartfull bind:innerWidth bind:innerHeight data={samples} padding={{ left: 196 }} {...args}>
	<XAxis scale={xScale} orient="bottom" y={innerHeight} let:tick>
		<Tick {tick} y2={-innerHeight} />
	</XAxis>

	{#each samples as item, i (i)}
		<Spring
			from={[0, 0, 0]}
			to={[yGet(item), xGet(item), 1]}
			damping={1}
			stiffness={0.2}
			let:value={[y, width, opacity]}
		>
			<g transform={`translate(${0},${y})`} {opacity}>
				<text
					dx={72 * (1 - opacity) - 16}
					dy={yScale.bandwidth() / 2}
					text-anchor="end"
					ominant-baseline="middle"
					font-size="24"
					font-weight="400"
					fill={scaleOrdinale(yAccessor(item))}>{yAccessor(item)}</text
				>
				<Rect
					{width}
					height={yScale.bandwidth()}
					fill={scaleOrdinale(yAccessor(item))}
					fill-opacity=".3"
					stroke={scaleOrdinale(yAccessor(item))}
					r="0 2 2 0"
				/>
			</g>
		</Spring>
	{/each}
</Chartfull>
