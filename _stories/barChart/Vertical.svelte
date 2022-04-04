<script>
  import { Grafico, Declare, ScaleOrdinal, XAxis, YAxis, Tick } from 'graficos'

  import { csv, schemeCategory10, max } from 'd3'
  import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'

  export let args = {}

  let data = []

  csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
    Country: Country + '',
    Value: +Value
  })).then((res) => (data = res))

  let samples = []

  let innerWidth
  let innerHeight
  const [xAccessor, yAccessor] = [(d) => d.Country, (d) => +d.Value]

  $: xScale = scaleBand(data.map(xAccessor), [innerWidth, 0]).padding(0.1)
  $: yScale = scaleLinear([0, max(data, (d) => +d.Value)], [innerHeight, 0])
  $: colorScale = scaleOrdinal(data.map(xAccessor), schemeCategory10)

  $: xGet = (d) => xScale(xAccessor(d))
  $: yGet = (d) => yScale(yAccessor(d))
</script>

<Grafico
  bind:innerWidth
  bind:innerHeight
  {...args}
  data={samples}
  padding={{ bottom: 32, left: 32 }}
  fontFamily="Brandon Grotesque"
  fontSize="16"
>
  <YAxis
    scale={yScale}
    orient="left"
    tickSize={innerWidth}
    stroke="gray"
    let:text
    let:y
  >
    <Tick {y} x2={-innerWidth}>
      <text>{text}</text>
    </Tick>
    <text slot="label" font-weight="700" font-size="24" fill="gray">Income</text
    >
  </YAxis>

  <XAxis
    scale={xScale}
    y={innerHeight}
    orient="bottom"
    stroke="gray"
    let:text
    let:x
  >
    <Tick x={x + xScale.bandwidth() / 2} stroke="#e8e8e8">
      <text>{text}</text>
    </Tick>
    <text
      slot="label"
      x={innerWidth}
      dy={54}
      text-anchor="end"
      font-weight="700"
      font-size="24"
      fill="gray">Country</text
    >
  </XAxis>

  {#each data as item (item.Country)}
    <rect
      class={item.Country}
      x={0}
      y={yGet(item)}
      width={xScale.bandwidth()}
      height={innerHeight - yGet(item)}
      fill={colorScale(item.Country)}
      transform={`translate(${xGet(item)},${0})`}
    />
  {/each}
</Grafico>
