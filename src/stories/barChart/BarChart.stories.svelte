<script context="module">
	import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Bar chart',
		component: Chartfull,
		argTypes: {
			width: { control: { type: 'string' } },
			height: { control: { type: 'string' } }
		}
	};
</script>

<script>
	import { onMount } from 'svelte';
	import { Story } from '@storybook/addon-svelte-csf';
	import { csv } from 'd3';
	import HorizontalStory from './Horizontal.svelte';
	import AnimatedStory from './Animated.svelte';
	import VerticalStory from './Vertical.svelte';
	import PopulationBarChart from '../others/PopulationBarChart.stories.svelte';

	let data = [];

	csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
		Country: Country + '',
		Value: +Value
	})).then((res) => (data = res));

	let samples = [];

	onMount(() => {
		const interval = setInterval(() => {
			if (samples.length < data.length) {
				const [d] = data.slice(samples.length, data.length);
				samples = [...samples, d];
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<Story name="Horizontal" let:args>
	<HorizontalStory {args} />
</Story>

<Story
	name="Vertical"
	args={{
		padding: { bottom: 0, left: 48, top: 0, right: 0 }
	}}
	let:args
>
	<VerticalStory {args} />
</Story>
<!-- <Story
	name="Population"
	args={{
		height: 0,
		padding: { bottom: 0, left: 48, top: 0, right: 0 }
	}}
	let:args
>
	<PopulationBarChart {args} />
</Story> -->

<Story
	name="Animated"
	args={{
		horizontal: true
	}}
	let:args
>
	<AnimatedStory {args} />
</Story>
