<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import {
    Grafico,
    Line,
    Declare,
    ScaleOrdinal,
    ScaleTime,
    XAxis,
    YAxis,
    ScaleLinear,
    Tick
  } from '../src'
  import { csv, extent, schemeCategory10, timeParse } from 'd3'
  import MarginDecorator from './MarginDecorator.svelte'

  const timeParser = timeParse('%Y%m%d')

  let data = []

  csv('./multi_line.csv', (d) => ({
    date: timeParser(d['date']),
    'New York_1': +d['New York_1'],
    'San Francisco_1': +d['San Francisco_1'],
    Austin_1: +d['Austin_1']
  })).then((res) => (data = res))

</script>

<Meta
  title="Components/Axis"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } }, width:{control:{type:"number"}} }}
/>

<Template let:args>
  <MarginDecorator>
    <Declare value={(d) => d.date} let:value={accessor}>
      <Grafico {...args} {data} let:data let:innerWidth let:innerHeight>
        <ScaleTime
          domain={extent(data.map(accessor))}
          range={[0, innerWidth]}
          let:scale
        >
          <XAxis
            {scale}
            y={innerHeight}
            orient="bottom"
            tickSize={6}
            tickPadding={24}
            let:tick
            let:format
            let:x
            let:d
          >
            <Tick {x} y={0} let:tickSize let:props>
              <line stroke="#e8e8e8" y2={tickSize} />
              <text {...props} fill="gray" font-family="Brandon Grotesque"
                >{format(tick)}</text
              >
            </Tick>
            <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
          </XAxis>
        </ScaleTime>
      </Grafico>
    </Declare>
  </MarginDecorator>
</Template>

<Story
  name="XAxis"
  args={{
    height: 100
  }}
/>
