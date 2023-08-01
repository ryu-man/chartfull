# Chartfull

an impressive data visualization library aimed at [Svelte](https://www.svelte.dev) framework users. This library, powered by the ever-popular [D3.js](https://d3js.org/), is highly customizable, allowing you to make the most of your data, as well as its declarative and reactive approach, allowing you to easily create interactive and informative visualizations. 

Whether you're an experienced developer or just starting out, you'll find that this library is simple to use and yields stunning results that will impress. So why not try it out right now and take your data visualizations to the next level?


## Usage

Coming soon !

<!-- ```bash -->
<!-- # using npm -->
<!-- npm install Chartfulls -->
<!--  -->
<!-- # using yarn -->
<!-- yarn install Chartfulls -->
<!-- ``` -->

## Usage

```html
<script lang="ts">
    import { Chartfull, XAxis, YAxis, Line } from "Chartfull"

    let data = []

    let innerWidth: number
    let inner Height: number

    const xAccessor = d=> d.x
    const yAccessor = d=> d.y

	$: xScale = scaleTime(extent(data.map(xAccessor)), [0, innerWidth]);
	$: yScale = scaleLinear(extent(data.map(yAccessor)), [innerHeight, 0]);

	$: xGet = get(xScale, xAccessor);
	$: yGet = get(yScale, yAccessor);

	$: d = line(xGet, yGet)(data);
</script>

<!--> Line chart <-->

<Chartfull
	padding={{ left: 72, top: 16, right: 16, bottom: 16 }}
	fontSize="16"
	{...args}
	{data}
	bind:innerWidth
	bind:innerHeight
>
	<YAxis scale={yScale} let:tick>
		<Tick {tick} x2={-innerWidth} />
		<text slot="label">Label goes here</text>
	</YAxis>

	<XAxis scale={xScale} y={innerHeight} orient="bottom" let:tick>
		<Tick {tick} y2={-innerHeight} />
		<text slot="label" x={innerWidth}>Label goes here</text>
	</XAxis>

	<text
		x={innerWidth}
		text-anchor="end"
		dominant-baseline="text-before-edge"
		font-size="24pt"
		font-weight="600"
		fill="rgba(0,0,0, .1)"
	>
		Chart title
	</text>

	<Line {d} stroke="rgba(0 0 0 / .6)" strokeWidth="1" />
</Chartfull>

```

## Components

## Licence

Chartfulls is [MIT Licence](./LICENSE)

## Inspiration

- [Pancake](https://github.com/Rich-Harris/pancake)
