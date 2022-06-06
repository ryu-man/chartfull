<script context="module">
	export const KEY = {};
	export const SCALES = {};
	export const context = () => getContext(KEY);
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte-tools/accessible';
	import { memorable } from 'svelte-tools/memorable';
	import type { Properties } from 'csstype';
	import { classNames, css } from '$lib/utils';

	export let x = 0;
	export let y = 0;
	export let scale;
	export let orient;
	export let tickArguments = [8];
	export let tickValues;
	export let tickFormat;
	export let tickPadding = 0;

	export let fontFamily: Properties['fontFamily'] = undefined;
	export let fontSize: Properties['fontSize'] = undefined;
	export let fontSizeAdjust: Properties['fontSizeAdjust'] = undefined;
	export let fontStretch: Properties['fontStretch'] = undefined;
	export let fontStyle: Properties['fontStyle'] = undefined;
	export let fontVariant: Properties['fontVariant'] = undefined;
	export let fontWeight: Properties['fontWeight'] = undefined;

	export let style: Properties | string = '';

	let klass = '';
	export { klass as class };

	const k = ['left', 'top'].includes(orient) ? -1 : 1;

	const identity = (d) => d;

	export let ticks = [];

	const [currentScale$, previousScale$] = memorable(scale);
	$: currentScale$.set(scale);

	const tickFormat$ = writable(identity);
	$: tickFormat$.set(tickFormat ?? scale?.tickFormat?.apply(scale, tickArguments) ?? identity);

	setContext(KEY, {
		currentScale$,
		previousScale$,
		tickFormat$
	});

	$: ticks = tickValues ?? scale?.ticks?.apply(scale, tickArguments) ?? scale.domain();
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
	style:--tick-padding={tickPadding * k + 'px'}
	use:css={style}
>
	<slot
		{ticks}
		format={tickFormat$.value}
		currentScale={$currentScale$}
		previousScale={$previousScale$}
	/>
</g>

<style>
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
		transform: translateY(-8px);
	}
	.x.axis :global(.label :not(text[text-anchor])) {
		text-anchor: end;
	}

	.y.axis :global(.tick text) {
		dominant-baseline: central;
	}
	.y.axis :global(.label > :not(text[writing-mode])) {
		writing-mode: vertical-lr;
	}
	.y.left.axis :global(.label > :not(text[dominant-baseline])) {
		dominant-baseline: text-after-edge;
	}
	.y.left.axis :global(.label > :not(text[transform])) {
		transform: translateX(8px);
	}
	.y.axis.right :global(.label > :not(text[dominant-baseline])) {
		dominant-baseline: text-before-edge;
	}
	.y.axis :global(.label > :not(text[text-anchor])) {
		text-anchor: start;
	}
	.y.axis :global(.label :not(text[dominant-baseline])) {
	}

	.axis :global(.label :not(text[fill])) {
		fill: rgba(0, 0, 0, 0.1);
	}
	.axis :global(.label :not(text[font-size])) {
		font-size: 36pt;
	}
	.axis :global(.label :not(text[font-weight])) {
		font-weight: 600;
	}
</style>
