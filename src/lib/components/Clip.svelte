<script>
	export let x = 0;
	export let y = 0;
	export let width = 0;
	export let height = 0;

	const id = (+new Date() * Math.random() * 10).toString(16);
</script>

<g class="clip">
	<defs>
		<clipPath {id}>
			<rect {x} {y} {width} {height} />
		</clipPath>
	</defs>
	<g class="clip-slot" clip-path="url(#{id})">
		<slot />
	</g>
</g>

<style>
	rect {
		pointer-events: none;
	}
</style>
