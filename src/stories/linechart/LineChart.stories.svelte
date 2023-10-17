<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Line chart',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'number' } },
			height: { control: { type: 'number' } }
		}
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import OneLine from './OneLine.svelte';
	import MultiLine from './MultiLine.svelte';
	import RadialLine from './RadialLine.svelte';

	const args = {
		height: 0,
		padding: {
			top: 54,
			right: 0,
			bottom: 24,
			left: 72
		}
	};
</script>

<Story name="mono line" {args} let:args>
	<OneLine {args} />
</Story>

<Story name="multi lines" {args} let:args>
	<MultiLine {args} />
</Story>

<Story name="radial line" {args} let:args>
	<RadialLine {args} />
</Story>
