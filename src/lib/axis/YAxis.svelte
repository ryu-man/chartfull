<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { writable } from 'svelte-tools';
	import { getChartfullContext } from 'graficos/chartfull';
	import { classNames } from '$lib/utils';
	import Axis from './Axis.svelte';
	import Tick from './Tick.svelte';
	import { setAxisContext } from './context';
	import { memorable } from 'svelte-tools/memorable';

	const { innerHeight$ } = getChartfullContext();

	export let scale;
	export let id = 'y';
	export let x = 0;
	export let y = 0;
	export let ticks = [];
	export let orient: 'left' | 'right' = 'left';
	export let tickArguments = [8];
	export let tickValues: string | undefined = undefined;
	export let tickFormat: string | undefined = undefined;

	export let tickSize = 6;
	export let tickPadding = 8;
	export let tickOffset = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;

	export let fontFamily: string | undefined = undefined;
	export let fontSize = '12pt';
	export let fontSizeAdjust: string | undefined = undefined;
	export let fontStretch: string | undefined = undefined;
	export let fontStyle: string | undefined = undefined;
	export let fontVariant: string | undefined = undefined;
	export let fontWeight: string | undefined = undefined;

	export let stroke = 'rgba(0 0 0 / .2)';
	export let strokeWidth = 2;
	export let strokeOpacity: string | undefined = undefined;
	export let strokeLinecap: string | undefined = undefined;
	export let strokeLinejoin: string | undefined = undefined;
	export let strokeDasharray: string | undefined = undefined;
	export let strokeDashoffset: string | undefined = undefined;
	export let strokeMiterlimit: string | undefined = undefined;

	export let fill = 'rgba(0 0 0 / .4)';

	export let textAnchor: 'start' | 'middle' | 'end' = 'end';

	export let d: string | undefined = undefined;

	export let duration = 100;
	export let delay = 0;
	export let easing = cubicOut;

	let _class = '';
	export { _class as class };

	const k = orient === 'left' ? -1 : 1;

	const identity = (d) => d;

	const [currentScale$, previousScale$] = memorable(scale);
	$: currentScale$.set(scale);

	const tickFormat$ = writable(identity);
	$: tickFormat$.set(tickFormat ?? scale?.tickFormat?.apply(scale, tickArguments) ?? identity);
	$: formatter = $tickFormat$;

	const d$ = writable(d !== undefined ? d : `M${k * 6},0H0V${$innerHeight$}H${k * 6}`);
	$: d$.set(d !== undefined ? d : `M${k * 6},0H0V${$innerHeight$}H${k * 6}`);

	const { duration$, delay$, easing$, offsetX$, tickSize$, padding$ } = setAxisContext({
		currentScale$,
		previousScale$,
		tickFormat$,
		k,
		xy: 'y'
	});

	$: duration$.set(duration);
	$: delay$.set(delay);
	$: easing$.set(easing);

	$: tickSize$.set(tickSize);
	$: padding$.set(tickPadding);
	$: offsetX$.set(tickOffset);

	$: ticks = tickValues ?? scale?.ticks?.apply(scale, tickArguments) ?? scale.domain();
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
	{textAnchor}
	{fill}
	class={classNames(_class, 'y', orient)}
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
		d={$d$}
	/>

	<g class="label" id="y-axis-label">
		<slot name="label" />
	</g>
</Axis>
