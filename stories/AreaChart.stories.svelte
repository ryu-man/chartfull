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
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Template let:args>
  <Declare
    value={[(d) => d.date, (d) => +d.value]}
    let:value={[dateAcc, valueAcc]}
  >
    <Grafico {...args} {data} let:innerWidth let:innerHeight>
      <Area x={dateAcc} y0={innerHeight} y1={valueAcc} let:area>
        <path d={area(data)} />
      </Area>

      <svelte:fragment slot="xaxis">
        <ScaleTime
          domain={extent(data, dateAcc)}
          range={[0, innerWidth]}
          let:scale
        >
          <XAxis {scale} tickPadding={16} />
        </ScaleTime>
      </svelte:fragment>

      <svelte:fragment slot="yaxis">
        <ScaleLinear
          domain={[0, max(data, valueAcc)]}
          range={[innerHeight, 0]}
          let:scale
        >
          <YAxis {scale} tickPadding={8} />
        </ScaleLinear>
      </svelte:fragment>
    </Grafico>
  </Declare>
</Template>

<Story
  name="Normal"
  args={{
    height: 600
  }}
/>
