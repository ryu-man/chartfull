<script>
	import { onMount } from 'svelte';
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico } from 'graficos';
	import { csv } from 'd3';

	import MarginDecorator from '../MarginDecorator.svelte';
	import HorizontalStory from './Horizontal.svelte';
	import AnimatedStory from './Animated.svelte';
	import VerticalStory from './Vertical.svelte';

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

<Meta
	title="Charts/Bar chart"
	component={Grafico}
	argTypes={{ height: { control: { type: 'number' } } }}
/>

<MarginDecorator>
	<Story
		name="Horizontal"
		args={{
			height: 600,
			horizontal: true
		}}
		let:args
	>
		<HorizontalStory {args} />
	</Story>

	<Story
		name="Vertical"
		args={{
			height: 600,
			padding: { bottom: 0, left: 48, top: 0, right: 0 }
		}}
		let:args
	>
		<VerticalStory {args} />
	</Story>

	<Story
		name="Animated"
		args={{
			height: 600,
			horizontal: true
		}}
		let:args
	>
		<AnimatedStory {args} />
	</Story>
</MarginDecorator>
