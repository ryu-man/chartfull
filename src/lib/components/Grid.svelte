<script lang="ts">
	import { getChartfullContext } from '../chartfull';

	const { innerHeight$, innerWidth$ } = getChartfullContext();

	export let width = $innerWidth$;
	export let height = $innerHeight$;

	export let cellSize = 5;

	$: tileSize = cellSize * 5;

	// Keep width & height updated id the user didn't specify values
	$: !$$props.width && (width = $innerWidth$);
	$: !$$props.height && (height = $innerHeight$);
</script>

<g class="chartfull-grid">
	<defs>
		<!-- 1x1 cell -->
		<pattern id="grid-cell" patternUnits="userSpaceOnUse" width={cellSize} height={cellSize}>
			<line x1={cellSize} y1="0" x2={cellSize} y2={cellSize} stroke-width="0.05" class="gray-40" />
			<line x1="0" y1={cellSize} x2={cellSize} y2={cellSize} stroke-width="0.05" class="gray-40" />
		</pattern>

		<!-- 5x5 tile -->
		<pattern id="grid-tile" patternUnits="userSpaceOnUse" width={tileSize} height={tileSize}>
			<rect width={tileSize} height={tileSize} fill="url(#grid-cell)" />
			<line x1={tileSize} y1="0" x2={tileSize} y2={tileSize} stroke-width=".15" class="gray-80" />
			<line x1="0" y1={tileSize} x2={tileSize} y2={tileSize} stroke-width=".15" class="gray-80" />
		</pattern>
	</defs>

	<rect
		x="0"
		y="0"
		{width}
		{height}
		stroke-width="0.06"
		fill="url(#grid-tile)"
		class="gray-80"
		pointer-events="none"
	/>
</g>

<style>
	.gray-40 {
		stroke: hsl(220 10% 40% / 0.6);
	}

	.gray-80 {
		stroke: hsl(220 10% 80% / 0.6);
	}
</style>
