<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Grafico, Declare, ScaleTime, XAxis, YAxis, Tick } from 'graficos';
	import { csv, extent, timeParse } from 'd3';
	import MarginDecorator from './MarginDecorator.svelte';

	const timeParser = timeParse('%Y%m%d');

	let data = [];

	csv('./multi_line.csv', (d) => ({
		date: timeParser(d['date']),
		'New York_1': +d['New York_1'],
		'San Francisco_1': +d['San Francisco_1'],
		Austin_1: +d['Austin_1']
	})).then((res) => (data = res));
</script>

<Meta
	title="Components/Axis"
	component={Grafico}
	argTypes={{
		height: { control: { type: 'number' } },
		width: { control: { type: 'number' } }
	}}
/>

<MarginDecorator>
	<Story
		id="xaxis"
		name="XAxis"
		args={{
			width: 100,
			top: false
		}}
		let:args
	>
		<Grafico {...args} data={data.map((d) => d.date)} let:data let:innerWidth let:innerHeight>
			<ScaleTime domain={extent(data)} range={[0, innerWidth]} let:scale>
				<XAxis
					{scale}
					y={innerHeight/2}
					orient={args.top ? 'top' : 'bottom'}
					tickSize={6}
					let:tick
					let:format
					let:x
					let:d
				>
					<Tick {x} y={0} let:tickSize let:props>
						<line stroke="#e8e8e8" y2={tickSize} />
						<text {...props} fill="gray" font-family="Arial">{format(tick)}</text>
					</Tick>
					<path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
				</XAxis>
			</ScaleTime>
		</Grafico>
	</Story>

	<Story
		id="yaxis"
		name="YAxis"
		args={{
			height: 400,
			left: true
		}}
		let:args
	>
		<Grafico {...args} data={data.map((d) => d.date)} let:data let:innerWidth let:innerHeight>
			<ScaleTime domain={extent(data)} range={[0, innerHeight]} let:scale>
				<YAxis
					{scale}
					x={innerWidth / 2}
					y={0}
					orient={args.left ? 'left' : 'right'}
					tickSize={6}
					stroke="gray"
					strokeWidth="2"
					let:tick
					let:format
					let:y
				>
					<Tick x={0} {y} x2={6} stroke="#e8e8e8" let:props>
						<text {...props} fill="gray" font-family="Arial">{format(tick)}</text>
					</Tick>
				</YAxis>
			</ScaleTime>
		</Grafico>
	</Story>
</MarginDecorator>
