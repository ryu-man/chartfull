<script lang="ts">
	import {
		autoUpdate,
		computePosition,
		type Placement,
		offset as fui_offset,
		autoPlacement
	} from '@floating-ui/dom';
	import { getChartfullContext } from 'chartfull';
	import { clickOutside, portal } from 'chartfull/actions';
	import { getChartfullPopoverContext } from './context';
	import { tick } from 'svelte';

	const chartfull_context = getChartfullContext();

	const popover_context = getChartfullPopoverContext();
	const open_store = popover_context.open;

	export let open = false;
	export let reference: Element | undefined = undefined;
	export let placements: Placement[] = [];
	export let offset = 8;

	let mounted = false;
	let dx = 0;
	let dy = 0;

	type InitParamas = { reference?: Element; placements: Placement[] | undefined };

	function init(node: HTMLElement, { placements, reference }: InitParamas) {
		node.hidden = true;

		if (!reference && !node.parentElement) {
			throw new Error('<Popover> reference element is undefined');
		}

		const ref = reference ?? node.parentElement ?? undefined;

		let cleanup: (() => void) | undefined = undefined;

		portal(node, chartfull_context.html_layer_element);
		attach(node, { reference: ref, placements }).then(() => {
			cleanup = autoUpdate(ref, node, async () => {
				node.hidden = true;
				portal(node, chartfull_context.html_layer_element);
				await tick();
				attach(node, { reference, placements });
			});
		});

		const click_outside_action = clickOutside(node, {
			callback: onclick_outside,
			exclude: [ref]
		});

		return {
			update({ reference }: InitParamas) {
				if (!reference) return;
				portal(node, chartfull_context.html_layer_element);
			},
			destroy() {
				cleanup?.();
				click_outside_action.destroy();
			}
		};

		function attach(node: HTMLElement, { placements, reference }: InitParamas) {
			return computePosition(reference, node, {
				middleware: [
					fui_offset(offset),
					autoPlacement({
						autoAlignment: true,
						crossAxis: true,
						allowedPlacements: placements
					})
				]
			}).then(({ x, y, placement }) => {
				dy = placement.startsWith('top') ? 1 : placement.startsWith('bottom') ? -1 : 0;

				dx = placement.startsWith('left') ? 1 : placement.startsWith('right') ? -1 : 0;

				node.style.transform = `translate(${x}px, ${y}px)`;

				mounted = true;
			});
		}
	}

	function onclick_outside() {
		open = false;
	}
</script>

{#if $open_store}
	<div
		class="chartfull-popover w-min h-min pointer-events-auto"
		use:init={{ reference: reference, placements }}
	>
		{#if mounted}
			<slot {dx} {dy} />
		{/if}
	</div>
{/if}

<style lang="postcss">
	.chartfull-popover {
		@apply absolute top-0 left-0;
	}
</style>
