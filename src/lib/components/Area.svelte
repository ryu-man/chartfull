<script lang="ts">
	type $$Props = Exclude<svelteHTML.IntrinsicElements['path'], 'fill' | 'stroke'>;
	
	export let fill = 'rgba(0 0 0 / .1)';
	export let stroke = 'rgba(0 0 0 / .2)';
</script>

<path {...$$restProps} {fill} {stroke} on:click on:mouseenter on:mouseleave />

<style>
	path {
		pointer-events: visibleStroke;
	}
</style>
