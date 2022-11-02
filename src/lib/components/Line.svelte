<script lang="ts">
	type $$Props = Exclude<svelteHTML.IntrinsicElements['path'], 'fill' | 'stroke'>;

	export let stroke = 'rgba(0 0 0 / .4)'
</script>

<path {...$$restProps} {stroke} fill="none" on:click on:mouseenter on:mouseleave />

<style>
	path {
		pointer-events: visibleStroke;
	}
</style>
