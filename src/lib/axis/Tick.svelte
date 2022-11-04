<script>
	// https://github.com/d3/d3-axis/blob/master/src/axis.js

	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	import { getTickContext } from './context_tick';
	import { getAxisContext } from './context_axis'

	const { k, xy, textAnchor, tickSize$ } = getTickContext();
	const { currentScale$, previousScale$, tickFormat$ } = getAxisContext();

	export let tick;

	export let size = tickSize$.value;
	$: size = $tickSize$;

	export let padding = 0;

	const offsets = {
		x: 0,
		y: 0
	};
	export let offset = 0;
	offsets[xy] = offset;

	export let fontFamily;
	export let fontSize = '12pt';
	export let fontSizeAdjust;
	export let fontStretch;
	export let fontStyle;
	export let fontVariant;
	export let fontWeight;

	export let stroke = 'rgba(0 0 0/ .07)';
	export let strokeWidth;
	export let strokeOpacity;
	export let strokeLinecap;
	export let strokeLinejoin;
	export let strokeDasharray;
	export let strokeDashoffset;
	export let strokeMiterlimit;
	export let fill = 'var(--axis-fill)';
	export let fillOpacity = '1';

	export let x1 = 0;
	export let x2 = xy === 'x' ? tickSize$.value : 0;

	export let y1 = 0;
	export let y2 = xy === 'y' ? tickSize$.value : 0;

	export let duration = 0;
	export let delay = 0;
	export let easing = linear;

	export let dx = 0;
	export let dy = 0;

	const axisType = xy === 'y' ? 'x' : 'y';

	let x = axisType === 'x' ? currentScale$.value(tick) : 0;
	let y = axisType === 'y' ? currentScale$.value(tick) : 0;

	const [enter, exit] = axisType === 'x' ? [enterX, exitX] : [enterY, exitY];

	const x$ = tweened(x, { duration, delay, easing });
	onMount(() =>
		currentScale$.subscribe(() => {
			if (axisType === 'x') {
				x$.set($currentScale$(tick));
			} else {
				x$.set(0);
			}
		})
	);

	const y$ = tweened(y, { duration, delay, easing });
	onMount(() =>
		currentScale$.subscribe(() => {
			if (axisType === 'y') {
				y$.set($currentScale$(tick));
			} else {
				y$.set(0);
			}
		})
	);

	function enterX(node, { duration = 0, delay = 0, easing }) {
		const oldVal = previousScale$.value(tick);
		const newVal = currentScale$.value(tick);
		const d = newVal - oldVal;

		return () => ({
			duration,
			delay,
			easing,
			css: (t, u) => `opacity: ${t}; transform: translate(${oldVal + d * t + offset}px,0)`
		});
	}
	function exitX(node, { duration = 0, delay = 0, easing }) {
		const oldVal = previousScale$.value(tick);
		const newVal = currentScale$.value(tick);
		const d = newVal - oldVal;

		return () => ({
			duration,
			delay,
			easing,
			css: (t, u) => `opacity: ${t}; transform: translate(${oldVal + d * u + offset}px, 0)`
		});
	}

	function enterY(node, { duration = 0, delay = 0, easing }) {
		const oldVal = previousScale$.value(tick);
		const newVal = currentScale$.value(tick);
		const d = newVal - oldVal;

		return () => ({
			duration,
			delay,
			easing,
			css: (t, u) => `opacity: ${t}; transform: translate(0,${oldVal + d * t + offset}px)`
		});
	}
	function exitY(node, { duration = 0, delay = 0, easing }) {
		const oldVal = previousScale$.value(tick);
		const newVal = currentScale$.value(tick);
		const d = newVal - oldVal;

		return () => ({
			duration,
			delay,
			easing,
			css: (t, u) => `opacity:${t}; transform: translate(0,${oldVal + d * u + offset}px)`
		});
	}

	$: offset = offsets[xy];
</script>

<g
	class="tick {axisType}"
	style:--fill={fill}
	style:transform={`translate(${$x$ + dx + offset || 0}px,${$y$ + dy + offset || 0}px)`}
	font-family={fontFamily}
	font-size={fontSize}
	font-weight={fontWeight}
	font-size-adjust={fontSizeAdjust}
	font-stretch={fontStretch}
	font-style={fontStyle}
	font-variant={fontVariant}
	text-anchor={textAnchor}
	alignment-baseline="middle"
	fill-opacity={fillOpacity}
	in:enter|local={{ duration, delay, easing }}
	out:exit|local={{ duration, delay, easing }}
	on:click
	on:introstart
	on:introend
	on:outrostart
	on:outroend
	on:mouseenter
	on:mouseleave
>
	<line
		{x1}
		{y1}
		{...{ [xy + '2']: size * k, x2: x2 * k, y2: y2 * k }}
		{stroke}
		stroke-width={strokeWidth}
		stroke-opacity={strokeOpacity}
		stroke-linecap={strokeLinecap}
		stroke-linejoin={strokeLinejoin}
		stroke-dasharray={strokeDasharray}
		stroke-dashoffset={strokeDashoffset}
		stroke-miterlimit={strokeMiterlimit}
	/>
	<slot>
		<text>{tickFormat$.value(tick)}</text>
	</slot>
</g>

<style>
	.tick {
		pointer-events: visibleFill;
		backface-visibility: hidden;
		perspective: 1000px;
		pointer-events: none;
	}
	.tick > line {
		/* pointer-events: none; */
	}
	.tick > :global(text) {
		pointer-events: all;
	}
	.tick :global(text:not(.raw)) {
		vector-effect: non-scaling-stroke;
		fill: var(--fill);
		font-weight: 400;
	}
	.tick.y :global(text:not(.raw)) {
		transform: translateX(var(--tick-padding));
	}
	.tick.x :global(text:not(.raw)) {
		transform: translateY(var(--tick-padding));
	}
	.tick :global(line) {
	}
</style>
