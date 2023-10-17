<script context="module">
		import { Chartfull } from 'graficos';

	export const meta = {
		title: 'Charts/Box chart',
		component: Chartfull,
		argTypes: {
			width: { type: 'string' },
			height: { type: 'string' }
		}
	};
</script>

<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { XAxis, YAxis, Tick, Box } from 'graficos';
	import { csv } from 'd3';
	import { quantile, bin, extent, min, max } from 'd3-array';
	import { scaleLinear } from 'd3-scale';

	let data = [];

	const dataConverter = (d) => ({
		carat: +d.carat,
		price: +d.price
	});

	csv('./diamonds.csv', dataConverter).then((res) => (data = res));

	let innerWidth;
	let innerHeight;
	let boxWidth = 24;

	const xAccessor = (d) => d.carat;
	const yAccessor = (d) => d.price;

	$: bins = bin()
		.thresholds(innerWidth / 40)
		.value(xAccessor)(data)
		.map((d) => {
			if (!d.length) return undefined;

			const y = d.map(yAccessor);

			const _min = min(y);
			const _max = max(y);

			const q1 = quantile(y, 0.25);
			const q2 = quantile(y, 0.5);
			const q3 = quantile(y, 0.75);
			const iqr = q3 - q1; // interquartile range

			const r0 = Math.max(_min, q1 - iqr * 1.5);
			const r1 = Math.min(_max, q3 + iqr * 1.5);

			return {
				x0: d.x0,
				x1: d.x1,
				quartiles: [q1, q2, q3],
				range: [r0, r1],
				outliers: y.filter((dd) => dd < r0 || dd > r1),
				get width() {
					return Math.abs(d.x0 - d.x1);
				},
				get quartileHeight() {
					return Math.abs(q1 - q3);
				},
				get extremHeight() {
					return Math.abs(r0 - r1);
				},
				...d
			};
		})
		.filter(Boolean);

	$: xScale = scaleLinear(extent(data, xAccessor), [0 + boxWidth / 2, innerWidth - boxWidth / 2]);
	$: yScale = scaleLinear(extent(data, yAccessor), [innerHeight, 0]);
</script>

<Story
	name="Box chart"
	let:args
>
	<Chartfull
		height={args.height}
		padding={{ top: 54, left: 72, bottom: 32 }}
		bind:innerWidth
		bind:innerHeight
	>
		<YAxis scale={yScale} let:tick>
			<Tick {tick} x2={-innerWidth} />
			<text slot="label">Price</text>
		</YAxis>

		<XAxis scale={xScale} orient="bottom" y={innerHeight} let:tick>
			<Tick {tick} y2={-innerHeight} />

			<text slot="label" x={innerWidth}>Carat</text>
		</XAxis>

		{#each bins as box}
			{@const [y1, y2] = box.range.map(yScale)}
			<Box
				x1={xScale(box.x0)}
				x2={xScale(box.x1)}
				{y1}
				{y2}
				width={24}
				quartiles={box.quartiles.map(yScale)}
				outliers={box.outliers}
			>
				{#each box.outliers as outlier}
					<circle cx="0" cy={yScale(outlier)} r={3} fill="black" fill-opacity=".03" stroke="none" />
				{/each}
			</Box>
		{/each}
	</Chartfull>
</Story>
