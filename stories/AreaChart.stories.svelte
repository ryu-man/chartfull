<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import {
    Grafico,
    Declare,
    ScaleTime,
    XAxis,
    YAxis,
    ScaleLinear,
    Tick,
    Area
  } from '../src'
  import { csv, extent, max } from 'd3'

  let data = []

  csv('./3_TwoNumOrdered_comma.csv', (d) => ({
    ...d,
    date: new Date(d.date)
  })).then((res) => (data = res))
</script>

<Meta
  title="Elements/Area chart"
  component={Grafico}
  argTypes={{
    height: { control: { type: 'number' } },
    xScale: { control: { type: 'object' } },
    yScale: { control: { type: 'object' } }
  }}
/>

<Template let:args>
  <Declare
    value={[(d) => d.date, (d) => +d.value]}
    let:value={[dateAcc, valueAcc]}
  >
    <Grafico {...args} {data} let:innerWidth let:innerHeight>
      <ScaleTime
        domain={extent(data, dateAcc)}
        range={[0, innerWidth]}
        {...args.xScale}
        let:scale
      >
        <XAxis {scale} tickPadding={16} />
      </ScaleTime>
      <ScaleLinear
        domain={[0, max(data, valueAcc)]}
        range={[innerHeight, 0]}
        {...args.yScale}
        let:scale
      >
        <YAxis {scale} tickPadding={8} />
      </ScaleLinear>

      <Area x={dateAcc} y0={innerHeight} y1={valueAcc} let:area>
        <path d={area(data)} />
      </Area>
    </Grafico>
  </Declare>
</Template>

<Story
  name="Normal"
  args={{
    height: 600,
    xScale: {},
    yScale: {}
  }}
/>
