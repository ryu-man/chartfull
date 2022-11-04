<script>
	import { writable } from 'svelte-tools';
	import { getGraficoContext } from '../Grafico';
	import { classNames } from '../utils';
	import Axis from './Axis.svelte';
	import TickContext from './TickContext.svelte';

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

	export let stroke = '#9b9b9b';
	export let strokeWidth = 2;
	export let strokeOpacity;
	export let strokeLinecap;
	export let strokeLinejoin;
	export let strokeDasharray;
	export let strokeDashoffset;
	export let strokeMiterlimit;
	export let fill = '#9b9b9b';
	export let d;

	let _class = '';
	export { _class as class };

	const k = orient === 'top' ? -1 : 1;

	const isPathDataSet = !!d;

	const tickSize$ = writable(tickSize);
	$: tickSize$.set(tickSize);
	const padding$ = writable(tickPadding);
	$: padding$.set(tickPadding);
	const offset$ = writable(tickOffset);
	$: offset$.set(tickOffset);

	const context = {
		xy: 'y',
		k,
		offset$,
		tickSize$,
		padding$,
		textAnchor: 'middle',
		tickColor
	};

	let ticks = [];

	$: !isPathDataSet && (d = `M0,${k * 6}V0H${$innerWidth$}V${k * 6}`);
</script>

<TickContext value={context}>
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
		let:previousScale
	>
		<slot {ticks} {format} {previousScale} />

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
</TickContext>
