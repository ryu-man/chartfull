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
		tickSize$,
		offsetX$,
		offsetY$
	} = getAxisContext();

	export let tick: any;

	export let size = $tickSize$;
	$: size = $tickSize$;

	export let padding = 0;

	export let fontFamily: string | undefined = '';
	export let fontSize: string | undefined = '12pt';
	export let fontSizeAdjust: string | undefined = '';
	export let fontStretch: string | undefined = '';
	export let fontStyle: string | undefined = '';
	export let fontVariant: string | undefined = '';
	export let fontWeight: string | undefined = '';

	export let stroke: string | undefined = 'rgba(0 0 0/ .07)';
	export let strokeWidth: string | undefined = '';
	export let strokeOpacity: string | undefined = '';
	export let strokeLinecap: 'inherit' | 'round' | 'butt' | 'square' | null | undefined = undefined;
	export let strokeLinejoin: 'inherit' | 'round' | 'miter' | 'bevel' | null | undefined = undefined;
	export let strokeDasharray: string | undefined = '';
	export let strokeDashoffset: string | undefined = '';
	export let strokeMiterlimit: string | undefined = '';

	export let fill: string | undefined = undefined;
	export let fillOpacity: string | undefined = '1';

	export let textAnchor: 'start' | 'middle' | 'end' | undefined = undefined;

	export let x1 = 0;
	export let x2 = xy === 'y' ? $tickSize$ : 0;

	export let y1 = 0;
	export let y2 = xy === 'x' ? $tickSize$ : 0;

	export let dx = $offsetX$;
	export let dy = $offsetY$;

	let x = xy === 'x' ? $previousScale$(tick) || $currentScale$(tick) : 0;
	let y = xy === 'y' ? $previousScale$(tick) || $currentScale$(tick) : 0;

	const x$ = tweened(x, { duration: $duration$, delay: $delay$, easing: $easing$ });
	const y$ = tweened(y, { duration: $duration$, delay: $delay$, easing: $easing$ });
	const opacity$ = tweened(0, { duration: $duration$, delay: $delay$, easing: $easing$ });

	onMount(() => {
		if (xy === 'x') {
			return currentScale$.subscribe((scale) => {
				x$.set(scale(tick));
			});
		} else {
			return currentScale$.subscribe((scale) => {
				y$.set(scale(tick));
			});
		}
	});

	function enter(node: SVGGElement, { duration = 0, easing = cubicOut }) {
		opacity$.set(1);

		return () => ({
			duration,
			delay: 0,
			easing,
			css: () => ''
		});
	}

	function exit(node: SVGGElement, { duration = 0, easing = cubicOut }) {
		opacity$.set(0);

		return {
			duration,
			delay: 0,
			easing,
			css: () => ''
		};
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<g
	class="tick {xy}"
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
	{fill}
	fill-opacity={fillOpacity}
	role="group"
	in:enter|local={{ easing: $easing$ }}
	out:exit|local={{ duration: $duration$, easing: $easing$ }}
	on:keypress
	on:introstart
	on:introend
	on:outrostart
	on:outroend
	on:click
	on:pointerover
	on:pointerenter
	on:pointerleave
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
		cursor: pointer;
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
