<script lang="ts">
	import { tick } from 'svelte';
	import { writable } from 'svelte-tools';
	import { setGraficoContext, type GraficoContext } from './context';
	import { classNames, css } from '../utils';
	import { sizeStore } from '../stores';
	import type { Padding } from '../types';
	import type { Properties } from 'csstype';

	export let width: number;
	export let height: number;
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

	$: $data$ = data;
	$: innerWidth = $innerWidth$;
	$: innerHeight = $innerHeight$;
</script>

<div
	bind:clientWidth={$width$}
	bind:clientHeight={$height$}
	use:css={style}
	class={classNames(_class, 'grafico')}
	style="--height: {height
		? height + 'px'
		: '100%'}; --padding-top: {$paddingTop$}px;--padding-bottom: {$paddingBottom$}px;--padding-left: {$paddingLeft$}px;--padding-right: {$paddingRight$}px;"
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
	{#await tick() then _}
		<slot name="html-pre" />

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
