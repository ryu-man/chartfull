<script lang="ts">
	type Candle = {
		low: number;
		high: number;
		open: number;
		close: number;
	};

	export let candle: Candle;
	export let x = 0;
	export let y = 0;
	export let scale;
	export let width: number;
	export let opacity = 1
	export let strokeOpacity = opacity
	export let fillOpacity = opacity

	export let data = {};

	$: color = candle.open > candle.close ? 'green' : 'red';
	$: lowScaled = scale(candle.low);
	$: highScaled = scale(candle.high);
	$: openScaled = scale(candle.open);
	$: closeScaled = scale(candle.close);

	$: height = Math.abs(closeScaled - openScaled);
</script>

<g
	class="candle"
	transform="translate({x}, {y})"
	{color}
	{opacity}
	on:click
	on:dblclick
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseover
	on:mouseout
	on:mousedown
	on:mouseup
	on:focus
	on:blur
>
	<line y1={lowScaled} y2={highScaled} stroke="currentColor" stroke-opacity={strokeOpacity} />
	<rect x={-width / 2} y={Math.min(openScaled, closeScaled)} {width} {height} fill="currentColor" fill-opacity={fillOpacity} />
	<slot {data} />
</g>
