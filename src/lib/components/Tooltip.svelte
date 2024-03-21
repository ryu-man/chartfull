<script lang="ts">
	import { onMount } from 'svelte';
	import { getChartfullContext } from '$lib/chartfull';
	import { portal } from '$lib/actions';
	import gsap from 'gsap';
	import { backOut } from 'svelte/easing';

	const chartfull_context = getChartfullContext();

	let element: HTMLDivElement;
	let x = 0;
	let y = 0;

	onMount(() => {
		const target_element = chartfull_context.root_element;
		if (!target_element) {
			throw new Error('target element is undefined');
		}
		console.log('Target Element: ', target_element);

		const onpointermove = (ev: PointerEvent) => {
			x = ev.offsetX;
			y = ev.offsetY;

			gsap.to(element, { x, y, duration: 0.3, ease: backOut });
		};

		console.log('register event listener');
		target_element.addEventListener('pointermove', onpointermove);

		return () => target_element.removeEventListener('pointermove', onpointermove);
	});

	export let open = false;
</script>

<div
	class="chartfull-tooltip"
	use:portal={chartfull_context.html_layer_element}
	bind:this={element}
>
	<div class="inner">
		<slot />
	</div>
</div>

<style lang="postcss">
	.chartfull-tooltip {
		position: absolute;
		top: 0;
		left: 0;
	}

	.inner {
		width: 100%;
		height: 100%;
	}
</style>
