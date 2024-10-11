<script lang="ts">
	import { onMount } from 'svelte';
	import { circOut } from 'svelte/easing';
	import { bisector, pointer } from 'd3';
	import gsap from 'gsap';
	import { getChartfullContext } from '$lib/chartfull';
	import { portal } from '$lib/actions';

	const chartfull_context = getChartfullContext();

	let element: HTMLDivElement;
	export let accessor: (d: any) => any;
	export let x: [(v: any) => number, (d) => any];
	export let y: [(v: any) => number, (d) => any];
	export let data = [];

	let klass = '';
	export { klass as class };

	let offset_x = 0;
	let offset_y = 0;

	let x_value;
	let y_value;

	let x_scaled = 0;
	let y_scaled = 0;

	let value = undefined;

	onMount(() => {
		const target_element = chartfull_context.root_element;
		if (!target_element) {
			throw new Error('target element is undefined');
		}

		const bisect = bisector(x[1]).center;

		const onpointermove = (ev: PointerEvent) => {
			const [xScale, xAccessor] = x;
			const [yScale, yAccessor] = y;

			const i = bisect(data, xScale.invert(pointer(ev)[0]));

			value = data[i];

			gsap.to(element, {
				x: xScale(xAccessor(value)) ?? 0,
				y: yScale(yAccessor(value)),
				duration: 0.3,
				ease: circOut
			});
		};

		target_element.addEventListener('pointermove', onpointermove);

		return () => target_element.removeEventListener('pointermove', onpointermove);
	});
</script>

<div
	class="chartfull-tooltip {klass}"
	use:portal={chartfull_context.html_layer_element}
	bind:this={element}
>
	<div class="inner">
		<slot {value} />
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
