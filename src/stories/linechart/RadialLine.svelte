<script>
	import { Grafico, Line } from 'graficos';
	import RadialAxis from 'graficos/axis/RadialAxis.svelte';
	import RadialTick from 'graficos/axis/RadialTick.svelte';
	import { csv, timeParse, scaleRadial, scaleTime, extent, lineRadial } from 'd3';

	export let args = {};

	let data = [];

	const timeparser = timeParse('%d-%b-%Y');
	const converter = (d) => {
		return {
			date: timeparser(d.Date),
			open: +d.Open,
			close: +d.Close,
			high: +d.High,
			low: +d.Low,
			volume: +d.Volume
		};
	};
	csv('./twitter.csv', converter).then((res) => {
		console.log(res);
		data = res;
	});

	let innerWidth = 300;
	let innerHeight = 300;

	$: xScale = scaleTime()
		.domain(extent(data, (d) => d.date))
		.range([0, 2 * Math.PI]);
	$: yScale = scaleRadial()
		.domain(extent(data, (d) => d.close))
		.range([100, Math.min(innerWidth, innerHeight) / 2 - 6]);

	$: line = lineRadial()
		.angle((d) => xScale(d.date))
		.radius((d) => yScale(d.close));
</script>

<Grafico
	bind:innerWidth
	bind:innerHeight
	{...args}
	{data}
	padding={{ top: 24, left: 64, right: 0, bottom: 24 }}
	fontSize="14"
>
	<g transform="translate({innerWidth / 2}, {innerHeight / 2})">
		<RadialAxis raduisScale={xScale} angleScale={yScale}>
			<text
				text-anchor="middle"
				fill="rgba(0 0 0 / .2)"
				font-weight="900"
				font-size="20pt"
				dominant-baseline="middle">Twitter</text
			>

			{#each xScale.ticks() as tick, i}
				<RadialTick {tick} />
			{/each}
		</RadialAxis>
		<!-- {#each yScale.ticks() as tick, i}
			<circle r={yScale(tick)} fill="none" stroke="rgba(0 0 0 / {0.1 - i * 0.01})" />
		{/each} -->

		<!-- transform={angle < Math.PI / 2 || angle > (Math.PI * 3) / 2
            ? 'rotate(90)translate(0,22)'
            : 'rotate(-90)translate(0, -15)'} -->

		<Line d={line(data)} stroke-width="2" />
	</g>
</Grafico>

<style>
	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}
</style>
