<script lang="ts">
	import { portal } from 'graficos/actions';
	import { getChartfullContext } from 'graficos/chartfull';

	const chartfull_context = getChartfullContext();
</script>

<div class="chartfull-html-wrapper" use:portal={chartfull_context.html_layer_element}>
	<slot />
</div>

<style>
	.chartfull-html-wrapper {
		display: contents;
	}
</style>
 