<script>
	import { writable } from 'svelte-tools';
	import { getGraficoContext } from '$lib/Grafico';
	import { classNames } from '$lib/utils';
	import Axis from './Axis.svelte';
	import Tick from './Tick.svelte';
	import { setTickContext } from './context_tick';

	const { innerWidth$ } = getGraficoContext();

	export let id = 'x';
	export let x = 0;
	export let y = 0;
	export let scale;
	export let orient = 'bottom';
	export let tickArguments = [8];
	export let tickValues;
	export let tickFormat;

	export let tickSize = 6;
	export let tickPadding = 8;
	export let tickOffset = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;
	export let tickColor;

	export let fontFamily;
	export let fontSize;
	export let fontSizeAdjust;
	export let fontStretch;
	export let fontStyle;
	export let fontVariant;
	export let fontWeight;

	export let stroke = 'rgba(0 0 0/ .2)';
	export let strokeWidth = 2;
	export let strokeOpacity;
	export let strokeLinecap;
	export let strokeLinejoin;
	export let strokeDasharray;
	export let strokeDashoffset;
	export let strokeMiterlimit;
	export let fill = 'rgba(0 0 0 / .4)';
	export let d;

	let _class = '';
	export { _class as class };

	const k = orient === 'top' ? -1 : 1;

	const isPathDataSet = !!d;

	const tickSize$ = writable(tickSize);
	$: tickSize$.set(tickSize);
	const padding$ = writable(tickPadding);
	$: padding$.set(tickPadding);
	const offset$ = writable({
		x: 0,
		y: tickOffset
	});
	$: offset$.set({
		x: 0,
		y: tickOffset
	});

	const context = {
		xy: 'y',
		k,
		offset$,
		tickSize$,
		padding$,
		textAnchor: 'middle',
		tickColor
	};
	setTickContext(context);

	let ticks = [];

	$: !isPathDataSet && (d = `M0,${k * 6}V0H${$innerWidth$}V${k * 6}`);
</script>

<Axis
	{scale}
	{x}
	{y}
	{id}
	{orient}
	{tickValues}
	{tickArguments}
	{tickFormat}
	{tickPadding}
	{fontFamily}
	{fontWeight}
	{fontSize}
	{fontSizeAdjust}
	{fontVariant}
	{fontStyle}
	{fontStretch}
	class={classNames(_class, 'x', orient)}
	style="--axis-fill: {fill};"
	bind:ticks
	let:format
>
	{#each ticks as tick, index (JSON.stringify(tick))}
		<slot {index} {tick} {format} text={format(tick)}>
			<Tick {tick}>
				<text>{format(tick)}</text>
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

	<g class="label" id="x-axis-label">
		<slot name="label" />
	</g>
</Axis>
