<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { Grafico, XAxis, YAxis, Tick, Bin } from 'graficos'
  import { csv } from 'd3'
  import { scaleLinear } from 'd3-scale'
  let data = []

  csv('./1_OneNum.csv', (d) => ({
    price: +d.price
  })).then((res) => (data = res))

  const value = (d) => d.price

  let innerWidth
  let innerHeight

  $: xScale = scaleLinear([0, 1000], [0, innerWidth])
</script>

<Meta
  title="Charts/Histogram"
  component={Grafico}
  argTypes={{
    height: { control: { type: 'number' } },
    xScale: { control: { type: 'object' } },
    yScale: { control: { type: 'object' } },
    thresholds: { control: { type: 'number' } }
  }}
/>

<Story
  name="Histogram"
  args={{
    height: 600,
    padding: {
      left: 48,
      top: 24,
      right: 24,
      bottom: 24
    },
    xScale: {},
    yScale: {},
    thresholds: undefined
  }}
  let:args
>
  <Grafico {...args} bind:innerWidth bind:innerHeight>
    <XAxis scale={xScale} y={innerHeight} orient="bottom" let:text let:x>
      <Tick {x}>
        <text>{text}</text>
      </Tick>
    </XAxis>

    <Bin
      {data}
      {xScale}
      domain={xScale.domain()}
      {value}
      thresholds={args?.thresholds ?? xScale.ticks(70)}
      range={[innerHeight, 0]}
      let:x0Get
      let:x1Get
      let:yGet
      let:data
      let:yScale
    >
      <YAxis scale={yScale} let:text let:y>
        <Tick {y} x2={-innerWidth}>
          <text>{text}</text>
        </Tick>
      </YAxis>

      {#each data as d, i (i)}
        <rect
          x={1}
          width={x1Get(d) - x0Get(d) - 1}
          height={innerHeight - yGet(d)}
          transform={`translate(${x0Get(d)},${yGet(d)})`}
        />
      {/each}
    </Bin>
  </Grafico>
</Story>
