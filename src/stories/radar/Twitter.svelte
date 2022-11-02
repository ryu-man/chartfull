<script>
	import { Grafico } from 'graficos';
	import { scaleLinear, csv, timeParse, scaleRadial, scaleTime, extent, lineRadial } from 'd3';
	import { format } from 'date-fns';

	export let args = {};

	let data = [];
	let features = ['A', 'B', 'C', 'D', 'E', 'F'];
	let mx = 0;
	//generate the data

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

	$: rScale = scaleLinear([0, mx], [100, Math.min(innerWidth / 2, innerHeight / 2)]);
	$: slice = (2 * Math.PI) / features.length;

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
		<!-- <Grid {features} scale={rScale} /> -->

		{#each yScale.ticks() as tick, i}
			<circle r={yScale(tick)} fill="none" stroke="rgba(0 0 0 / {0.1 - i * 0.01})" />
		{/each}
		<circle r={yScale(yScale.domain()[0])} fill="none" stroke="rgba(0 0 0 / {0.12})" />
		<text
			text-anchor="middle"
			fill="rgba(0 0 0 / .2)"
			font-weight="900"
			font-size="20pt"
			dominant-baseline="middle">Twitter</text
		>

		{#each xScale.ticks(12) as tick, i}
			{@const angle = xScale(tick)}
			<g
				font-size="9pt"
				text-anchor="middle"
				transform="rotate({(xScale(tick) * 180) / Math.PI - 90})translate({100}, 0)"
			>
				<line x2="-5" stroke="rgba(0 0 0 / .3)" />
				<text
					fill="rgba(0 0 0 / .3)"
					transform={angle < Math.PI / 2 || angle > (Math.PI * 3) / 2
						? 'rotate(90)translate(0,22)'
						: 'rotate(-90)translate(0, -15)'}>{format(tick, 'MMM')}</text
				>
			</g>
		{/each}

		<path d={line(data)} stroke="rgba(0 0 0 / .15)" stroke-width="2" fill="none" />
	</g>
</Grafico>

<style>
	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}
</style>
