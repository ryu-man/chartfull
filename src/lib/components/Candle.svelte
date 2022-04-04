<script>
	export let x;
	export let low;
	export let high;
	export let open;
	export let close;
	export let width;

	export let data = {};

	$: color = open > close ? 'green' : 'red';
	$: height = Math.abs(close - open);
</script>

<g
	class="candle"
	transform="translate({x})"
	{color}
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
	<line y1={low} y2={high} stroke="currentColor" />
	<rect x={-width / 2} y={Math.min(open, close)} {width} {height} fill="currentColor" />
	<slot {data} />
</g>
