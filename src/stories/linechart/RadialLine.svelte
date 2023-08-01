<script>
	import { Chartfull, Line } from 'graficos';
	import AngleAxis from 'graficos/axis/AngleAxis.svelte';
	import RaduisAxis from 'graficos/axis/RaduisAxis.svelte';
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

	$: raduisScale = scaleTime()
		.domain(extent(data, (d) => d.date))
		.range([0, 2 * Math.PI]);

	$: angleScale = scaleRadial()
		.domain(extent(data, (d) => d.close))
		.range([100, Math.min(innerWidth, innerHeight) / 2 - 6]);

	$: line = lineRadial()
		.angle((d) => raduisScale(d.date))
		.radius((d) => angleScale(d.close));
</script>

<Chartfull
	bind:innerWidth
	bind:innerHeight
	{...args}
	{data}
	padding={{ top: 24, left: 64, right: 0, bottom: 24 }}
	fontSize="14"
>
	<g transform="translate({innerWidth / 2}, {innerHeight / 2})">
		<AngleAxis scale={angleScale} let:tick let:i>
			{@const r = angleScale(tick)}
			<g>
				<circle {r} fill="none" stroke="rgba(0 0 0 / {0.1 - i * 0.01})" />
				<text x={r} dx="4" font-size="8pt" fill="rgba(0 0 0 / .7)">{tick}</text>
			</g>
		</AngleAxis>

		<RaduisAxis scale={raduisScale} r={angleScale(angleScale.domain().at(0))} let:tick>
			<RadialTick {tick} angle={raduisScale(tick)} />
		</RaduisAxis>

		<Line d={line(data)} stroke-width="2" />
	</g>
</Chartfull>
