<script>
	import { scaleLinear } from 'd3';
	import { onMount } from 'svelte';

	export let features = [];
	export let scale;

	let spin = -Math.PI / 2;

	$: range = scale.range();
	$: slice = (i) => (2 * Math.PI * i) / features.length;
</script>

<g>
	<g>
		{#each features as feature, i}
			{@const slc = slice(i)}
			{@const sin = Math.sin(slc + spin)}
			{@const cos = Math.cos(slc + spin)}
			{@const x = cos * Math.max(...range)}
			{@const y = sin * Math.max(...range)}

			<line x1={x} y1={y} x2={0} y2={0} stroke="rgba(0 0 0 / .12)" stroke-width="2px" />
			<text
				{x}
				{y}
				dx={cos * 24}
				dy={sin * 24}
				font-size="20pt"
				font-weight="700"
				fill="rgba(0 0 0 / .3)"
				dominant-baseline="middle"
				text-anchor="middle">{feature}</text
			>
		{/each}
	</g>
	{#each scale.ticks() as tick}
		{@const r = scale(tick)}
		<g>
			<circle cx={0} cy={0} {r} fill="none" stroke="rgba( 0 0 0 / .1)" stroke-width="2px" />
			<text
				x={0}
				y={-r}
				text-anchor="middle"
				dominant-baseline="text-after-edge"
				font-size="12pt"
				fill="rgba(0 0 0 / .3)">{tick.toString()}</text
			>
		</g>
	{/each}
</g>
