<script lang="ts">
	// https://github.com/d3/d3-axis/blob/master/src/axis.js

	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { getAxisContext } from './context';

	const {
		currentScale$,
		previousScale$,
		tickFormat$,
		duration$,
		delay$,
		easing$,
		k,
		xy,
		textAnchor,
		tickSize$,
		offsetX$,
		offsetY$
	} = getAxisContext();

	export let tick: any;

	export let size = $tickSize$;
	$: size = $tickSize$;

	export let padding = 0;

	export let fontFamily: string = '';
	export let fontSize = '12pt';
	export let fontSizeAdjust: string = '';
	export let fontStretch: string = '';
	export let fontStyle: string = '';
	export let fontVariant: string = '';
	export let fontWeight: string = '';

	export let stroke = 'rgba(0 0 0/ .07)';
	export let strokeWidth: string = '';
	export let strokeOpacity: string = '';
	export let strokeLinecap: string = '';
	export let strokeLinejoin: string = '';
	export let strokeDasharray: string = '';
	export let strokeDashoffset: string = '';
	export let strokeMiterlimit: string = '';
	export let fill = 'var(--axis-fill)';
	export let fillOpacity = '1';

	export let x1 = 0;
	export let x2 = xy === 'y' ? $tickSize$ : 0;

	export let y1 = 0;
	export let y2 = xy === 'x' ? $tickSize$ : 0;

	export let dx = $offsetX$;
	export let dy = $offsetY$;

	let x = xy === 'x' ? $previousScale$(tick) || $currentScale$(tick) : 0;
	let y = xy === 'y' ? $previousScale$(tick) || $currentScale$(tick) : 0;

	const x$ = tweened(x, { duration: $duration$, delay: $delay$, easing: $easing$ });
	onMount(() => {
		if (xy === 'x') {
			// x$.set($previousScale$(tick));

			return currentScale$.subscribe((scale) => {
				x$.set(scale(tick));
			});
		}
	});

	const y$ = tweened(y, { duration: $duration$, delay: $delay$, easing: $easing$ });
	onMount(() => {
		if (xy === 'y') {
			// y$.set($previousScale$(tick));

			return currentScale$.subscribe((scale) => {
				y$.set(scale(tick));
			});
		}
	});

	const opacity$ = tweened(0, { duration: $duration$, delay: $delay$, easing: $easing$ });

	function enter(node: SVGGElement, { duration = 0, delay = 0, easing = cubicOut, tick }) {
		if (xy === 'x') {
			x$.set($previousScale$(tick) || $currentScale$(tick));
		} else {
			y$.set($previousScale$(tick) || $currentScale$(tick));
		}

		opacity$.set(1);

		return () => ({
			duration,
			delay,
			easing,
			css: () => ''
		});
	}

	function exit(node: SVGGElement, { duration = 0, delay = 0, easing = cubicOut, tick }) {
		if (xy === 'x') {
			x$.set($currentScale$(tick) || $currentScale$(tick));
		} else {
			y$.set($currentScale$(tick) || $currentScale$(tick));
		}

		opacity$.set(0);

		return () => ({
			duration,
			delay,
			easing,
			css: () => ''
		});
	}
</script>

<g
	class="tick {xy}"
	style:--fill={fill}
	style:transform={`translate3d(${$x$ + dx || 0}px,${$y$ + dy || 0}px, 1px)`}
	style:opacity={$opacity$}
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
	in:enter|local={{ duration: $duration$, tick, easing: $easing$ }}
	out:exit|local={{ duration: $duration$, tick, easing: $easing$ }}
	on:click
	on:keypress
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
		{...{ [xy === 'x' ? 'y2' : 'x2']: size * k, x2: x2 * k, y2: y2 * k }}
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
		<text>{$tickFormat$(tick)}</text>
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
