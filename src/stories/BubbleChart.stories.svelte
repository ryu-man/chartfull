<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico, XAxis, YAxis, Tick, ScaleOrdinal, get } from 'graficos';
	import { csv, extent, max, scaleLinear, schemeAccent } from 'd3';

	let data = [];

	csv('./4_ThreeNum.csv', ({ country, continent, lifeExp, pop, gdpPercap }) => ({
		country,
		continent,
		lifeExp: +lifeExp,
		pop: +pop,
		gdpPercap: +gdpPercap
	})).then((res) => (data = res));

	const [xAcc, yAcc, zAcc] = [(d) => d.gdpPercap, (d) => +d.lifeExp, (d) => d.pop];

	let innerWidth;
	let innerHeight;

	$: xScale = scaleLinear(extent(data, xAcc), [0, innerWidth]);
	$: yScale = scaleLinear(extent(data, yAcc), [innerHeight, 0]);
	$: zScale = scaleLinear([200000, 1310000000], [4, 40]);

	$: xGet = get(xScale, xAcc);
	$: yGet = get(yScale, yAcc);
	$: zGet = get(zScale, zAcc);
</script>

<Meta
	title="Charts/Bubble chart"
	component={Grafico}
	argTypes={{
		height: { control: { type: 'number' } }
	}}
/>

<Story
	name="mono"
	args={{
		height: 0,
		padding: {
			left: 24,
			top: 0,
			right: 0,
			bottom: 24
		}
	}}
	let:args
>
	<Grafico {...args} {data} fontFamilly="Brandon Grotesque" bind:innerWidth bind:innerHeight>
		<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
			<Tick {tick} y={0} y2={-innerHeight} />
		</XAxis>

		<YAxis scale={yScale} let:tick>
			<Tick {tick} x2={-innerWidth} />
		</YAxis>

		{#each data as item}
			<circle
				cx={xGet(item)}
				cy={yGet(item)}
				r={zGet(item)}
				fill="rgba(0 0 0 / .3)"
				mix-blend-mode="multiply"
			/>
		{/each}
	</Grafico>
</Story>

<Story
	name="multi"
	args={{
		height: 0,
		padding: {
			left: 24,
			top: 0,
			right: 0,
			bottom: 24
		}
	}}
	let:args
>
	<Grafico {...args} bind:innerWidth bind:innerHeight>
		<text x={innerWidth} text-anchor="end" font-size="36pt" font-weight="700" fill="#9b9b9b" fill-opacity=".3" dominant-baseline="text-before-edge"
			>Bubble chart - multiple colors</text
		>

		<XAxis y={innerHeight} scale={xScale} orient="bottom" tickSize={-innerHeight} let:tick>
			<Tick {tick} y2={-innerHeight} />
		</XAxis>

		<YAxis scale={yScale} let:tick>
			<Tick {tick} x2={-innerWidth} />
		</YAxis>

		<ScaleOrdinal domain={data.map((d) => d.country)} range={schemeAccent} let:scale={colorize}>
			{#each data as item}
				<circle
					cx={xGet(item)}
					cy={yGet(item)}
					r={zGet(item)}
					fill={colorize(item.country)}
					style="mix-blend-mode: multiply;"
				/>
			{/each}
		</ScaleOrdinal>
	</Grafico>
</Story>
