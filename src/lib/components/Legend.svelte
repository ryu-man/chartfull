<script lang="ts">
	import { portal } from 'svelte-portal';
	import { getChartfullContext } from 'chartfull/chartfull';

	const { contentElement } = getChartfullContext();

	export let x = 0;
	export let y = 0;
	export let width = 'fit-content';
	export let height = 'fit-content';

	export let dx = '0px';
	export let dy = '0px';
</script>

<div
	class="chartfull-legend"
	style:transform="translate({x}px, {y}px) translate({dx}, {dy})"
	style:width
	style:height
	use:portal={contentElement}
>
	<slot />
</div>


<style>
	.chartfull-legend {
		padding: 14px;
		border-radius: 6px;
		position: absolute;
		left: 0;
		top: 0;

        background-color: white;

        display: flex;
        flex-direction: column;

        border: 1px solid rgb(0 0 0 / .06);

        box-shadow: 0px 1px 4px .4px rgb(0 0 0 / .06);

        pointer-events: all;

        cursor: auto;
	}
</style>
