<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { animate } from 'graficos/actions';

	export let male = 0;
	export let female = 0;
	export let birthyear = 0;

	export let x = 0;
	export let dx = 0;
	export let width = 0;
	export let height = 0;

	export let duration = 200;

	const t$ = tweened([x, width], { duration });
</script>

<g use:animate={{ x, translateX: -dx, duration: duration / 1000 }}>
	<rect
		fill="rgba(0,0,0,0.3)"
		use:animate={{ x: 0, width, y: male, height: height - male, duration: duration / 1000 }}
	/>

	<rect
		x={0}
		width={$t$[1]}
		y={female}
		height={height - female}
		fill="rgba(0,0,0,0.3)"
		use:animate={{ x: 0, width, y: female, height: height - female, duration: duration / 1000 }}
	/>

	<text
		fill="rgb(255 255 255 / 1)"
		font-size="8pt"
		text-anchor="middle"
		use:animate={{
			x: dx,
			width,
			y: height,
			translateY: -8,
			height: height - female,
			duration: duration / 1000
		}}
	>
		{birthyear}
	</text>
</g>
