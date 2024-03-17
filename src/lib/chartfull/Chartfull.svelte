<script lang="ts">
	import { tick } from 'svelte';
	import { derived, writable } from 'svelte-tools';
	import { setChartfullContext, type ChartfullContext } from './context';
	import { classNames, css } from '../utils';
	import { sizeStore } from '../stores';
	import type { Padding } from '../types';
	import type { Properties } from 'csstype';

	export let width: string = '100%';
	export let minWidth: string | undefined = undefined;
	export let maxWidth: string | undefined = undefined;

	export let height: string = '100%';
	export let minHeight: string | undefined = undefined;
	export let maxHeight: string | undefined = undefined;

	export let innerWidth = 0;
	export let innerHeight = 0;

	export let padding: Padding = {};

	export let data: any[] = [];
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

	const {
		width$,
		height$,
		innerWidth$,
		innerHeight$,
		paddingBottom$,
		paddingLeft$,
		paddingRight$,
		paddingTop$
	} = sizeStore(0, 0, {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	});

	const data$ = writable(data);

	const context = setChartfullContext({
		width$,
		height$,
		innerWidth$,
		innerHeight$,
		paddingBottom$,
		paddingLeft$,
		paddingRight$,
		paddingTop$,
		data$
	});

	const height$$ = derived(height$, (h) => (h ? h + 'px' : '100%'));

	$: $data$ = data;
	$: innerWidth = $innerWidth$;
	$: innerHeight = $innerHeight$;
</script>

<div
	bind:clientWidth={$width$}
	bind:clientHeight={$height$}
	use:css={style}
	bind:this={context.root_element}
	class={classNames('chartfull', _class)}
	role="figure"
	style:--height={height}
	style:--min-height={minHeight}
	style:--max-height={maxHeight}
	style:--width={width}
	style:--min-width={minWidth}
	style:--max-width={maxWidth}
	style:--padding-top="{$paddingTop$}px"
	style:--padding-bottom="{$paddingBottom$}px"
	style:--padding-left="{$paddingLeft$}px"
	style:--padding-right="{$paddingRight$}px"
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseout
	on:mouseover
	on:focus
	on:blur
	on:pointermove
>
	{#await tick() then _}
		<svg viewBox="0 0 {$width$} {$height$}" preserveAspectRatio="none" bind:this={context.svg_layer_element}>
			<g
				transform={`translate(${$paddingLeft$}, ${$paddingTop$})`}
				font-family={fontFamily}
				font-size={fontSize}
				font-weight={fontWeight}
				font-size-adjust={fontSizeAdjust}
				font-stretch={fontStretch}
				font-style={fontStyle}
				font-variant={fontVariant}
				bind:this={context.svg_inner_layer_element}
			>
				<slot
					width={$width$}
					height={$height$}
					innerWidth={$innerWidth$}
					innerHeight={$innerHeight$}
					paddingTop={$paddingTop$}
					paddingBottom={$paddingBottom$}
					paddingLeft={$paddingLeft$}
					paddingRight={$paddingRight$}
				/>
			</g>
		</svg>
	{/await}

	<div class="html-layer">
		<div class="html-layer-inner" bind:this={context.html_layer_element} />
	</div>
</div>

<style>
	.chartfull {
		width: var(--width, 100%);
		min-width: var(--min-width, unset);
		max-width: var(--max-width, unset);

		height: var(--height, 100%);
		min-height: var(--min-height, unset);
		max-height: var(--max-height, unset);
		position: relative;
		margin: 0;

		background-color: var(--background-color, transparent);

		position: relative;

		overflow: hidden;
	}

	.chartfull > :global(text.title) {
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

	.html-layer {

		padding-top: var(--padding-top, 0);
		padding-right: var(--padding-right, 0);
		padding-bottom: var(--padding-bottom, 0);
		padding-left: var(--padding-left, 0);

		cursor: pointer;
		box-sizing: border-box;

		position:absolute;
		inset: 0;

		z-index: 2;

		pointer-events: none;
	}

	.html-layer-inner {
		width: 100%;
		height: 100%;
		position: relative;

	}
</style>
