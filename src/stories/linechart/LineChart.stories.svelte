<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Line chart',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'string' } },
			height: { control: { type: 'string' } }
		}
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
	import OneLine from './OneLine.svelte';
	import MultiLine from './MultiLine.svelte';
	import RadialLine from './RadialLine.svelte';

	const args = {};
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
