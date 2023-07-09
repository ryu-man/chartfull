<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { cubicOut, linear } from 'svelte/easing';
	import { writable } from 'svelte-tools';
	import { getChartfullContext } from 'graficos/chartfull';
	import { classNames } from '$lib/utils';
	import Axis from './Axis.svelte';
	import Tick from './Tick.svelte';
	import { setAxisContext } from './context';
	import { memorable } from 'svelte-tools/memorable';

	const { innerHeight$ } = getChartfullContext();

	export let id = 'y';
	export let x = 0;
	export let y = 0;
	export let scale;
	export let ticks;
	export let orient = 'left';
	export let tickArguments = [8];
	export let tickValues;
	export let tickFormat;

	export let tickSize = 6;
	export let tickPadding = 8;
	export let tickOffset = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;
	export let tickColor;

	export let fontFamily;
	export let fontSize = '12pt';
	export let fontSizeAdjust;
	export let fontStretch;
	export let fontStyle;
	export let fontVariant;
	export let fontWeight;

	export let stroke = 'rgba(0 0 0 / .2)';
	export let strokeWidth = 2;
	export let strokeOpacity;
	export let strokeLinecap;
	export let strokeLinejoin;
	export let strokeDasharray;
	export let strokeDashoffset;
	export let strokeMiterlimit;
	export let fill = 'rgba(0 0 0 / .4)';
	export let d;

	export let duration = 100;
	export let delay = 0;
	export let easing = cubicOut;

	let _class = '';
	export { _class as class };

	const k = orient === 'left' ? -1 : 1;

	const isPathDataSet = !!d;

	const identity = (d) => d;

	const [currentScale$, previousScale$] = memorable(scale);
	$: currentScale$.set(scale);

	const tickFormat$ = writable(identity);
	$: tickFormat$.set(tickFormat ?? scale?.tickFormat?.apply(scale, tickArguments) ?? identity);
	$: formatter = $tickFormat$;

	const { duration$, delay$, easing$, offsetX$, tickSize$, padding$ } = setAxisContext({
		currentScale$,
		previousScale$,
		tickFormat$,
		k,
		xy: 'y',
		textAnchor: 'end',
		tickColor
	});

	$: duration$.set(duration);
	$: delay$.set(delay);
	$: easing$.set(easing);

	$: tickSize$.set(tickSize);
	$: padding$.set(tickPadding);
	$: offsetX$.set(tickOffset);

	$: ticks = tickValues ?? scale?.ticks?.apply(scale, tickArguments) ?? scale.domain();

	$: !isPathDataSet && (d = `M${k * 6},0H0V${$innerHeight$}H${k * 6}`);
</script>

<Axis
	{scale}
	{x}
	{y}
	{id}
	{orient}
	{tickArguments}
	{tickPadding}
	{fontFamily}
	{fontWeight}
	{fontSize}
	{fontSizeAdjust}
	{fontVariant}
	{fontStyle}
	{fontStretch}
	class={classNames(_class, 'y', orient)}
	style="--axis-fill: {fill};"
>
	{#each ticks as tick, index (+tick || tick)}
		<slot {index} {tick} {formatter} text={formatter(tick)}>
			<Tick {tick}>
				<text>{formatter(tick)}</text>
			</Tick>
		</slot>
	{/each}

	<path
		class="domain"
		fill="none"
		{stroke}
		stroke-width={strokeWidth}
		stroke-dasharray={strokeDasharray}
		stroke-dashoffset={strokeDashoffset}
		stroke-opacity={strokeOpacity}
		stroke-linecap={strokeLinecap}
		stroke-linejoin={strokeLinejoin}
		stroke-miterlimit={strokeMiterlimit}
		{d}
	/>

	<g class="label" id="y-axis-label">
		<slot name="label" />
	</g>
</Axis>
