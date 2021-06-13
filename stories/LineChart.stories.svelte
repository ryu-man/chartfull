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
  title="Elements/Line chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Template let:args>
  <Declare value={(d) => d.date} let:value={accessor}>
    <Grafico {...args} {data} let:data let:innerWidth let:innerHeight>
      <ScaleOrdinal
        domain={['ny', 'sf', 'au']}
        range={schemeCategory10}
        let:scale
      >
        <g>
          <Line T={data} y={(d) => d['New York_1']} x={accessor} let:line>
            <path d={line(data)} fill="transparent" stroke={scale('ny')} />
          </Line>
          <Line T={data} y={(d) => d['San Francisco_1']} x={accessor} let:line>
            <path d={line(data)} fill="transparent" stroke={scale('sf')} />
          </Line>
          <Line T={data} y={(d) => d['Austin_1']} x={accessor} let:line>
            <path d={line(data)} fill="transparent" stroke={scale('au')} />
          </Line>
        </g>
      </ScaleOrdinal>

      <svelte:fragment slot="xaxis">
        <ScaleTime
          domain={extent(data.map(accessor))}
          range={[0, innerWidth]}
          let:scale
        >
          <XAxis
            {scale}
            y={innerHeight}
            orient="bottom"
            tickSize={-innerHeight}
            tickPadding={24}
            let:tick
            let:format
            let:x
            let:d
          >
            <Tick {x} y={0} value={format(tick)} let:tickSize>
              <line stroke="#e8e8e8" y2={tickSize} />
            </Tick>
            <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
            <text
              slot="label"
              text-anchor="middle"
              x={innerWidth / 2}
              dy="64"
              font-size="24">Years</text
            >
          </XAxis>
        </ScaleTime>
      </svelte:fragment>

      <svelte:fragment slot="yaxis">
        <ScaleLinear
          domain={extent(
            data
              .map((d) => [
                +d['New York_1'],
                +d['San Francisco_1'],
                +d['Austin_1']
              ])
              .reduce((acc, c) => (acc.push(...c), acc), [])
          )}
          range={[innerHeight, 0]}
          let:scale
        >
          <YAxis
            {scale}
            tickSize={innerWidth}
            tickPadding={16}
            let:y
            let:tick
            let:format
            let:d
          >
            <text slot="label" transform="rotate(90)" dy="64" fonts-size="24">
              % Unemployment
            </text>
            <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
            
            <Tick {y} value={format(tick)} let:tickSize>
              <line stroke="#e8e8e8" x2={tickSize} />
            </Tick>
          </YAxis>
        </ScaleLinear>
      </svelte:fragment>

      <div slot="title">Bureau of Labor Statistics</div>
    </Grafico>
  </Declare>
</Template>

<Story
  name="Normal"
  args={{
    height: 600
  }}
/>
