<script lang="ts">
	export let scale;
</script>

<g class="chartfull-angle-axis">
	{#each scale.ticks() as tick, i (tick)}
		<slot {tick} {i}>
			<circle r={scale(tick)} fill="none" stroke="rgba(0 0 0 / {0.1 - i * 0.01})" />
		</slot>
	{/each}
</g>
