<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Chartfull } from 'graficos';
	import Line from 'graficos/shape/Line.svelte';
	import { scaleLinear, max } from 'd3';

	let data = [];

	let xi = 0;

	let innerWidth;
	let innerHeight;

	const xAccessor = (d) => d.x;
	const yAccessor = (d) => d.y;

	$: xScale = scaleLinear([0, max(data, xAccessor)], [0, 600]);
	$: yScale = scaleLinear([0, max(data, yAccessor)], [400, 0]);

	$: x = (d) => xScale(xAccessor(d));
	$: y = (d) => yScale(yAccessor(d));
</script>

<Meta
	title="Components/Animated Path"
	argTypes={{
		width: { control: { type: 'number' } },
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="Labeled"
	args={{
		height: 600,
		radius: 256
	}}
	let:args
>
	<Chartfull height={args.height} bind:innerWidth bind:innerHeight>
		<Line {data} {x} {y} />
	</Chartfull>

	<button
		on:click={() => {
			data = [...data, { x: xi + 1, y: Math.random() * 100 }];
			xi += 1;
		}}
	>
		Add
	</button>
</Story>
