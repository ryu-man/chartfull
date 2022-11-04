<script lang="ts">
	import { tick } from 'svelte';
	import { derived, writable } from 'svelte-tools';
	import { setGraficoContext, type GraficoContext } from './context';
	import { classNames, css } from '../utils';
	import { sizeStore } from '../stores';
	import type { Padding } from '../types';
	import type { Properties } from 'csstype';

	export let width: number;
	export let minWidth: number | undefined = 600;
	export let maxWidth: number | undefined = undefined;
	export let height: number;
	export let minHeight: number | undefined = undefined;
	export let maxHeight: number | undefined = undefined;
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
	} = sizeStore(width, height, {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	});

	const data$ = writable(data);

	const context: GraficoContext<any> = {
		width$,
		height$,
		innerWidth$,
		innerHeight$,
		paddingBottom$,
		paddingLeft$,
		paddingRight$,
		paddingTop$,
		data$
	};

	setGraficoContext(context);

	const height$$ = derived(height$, (h) => (h ? h + 'px' : '100%'));

	$: $data$ = data;
	$: innerWidth = $innerWidth$;
	$: innerHeight = $innerHeight$;
</script>

<div
	bind:clientWidth={$width$}
	bind:clientHeight={$height$}
	use:css={style}
	class={classNames(_class, 'grafico')}
	style:--height={$height$$}
	style:--min-height="{minHeight}px"
	style:--max-height="{maxHeight}px"
	style:--min-width="{minWidth}px"
	style:--max-width="{maxWidth}px"
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
	on:mousedown
	on:mouseup
	on:click
>
	<slot name="html-pre" />
	{#await tick() then _}
		<svg viewBox="0 0 {$width$} {$height$}" preserveAspectRatio="none">
			<g
				transform={`translate(${$paddingLeft$}, ${$paddingTop$})`}
				font-family={fontFamily}
				font-size={fontSize}
				font-weight={fontWeight}
				font-size-adjust={fontSizeAdjust}
				font-stretch={fontStretch}
				font-style={fontStyle}
				font-variant={fontVariant}
			>
				<slot name="svg-pre" />

				{#await tick() then _}
					<slot
						width={$width$}
						height={$height$}
						innerWidth={$innerWidth$}
						innerHeight={$innerHeight$}
						paddingTop={$paddingTop$}
						paddingBottom={$paddingBottom$}
						paddingLeft={$paddingLeft$}
						paddingRight={$paddingRight$}
						data={$data$}
					/>
				{/await}

				<slot name="svg-post" />
			</g>
		</svg>
	{/await}

	<slot name="html-post" />
</div>

<style>
	.grafico {
		width: 100%;
		min-width: var(--min-width, unset);
		max-width: var(--max-width, unset);
		height: var(--height, 100%);
		min-height: var(--min-height, unset);
		max-height: var(--max-height, unset);
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
