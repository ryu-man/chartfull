<script context="module">
	export const key = Symbol();

	export const graficoContext = () => getContext(key) || {};

	export const GETTERS_KEY = Symbol();
</script>

<script lang="ts">
	import { getContext, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { accessible } from 'svelte-tools';
	import { classNames, css } from './utils';
	import { sizeStore } from './stores';
	import type { Padding } from './types';
	import type { Properties } from 'csstype';

	export let width: number;
	export let height: number;
	export let innerWidth = 0;
	export let innerHeight = 0;
	export let padding: Padding = {};
	export let data = [];
	export let style: string | Properties = '';
	let _class = '';
	export { _class as class };

	export let fontFamily: Properties['fontFamily'] = 'system-ui';
	export let fontSize: Properties['fontSize'] = undefined;
	export let fontSizeAdjust: Properties['fontSizeAdjust'] = undefined;
	export let fontStretch: Properties['fontStretch'] = undefined;
	export let fontStyle: Properties['fontStyle'] = undefined;
	export let fontVariant: Properties['fontVariant'] = undefined;
	export let fontWeight: Properties['fontWeight'] = undefined;

	const { width$, height$, innerWidth$, innerHeight$, padding$ } = sizeStore(width, height, {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	});

	const data$ = accessible(data);
	const scales = writable({});

	const context = {
		width$,
		height$,
		innerWidth$,
		innerHeight$,
		padding$,
		dataStore: data$,
		scales
	};

	setContext(key, context);

	$: $data$ = data;
	$: innerWidth = $innerWidth$;
	$: innerHeight = $innerHeight$;

	function paddingToCssVars(padding) {
		return Object.entries(padding)
			.map(([key, value]) => `--padding-${key}: ${value}px;`)
			.join('');
	}
</script>

<div
	bind:clientWidth={$width$}
	bind:clientHeight={$height$}
	use:css={style}
	class={classNames(_class, 'grafico')}
	style="--height: {height ? height + 'px' : '100%'}; {paddingToCssVars($padding$)}"
>
	{#await tick() then _}
		<svg viewBox="0 0 {$width$} {$height$}" preserveAspectRatio="none">
			<g
				transform={`translate(${$padding$.left}, ${$padding$.top})`}
				font-family={fontFamily}
				font-size={fontSize}
				font-weight={fontWeight}
				font-size-adjust={fontSizeAdjust}
				font-stretch={fontStretch}
				font-style={fontStyle}
				font-variant={fontVariant}
			>
				{#await tick() then _}
					<slot
						width={$width$}
						height={$height$}
						innerWidth={$innerWidth$}
						innerHeight={$innerHeight$}
						padding={$padding$}
						data={$data$}
					/>
				{/await}

				<slot name="svg" />
			</g>

		</svg>
	{/await}

	<slot name="html" />
</div>

<style>
	.grafico {
		width: 100%;
		min-width: 600px;
		height: var(--height);
		position: relative;
		margin: 0;
	}
	.grafico > :global(text.title) {
	}
	svg {
		width: 100%;
		height: 100%;
		overflow: visible;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}
</style>
