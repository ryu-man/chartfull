<script>
	import { tweened } from 'svelte/motion';

	export let male = 0;
	export let female = 0;
	export let birthyear = 0;

	export let x = 0;
	export let dx = 0;
	export let width = 0;
	export let height = 0;

	export let duration = 200;

	const t$ = tweened([x, width], { duration });

	console.log(male, female);

	$: t$.set([x, width]);
</script>

<g style:transform="translate3d({$t$[0]}px,0px, 1px) translateX({-dx}px)">
	<rect x={0} width={$t$[1]} y={male} height={height - male} fill="rgba(0,0,0,0.3)" />
	<rect x={0} width={$t$[1]} y={female} height={height - female} fill="rgba(0,0,0,0.3)" />
	<text x={dx} y={height} dy={-8} fill="rgb(255 255 255 / 1)" font-size="8pt" text-anchor="middle"
		>{birthyear}</text
	>
</g>
