<script context="module">
	export const SCALES = Symbol();
</script>

<script>
	import { setContext } from 'svelte';
	import { memorable } from 'svelte-tools';

	export let angleScale;
	export let raduisScale;

	const scales$ = memorable(raduisScale);
	$: scales$.set(raduisScale);

	setContext(SCALES, scales$);
</script>

<g class="radial-axis">
	{#each angleScale.ticks() as tick, i (tick)}
		<circle r={angleScale(tick)} fill="none" stroke="rgba(0 0 0 / {0.1 - i * 0.01})" />
	{/each}

	<slot />
</g>
