<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { fade } from 'svelte/transition';
	import { Grafico } from 'graficos';
	import { Tweened } from 'graficos/components';
	import CustomXAxis from 'graficos/axis/CustomXAxis.svelte';
	import { csv, extent, timeParse, timeMonths, scaleTime, shuffle } from 'd3';
	import { startOfYear, endOfYear } from 'date-fns';
	import MarginDecorator from './MarginDecorator.svelte';

	const today = new Date();
	let data = [];
	const duration = 1000;

	const delay = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

	Promise.resolve(timeMonths(startOfYear(today), endOfYear(today))).then(async (array) => {
		for (const d of array) {
			data = [...data, d];
			await delay(duration + 100);
		}
	});

	let innerWidth = 0;
	let innerHeight = 0;

	$: xScale = scaleTime(extent(data), [0, innerWidth]);

	let to = [];

	function randomLetters() {
		return shuffle('abcdefghijklmnopqrstuvwxyz'.split(''))
			.slice(0, Math.floor(6 + Math.random() * 20))
			.sort();
	}
</script>

<Meta
	title="Components/Tweened"
	component={Grafico}
	argTypes={{
		height: { control: { type: 'number' } },
		width: { control: { type: 'number' } }
	}}
/>

<MarginDecorator>
	<Story
		id="tweened"
		name="Tweened"
		args={{
			width: 100,
			top: false
		}}
		let:args
	>
		<Grafico bind:innerWidth bind:innerHeight {...args}>
			<Tweened
				{to}
				enter={(d) => ({ ...d, opacity: 0, val: 0 })}
				exit={(d) => ({ ...d, opacity: 0, val: 0 })}
				value={(d, i) => d}
				key={(d) => d.key}
				duration={2000}
				let:data
			>
				{#each data as t, i (t.key)}
					<text x={i * 192} fill-opacity={t.opacity}>{t.val.toFixed(2)}</text>
				{/each}
			</Tweened>
		</Grafico>

		<button
			on:click={() => {
				to = [
					{ val: 1, key: '1', opacity: 1 },
					{ val: 2, key: '2', opacity: 1 },
					{ val: 3, key: '3', opacity: 1 }
				];
			}}>reset</button
		>
		<button
			on:click={() => {
				to = [
					{ val: 2, key: '1', opacity: 1 },
					{ val: 4, key: '2', opacity: 1 },
					{ val: 6, key: '3', opacity: 1 },
					{ val: 8, key: '4', opacity: 1 }
				];
			}}>animate</button
		>
	</Story>

	<Story
		id="customXAxis"
		name="Custom X Axis"
		args={{
			width: 100,
			top: false
		}}
		let:args
	>
		<Grafico bind:innerWidth bind:innerHeight {...args}>
			<CustomXAxis scale={xScale} let:ticks let:format let:previousScale>
				<Tweened
					to={ticks.map((d) => ({ tick: d, x: xScale(d), opacity: 1 }))}

					enter={({ tick }) => ({ tick, x: previousScale(tick), opacity: 0 })}
					exit={({ tick }) => ({ tick, x: xScale(tick), opacity: 0 })}

					value={(d, i) => d}
					key={(d) => d.tick.toString()}
					duration={2000}
					let:data
				>
					{#each data as { tick, x, opacity }, i (tick)}
						<text {x} fill-opacity={opacity}>{format(tick)}</text>
					{/each}
				</Tweened>
			</CustomXAxis>
		</Grafico>
	</Story>
</MarginDecorator>
