<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import {
		Grafico,
		Declare,
		ScaleTime,
		XAxis,
		YAxis,
		ScaleLinear,
		Tick,
		Area,
		ScaleOrdinal,
		access
	} from 'graficos';
	import { csv, extent, max, scaleLinear, schemeAccent, schemeCategory10 } from 'd3';

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
	$: yScale = scaleLinear([0, max(data, yAcc)], [innerHeight, 0]);
	$: zScale = scaleLinear([200000, 1310000000], [4, 40]);

	$: xGet = access(xScale, xAcc);
	$: yGet = access(yScale, yAcc);
	$: zGet = access(zScale, zAcc);
</script>

<Meta
	title="Charts/Bubble chart"
	component={Grafico}
	argTypes={{
		height: { control: { type: 'number' } },
		xScale: { control: { type: 'object' } },
		yScale: { control: { type: 'object' } }
	}}
/>

<Story
	name="mono"
	args={{
		height: 600,
		padding: {
			left: 24,
			top: 0,
			right: 0,
			bottom: 24
		},
		xScale: {},
		yScale: {}
	}}
	let:args
>
	<Grafico {...args} {data} fontFamilly="Brandon Grotesque" bind:innerWidth bind:innerHeight>
		<XAxis scale={xScale} y={innerHeight} orient="bottom" let:text let:x>
			<Tick {x} y={0} y2={-innerHeight}>
				<text>{text}</text>
			</Tick>
		</XAxis>

		<YAxis scale={yScale} let:text let:y>
			<Tick {y} x2={-innerWidth}>
				<text>{text}</text>
			</Tick>
		</YAxis>

		{#each data as item}
			<circle
				cx={xGet(item)}
				cy={yGet(item)}
				r={zGet(item)}
				fill="#7c7c7c"
				mix-blend-mode="multiply"
			/>
		{/each}
	</Grafico>
</Story>

<Story
	name="multi"
	args={{
		height: 600,
		padding: {
			left: 24,
			top: 48,
			right: 0,
			bottom: 24
		},
		xScale: {},
		yScale: {}
	}}
	let:args
>
	<Grafico {...args} {data} fontFamily="Brandon Grotesque" bind:innerWidth bind:innerHeight>
		<XAxis y={innerHeight} scale={xScale} orient="bottom" tickSize={-innerHeight} let:text let:x>
			<Tick {x} y2={-innerHeight}>
				<text>{text}</text>
			</Tick>
		</XAxis>

		<YAxis scale={yScale} let:text let:y>
			<Tick {y} x2={-innerWidth}>
				<text>{text}</text>
			</Tick>
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

		<text
			x={innerWidth}
			dy="-24"
			text-anchor="end"
			font-size="16pt"
			font-weight="700"
			fill="#9b9b9b">Bubble chart - multiple colors</text
		>
	</Grafico>
</Story>
