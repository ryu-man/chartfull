<script lang="ts">
	export let scale;
	export let r = 0;

	export let stroke: string | undefined = 'rgba(0 0 0 / .1)';
	export let strokeWidth: string | undefined = "2";
	export let fill: string | undefined = 'none';
</script>

<g class="chartfull-raduis-axis">
	<circle {r} {fill} {stroke} stroke-width={strokeWidth} />

	{#each scale.ticks() as tick, i (tick)}
		<slot {tick} />
	{/each}
</g>
