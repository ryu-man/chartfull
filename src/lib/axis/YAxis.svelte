<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { getChartfullContext } from 'graficos/chartfull';
	import { classNames } from '$lib/utils';
	import Axis from './Axis.svelte';
	import Tick from './Tick.svelte';
	import type { Scale } from './types';

	const { innerHeight$ } = getChartfullContext();

	export let scale: Scale;
	export let x = 0;
	export let y = 0;
	export let orient: 'left' | 'right' = 'left';
	export let tickArguments: unknown[] = [10];
	export let tickValues: string | undefined = undefined;
	export let tickFormat: ((tick: string | number | Date) => string) | undefined = undefined;

	export let tickSize = 6;
	export let tickPadding = 8;

	export let fontFamily: string | undefined = undefined;
	export let fontSize = '12pt';
	export let fontSizeAdjust: string | undefined = undefined;
	export let fontStretch: string | undefined = undefined;
	export let fontStyle: string | undefined = undefined;
	export let fontVariant: string | undefined = undefined;
	export let fontWeight: string | undefined = undefined;

	export let fill = 'rgba(0 0 0 / .4)';

	export let textAnchor: 'start' | 'middle' | 'end' = 'end';

	export let duration = 100;
	export let delay = 0;
	export let easing = cubicOut;

	let _class = '';
	export { _class as class };

	const k = orient === 'left' ? -1 : 1;
</script>

<Axis
	{scale}
	{x}
	{y}
	{orient}
	{tickPadding}
	{fontFamily}
	{fontWeight}
	{fontSize}
	{fontSizeAdjust}
	{fontVariant}
	{fontStyle}
	{fontStretch}
	{textAnchor}
	{fill}
	{tickValues}
	{tickArguments}
	{tickSize}
	{duration}
	{delay}
	{easing}
	{tickFormat}
	class={classNames(_class, 'y', orient)}
	let:ticks
	let:tickFormat
>
	{#each ticks as tick, index (+tick || tick)}
		<slot {index} {tick} {tickFormat}>
			<Tick {tick} />
		</slot>
	{/each}

	{@const d = `M${k * 6},0H0V${$innerHeight$}H${k * 6}`}
	<slot name="domain" {d}>
		<path class="domain" fill="none" stroke="rgba(0 0 0/ .5)" {d} />
	</slot>

	<g class="label" id="y-axis-label">
		<slot name="label" />
	</g>
</Axis>
