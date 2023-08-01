<script>
	import { Chartfull, Line, Area } from 'graficos';
	import { scaleBand, scaleLinear, scaleRadial } from 'd3-scale';
	import { lineRadial, curveCardinalClosed, curveCardinal } from 'd3';
	import { onMount } from 'svelte';

	export let args = {};
	let data = [];
	let features = ['A', 'B', 'C', 'D', 'E', 'F'];
	let mx = 0;
	//generate the data

	onMount(() => {
		for (let i = 0; i < 3; i++) {
			const subArray = [];
			//each feature will be a random number from 1-9
			features.forEach((f) => {
				const num = 1 + Math.random() * 8;
				mx = Math.max(mx, num);

				subArray.push({
					feature: f,
					value: num
				});
			});
			data.push(subArray);
		}
		console.log(data);
	});

	let innerWidth = 300;
	let innerHeight = 300;

	$: xScale = scaleBand()
		.domain(features)
		.range([0, 2 * Math.PI]);

	$: yScale = scaleRadial()
		.domain([0, mx])
		.range([100, Math.min(innerWidth, innerHeight) / 2 - 6]);

	$: fontScale = scaleLinear().domain(yScale.range()).range([1, 0.4]);

	$: gen = lineRadial()
		.radius((d) => yScale(d.value))
		.angle((d, i) => xScale(d.feature))
		.curve(curveCardinalClosed.tension(.4));
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
		{#each yScale.ticks() as tick, i}
			<circle r={yScale(tick)} fill="none" stroke="rgba(0 0 0 / {0.1 - i * 0.01})" />
			<text
				x={4}
				y={-yScale(tick) - 4}
				font-size="{fontScale(yScale(tick)) * 20}pt"
				fill="rgba(0 0 0 / .2)">{tick}</text
			>
		{/each}
		{#each xScale.domain() as tick, i}
			{@const angle = xScale(tick)}
			{@const r = Math.max(...yScale.range())}

			<g
				font-size="9pt"
				text-anchor="middle"
				transform="rotate({(xScale(tick) * 180) / Math.PI - 90})translate({r}, 0)"
			>
				<line
					x1={-r }
					y1={0}
					x2={0}
					y2={0}
					stroke="rgba(0 0 0 / .09)"
				/>
				<text
					font-size="24pt"
					fill="rgba(0 0 0 / .3)"
					transform={angle < Math.PI / 2 || angle > (Math.PI * 3) / 2
						? 'rotate(90) translate(0,-16)'
						: 'rotate(-90) translate(0, 32)'}>{tick}</text
				>
			</g>
		{/each}

		{#each data as item}
			<Area d={gen(item)} />
		{/each}
	</g>
</Chartfull>

<style>
	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}
</style>
