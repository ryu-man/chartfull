<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import type { Properties } from 'csstype';
	import { classNames, css } from '$lib/utils';
	import type { ScaleBand, ScalePoint } from 'd3';
	import { setAxisContext } from './context';
	import type { Scale } from './types';
	import { tick } from 'svelte';

	export let x = 0;
	export let y = 0;
	export let scale: Scale;
	export let orient: 'top' | 'bottom' | 'left' | 'right';
	export let tickArguments = [8];
	export let tickValues;
	export let tickFormat;

	export let tickSize = 6;
	export let tickPadding = 0;

	export let fontFamily: Properties['fontFamily'] = undefined;
	export let fontSize: Properties['fontSize'] = undefined;
	export let fontSizeAdjust: Properties['fontSizeAdjust'] = undefined;
	export let fontStretch: Properties['fontStretch'] = undefined;
	export let fontStyle: Properties['fontStyle'] = undefined;
	export let fontVariant: Properties['fontVariant'] = undefined;
	export let fontWeight: Properties['fontWeight'] = undefined;

	export let textAnchor: 'start' | 'middle' | 'end' = 'start';

	export let fill = 'rgba(0 0 0 / .4)';

	export let d: string | undefined = undefined;

	export let duration = 100;
	export let delay = 0;
	export let easing = cubicOut;

	let klass = '';
	export { klass as class };

	const k = ['left', 'top'].includes(orient) ? -1 : 1;
	const xy = ['bottom', 'top'].includes(orient) ? 'x' : 'y';

	const update = remeber(scale);

	$: offset = typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;
	$: [currentScale, previousScale] = update(scale);
	$: [currentPosition, previousPosition] = [
		getPosition(currentScale, offset),
		previousScale ? getPosition(previousScale, offset) : undefined
	];

	$: isEntering = !previousPosition;

	const identity = (d) => d;
	const _tickFormat = tickFormat ?? scale?.tickFormat?.apply(scale, tickArguments) ?? identity;

	const context$ = setAxisContext({
		currentScale,
		previousScale,
		currentPosition,
		previousPosition,
		easing: easing,
		tickFormat: _tickFormat,
		k,
		xy
	});

	$: $context$.currentPosition = currentPosition;
	$: $context$.previousPosition = previousPosition;

	$: $context$.duration = duration;
	$: $context$.delay = delay;
	$: $context$.tickSize = tickSize;
	$: $context$.tickPadding = tickPadding * k;

	$: ticks = tickValues ?? scale?.ticks?.apply(scale, tickArguments) ?? scale.domain();

	function number(scale: Scale) {
		// console.log(scale.domain());
		return (d: any) => scale(d);
	}

	function center(scale: ScaleBand<any> | ScalePoint<any>, offset: number) {
		let o = Math.max(0, scale.bandwidth() - offset / 2) / 2;
		if (scale.round()) {
			o = Math.round(o);
		}

		return (d: any) => +scale(d) + o;
	}

	function getPosition(scale: Scale, offset = 0) {
		if ('bandwidth' in scale) {
			return center(scale, offset) || 0;
		}

		return number(scale) || 0;
	}

	function remeber<T>(value: T): (v: T) => [T, T | undefined] {
		let memory: [T, T | undefined] = [value, undefined];

		return (value) => {
			memory = [value, ...memory].slice(0, 2) as [T, T | undefined];
			return memory;
		};
	}
</script>

<g
	class={classNames(klass, 'axis')}
	transform={`translate(${x}, ${y})`}
	font-family={fontFamily}
	font-size={fontSize}
	font-weight={fontWeight}
	font-size-adjust={fontSizeAdjust}
	font-stretch={fontStretch}
	font-style={fontStyle}
	font-variant={fontVariant}
	text-anchor={textAnchor}
	{fill}
	style:--tick-padding={tickPadding * k + 'px'}
>
		<slot {ticks} {tickFormat} />
</g>

<style>
	.x.axis :global(.tick text) {
		text-anchor: center;
	}
	.x.top.axis :global(.tick text) {
		dominant-baseline: text-after-edge;
	}
	.x.bottom.axis :global(.tick :not(text[dominant-baseline])) {
		dominant-baseline: text-before-edge;
	}
	.x.bottom.axis :global(.label > :not(text[dominant-baseline])) {
		dominant-baseline: text-after-edge;
	}
	.x.bottom.axis :global(.label > :not(text[transform])) {
		transform: translate(-16px, -8px);
	}
	.x.axis :global(.label :not(text[text-anchor])) {
		text-anchor: end;
	}

	/***************************************************************/
	.y.axis :global(.tick text) {
		dominant-baseline: central;
	}
	.y.left.axis :global(.tick text) {
		dominant-baseline: end;
	}
	.y.right.axis :global(.tick text) {
		text-anchor: start;
	}

	.y.axis :global(.label > :not(text[writing-mode])) {
		writing-mode: vertical-lr;
	}
	.y.left.axis :global(.label > :not(text[dominant-baseline])) {
		dominant-baseline: text-after-edge;
	}
	.y.left.axis :global(.label > :not(text[transform])) {
		transform: translate(8px, 16px);
	}
	.y.axis.right :global(.label > :not(text[dominant-baseline])) {
		dominant-baseline: text-before-edge;
	}
	.y.axis.right :global(.label > :not(text[text-anchor])) {
		text-anchor: start;
	}
	/***************************************************************/

	.y.axis :global(.label > :not(text[text-anchor])) {
		text-anchor: start;
	}
	.y.axis :global(.label :not(text[dominant-baseline])) {
	}

	.axis :global(.label :not(text[fill])) {
		fill: rgba(0, 0, 0, 0.1);
	}
	.axis :global(.label :not(text[font-size])) {
		font-size: 24pt;
	}
	.axis :global(.label :not(text[font-weight])) {
		font-weight: 700;
	}
</style>
