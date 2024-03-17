<script lang="ts">
	// https://github.com/d3/d3-axis/blob/master/src/axis.js

	import { onMount } from 'svelte';
	import { linear } from 'svelte/easing';
	import { getAxisContext } from './context';
	import { derived } from 'svelte/store';
	import gsap from 'gsap';

	// const {
	// 	currentScale$,
	// 	previousScale$,
	// 	tickFormat$,
	// 	duration$,
	// 	delay$,
	// 	easing$,
	// 	k,
	// 	xy,
	// 	tickSize$,
	// 	offsetX$,
	// 	offsetY$
	// } = getAxisContext();

	const context$ = getAxisContext();
	let xy = $context$.xy;
	let k = $context$.k;
	let tickFormat = $context$.tickFormat;
	let easing = $context$.easing ?? linear;

	const currentPosition$ = derived(context$, (context) => context.currentPosition);
	const previousPosition$ = derived(context$, (context) => context.previousPosition);
	const isEntering$ = derived(context$, (context) => !context.previousPosition);
	const duration$ = derived(context$, (context) => context.duration);
	const delay$ = derived(context$, (context) => context.delay);
	const tickSize$ = derived(context$, (context) => context.tickSize);
	const tickPadding$ = derived(context$, (context) => context.tickPadding);

	let currentPosition = $currentPosition$;
	let previousPosition = $previousPosition$;

	export let tick: any;

	export let size = $tickSize$;
	$: size = $tickSize$;

	export let fontFamily: string | undefined = '';
	export let fontSize: string | undefined = '10pt';
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
	export let fillOpacity: string | undefined = '.8';

	export let textAnchor: 'start' | 'middle' | 'end' | undefined = undefined;

	export let x1 = 0;
	export let x2 = xy === 'y' ? $tickSize$ : 0;

	export let y1 = 0;
	export let y2 = xy === 'x' ? $tickSize$ : 0;

	export let dx = 0;
	export let dy = 0;

	let x = xy === 'x' ? previousPosition(tick) || currentPosition(tick) : 0;
	let y = xy === 'y' ? previousPosition(tick) || currentPosition(tick) : 0;

	let element: SVGGElement;

	onMount(() => {
		const setter = ((xy: 'x' | 'y') => {
			if (xy === 'x') {
				element.dataset.pos = x + '';
				gsap.set(element, {
					transform: `translate3d(${x}px,${0}px, 1px)`
				});

				return (val: number) => {
					const pos = parseFloat(element.dataset.pos ?? '0');

					gsap.to(element, {
						transform: `translate3d(${val}px,${0}px, 1px)`,
						duration: $duration$ / 1000,
						delay: 0,
						ease: easing
					});

					element.dataset.pos = val + '';
				};
			} else {
				element.dataset.pos = y + '';
				gsap.set(element, {
					transform: `translate3d(${0}px,${y}px, 1px)`
				});

				return (val: number) => {
					gsap.to(element, {
						transform: `translate3d(${0}px,${val}px, 1px)`,
						duration: $duration$ / 1000,
						ease: easing,
						delay: 0
					});

					element.dataset.pos = val + '';
				};
			}
		})(xy);

		return currentPosition$.subscribe((position) => setter(position(tick)));
	});

	function enter(node: SVGGElement, { duration = 0, easing = linear }) {
		gsap.to(node, { opacity: 1, duration: duration / 1000, easing });

		return () => ({
			duration,
			delay: 0,
			easing,
			css: () => ''
		});
	}

	function exit(node: SVGGElement, { duration = 0, easing = linear }) {
		gsap.to(node, { opacity: 0, duration: duration / 1000, easing });

		return () => ({
			duration,
			delay: 0,
			easing,
			css: () => ''
		});
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<g
	class="tick {xy}"
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
	data-pos={xy === 'x' ? x : y}
	style:opacity={0}
	bind:this={element}
	in:enter|local={{ duration: $duration$, easing }}
	out:exit|local={{ duration: $duration$, easing }}
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
		<text>{tickFormat(tick)}</text>
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
		fill: var(--fill, currentColor);
		font-weight: 400;
	}
	.tick.y :global(text:not(.raw)) {
		transform: translateX(var(--tick-padding, 0));
	}
	.tick.x :global(text:not(.raw)) {
		transform: translateY(var(--tick-padding, 0));
	}
	.tick :global(line) {
	}
</style>
