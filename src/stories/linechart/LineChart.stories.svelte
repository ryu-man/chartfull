<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico } from 'graficos';
	import OneLine from './OneLine.svelte';
	import MultiLine from './MultiLine.svelte';
	import RadialLine from './RadialLine.svelte';
</script>

<Meta
	title="Charts/Line chart"
	component={Grafico}
	argTypes={{ height: { control: { type: 'number' } } }}
/>

<Story
	name="mono line"
	args={{
		height: 0,
		padding: {
			top: 54,
			right: 0,
			bottom: 24,
			left: 72
		}
	}}
	let:args
>
	<OneLine {args} />
</Story>

<Story
	name="multi lines"
	args={{
		height: 0,
		padding: {
			left: 36,
			top: 36,
			right: 0,
			bottom: 36
		}
	}}
	let:args
>
	<MultiLine {args} />
</Story>

<Story
	name="radial line"
	args={{
		height: 0
	}}
	let:args
>
	<RadialLine {args} />
</Story>
