<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { writable } from 'svelte-tools';
	import { getChartfullContext } from 'graficos/chartfull';
	import { classNames } from '$lib/utils';
	import Axis from './Axis.svelte';
	import Tick from './Tick.svelte';
	import { setAxisContext } from './context';
	import { memorable } from 'svelte-tools/memorable';

	const { innerWidth$ } = getChartfullContext();

	export let scale;
	export let id = 'x';
	export let x = 0;
	export let y = 0;
	export let ticks = [];
	export let orient: 'top' | 'bottom' = 'bottom';
	export let tickArguments = [8];
	export let tickValues: string | undefined = undefined;
	export let tickFormat: string | undefined = undefined;

	export let tickSize = 6;
	export let tickPadding = 8;
	export let tickOffset = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;

	export let fontFamily: string | undefined = undefined;
	export let fontSize: string | undefined = undefined;
	export let fontSizeAdjust: string | undefined = undefined;
	export let fontStretch: string | undefined = undefined;
	export let fontStyle: string | undefined = undefined;
	export let fontVariant: string | undefined = undefined;
	export let fontWeight: string | undefined = undefined;

	export let stroke = 'rgba(0 0 0/ .2)';
	export let strokeWidth = 2;
	export let strokeOpacity: string | undefined = undefined;
	export let strokeLinecap: string | undefined = undefined;
	export let strokeLinejoin: string | undefined = undefined;
	export let strokeDasharray: string | undefined = undefined;
	export let strokeDashoffset: string | undefined = undefined;
	export let strokeMiterlimit: string | undefined = undefined;

	export let fill = 'rgba(0 0 0 / .4)';

	export let textAnchor: 'start' | 'middle' | 'end' = 'middle';
	export let d: string | undefined = undefined;

	export let duration = 100;
	export let delay = 0;
	export let easing = cubicOut;

	let _class = '';
	export { _class as class };

	const k = orient === 'top' ? -1 : 1;

	const isPathDataSet = !!d;

	const identity = (d) => d;

	const [currentScale$, previousScale$] = memorable(scale);
	$: currentScale$.set(scale);

	const tickFormat$ = writable(identity);
	$: tickFormat$.set(tickFormat ?? scale?.tickFormat?.apply(scale, tickArguments) ?? identity);
	$: formatter = $tickFormat$;

	const d$ = writable(d || `M0,${k * 6}V0H${$innerWidth$}V${k * 6}`);
	$: d$.set(d || `M0,${k * 6}V0H${$innerWidth$}V${k * 6}`);

	const { duration$, delay$, easing$, offsetY$, tickSize$, padding$ } = setAxisContext({
		currentScale$,
		previousScale$,
		tickFormat$,
		k,
		xy: 'x'
	});

	$: duration$.set(duration);
	$: delay$.set(delay);
	$: easing$.set(easing);

	$: tickSize$.set(tickSize);
	$: padding$.set(tickPadding);
	$: offsetY$.set(tickOffset);

	$: ticks = tickValues ?? scale?.ticks?.apply(scale, tickArguments) ?? scale.domain();
</script>

<Axis
	{scale}
	{x}
	{y}
	{id}
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
	class={classNames(_class, 'x', orient)}
>
	{#each ticks as tick, index (tick + '')}
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

	<g class="label" id="x-axis-label">
		<slot name="label" />
	</g>
</Axis>
