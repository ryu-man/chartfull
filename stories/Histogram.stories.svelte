<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import {
    Grafico,
    XAxis,
    YAxis,
    ScaleLinear,
    Tick,
    Bin,
    Declare
  } from '../src'
  import { csv, extent, max } from 'd3'

  let data = []

  csv('./1_OneNum.csv', ({ price }) => ({
    price: +price
  })).then((res) => (data = res))

  const acc = (d) => d.price
</script>

<Meta
  title="Elements/Histogram chart"
  component={Grafico}
  argTypes={{
    height: { control: { type: 'number' } },
    xScale: { control: { type: 'object' } },
    yScale: { control: { type: 'object' } },
    thresholds: { control: { type: 'number' } }
  }}
/>

<Template let:args>
  <Grafico {...args} {data} let:innerWidth let:innerHeight>
    <ScaleLinear
      domain={[0, 1000]}
      range={[0, innerWidth]}
      {...args.xScale}
      let:scale
    >
      <XAxis
        {scale}
        tickPadding={16}
        tickSize={-innerHeight}
        tickColor={'grey'}
        let:format
        let:tick
        let:x
        let:d
      >
        <Tick {x} let:props>
          <line stroke="gray" y2={-6} />
          <text {...props} fill="gray" font-family="Brandon Grotesque"
            >{format(tick)}</text
          >
        </Tick>
        <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
      </XAxis>
      <Bin
        {data}
        value={acc}
        domain={scale.domain()}
        thresholds={args?.thresholds ?? scale.ticks(70)}
        let:bins
        let:x0Get
        let:x1Get
        let:yGet
        let:promise
      >
        <ScaleLinear
          domain={[0, max(bins, (d) => d.length)]}
          range={[innerHeight, 0]}
          {...args.yScale}
          let:scale
        >
          <YAxis {scale} tickPadding={8} let:format let:tick let:y let:d>
            <Tick {y} let:props>
              <line stroke="gray" x2={-6} />
              <text
                {...props}
                fill="gray"
                alignment-baseline="middle"
                font-size="14pt"
                font-family="Brandon Grotesque">{format(tick)}</text
              >
            </Tick>
            <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
          </YAxis>
        </ScaleLinear>

        {#await promise then value}
          {#each bins as d, i (i)}
            <rect
              x={1}
              width={x1Get(d) - x0Get(d) - 1}
              height={innerHeight - yGet(d)}
              transform={`translate(${x0Get(d)},${yGet(d)})`}
            />
          {/each}
        {/await}
      </Bin>
    </ScaleLinear>
  </Grafico>
</Template>

<Story
  name="Normal"
  args={{
    height: 600,
    xScale: {},
    yScale: {},
    thresholds: undefined
  }}
/>
