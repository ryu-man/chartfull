<script>
	export let x = 0;
	export let y = 0;
	export let width = 0;
	export let height = 0;
</script>

<g class="tooltip">
	<rect {x} {y} {width} {height}  fill="rgb( 0 0 0 / .4)"/>
	<slot />
</g>

<style>
	/* your styles go here */
</style>
