<script context="module">
	export const key = Symbol();

	export const graficoContext = () => getContext(key) || {};

	export const GETTERS_KEY = Symbol();
</script>

<script>
	import { getContext, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { classNames, css } from './utils';
	import { sizeStore } from './utils/sizeStore';

	export let width;
	export let height;
	export let innerWidth = 0;
	export let innerHeight = 0;
	export let padding = {};
	export let data = [];
	export let style = {};
	let _class = '';
	export { _class as class };

	export let fontFamily = 'system-ui';
	export let fontSize;
	export let fontSizeAdjust;
	export let fontStretch;
	export let fontStyle;
	export let fontVariant;
	export let fontWeight;

	const { widthStore, heightStore, innerWidthStore, innerHeightStore, paddingStore } = sizeStore(
		width,
		height,
		{
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...padding
		}
	);

	const dataStore = writable(data);
	const scales = writable({});

	const context = {
		widthStore,
		heightStore,
		innerWidthStore,
		innerHeightStore,
		paddingStore,
		dataStore,
		scales
	};

	setContext(key, context);

	$: $dataStore = data;

	$: innerWidth = $innerWidthStore;
	$: innerHeight = $innerHeightStore;

	function paddingToCssVars(padding) {
		return Object.entries(padding)
			.map(([key, value]) => `--padding-${key}: ${value}px;`)
			.join('');
	}
</script>

<div
	bind:clientWidth={$widthStore}
	bind:clientHeight={$heightStore}
	use:css={style}
	class={classNames(_class, 'grafico')}
	style="--height: {+height ? height + 'px' : '100%'}; {paddingToCssVars($paddingStore)}"
>
	{#await tick() then value}
		<svg viewBox="0 0 {$widthStore} {$heightStore}" preserveAspectRatio="none">
			<g
				transform={`translate(${$paddingStore.left}, ${$paddingStore.top})`}
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
						width={$widthStore}
						height={$heightStore}
						innerWidth={$innerWidthStore}
						innerHeight={$innerHeightStore}
						padding={$paddingStore}
						data={$dataStore}
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
