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
  import {
    csv,
    extent,
    scaleLinear,
    scaleTime,
    schemeCategory10,
    timeParse
  } from 'd3'

  const timeParser = timeParse('%Y%m%d')

  let multiLineData = []

  csv('./multi_line.csv', (d) => ({
    date: timeParser(d['date']),
    'New York_1': +d['New York_1'],
    'San Francisco_1': +d['San Francisco_1'],
    Austin_1: +d['Austin_1']
  })).then((res) => (multiLineData = res))

  let oneLineData = []
  const timeParse_2 = timeParse('%Y-%m-%d')
  csv('./3_TwoNumOrdered_comma.csv', (d) => ({
    date: timeParse_2(d.date),
    value: +d.value
  })).then((res) => (oneLineData = res))
</script>

<Meta
  title="Elements/Line chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Story
  name="One line"
  args={{
    height: 600
  }}
  let:args
>
  <Declare
    value={[(d) => d.date, (d) => d.value]}
    let:value={[xAccessor, yAccessor]}
  >
    <Declare value={[scaleTime(), scaleLinear()]} let:value={[xScale, yScale]}>
      <Grafico
        {...args}
        data={oneLineData}
        let:data
        let:innerWidth
        let:innerHeight
      >
        <Declare
          value={[
            xScale.domain(extent(data.map(xAccessor))).range([0, innerWidth]),
            yScale.domain(extent(data.map(yAccessor))).range([innerHeight, 0])
          ]}
          let:value={[xScale, yScale]}
        >
          <XAxis
            scale={xScale}
            y={innerHeight}
            orient="bottom"
            tickSize={-innerHeight}
            tickPadding={24}
            stroke="gray"
            strokeWidth="2"
            let:tick
            let:format
            let:x
            let:d
          >
            <Tick {x} y={0} let:size let:props>
              <line stroke="#e8e8e8" y2={size} />
              <text {...props} fill="gray" font-family="Brandon Grotesque"
                >{format(tick)}</text
              >
            </Tick>
            <text
              slot="label"
              text-anchor="end"
              x={innerWidth}
              dy="-8"
              font-size="16"
              fill="gray"
              font-family="Brandon Grotesque">Years</text
            >
          </XAxis>

          <YAxis
            scale={yScale}
            tickSize={innerWidth}
            tickPadding={16}
            stroke="gray"
            strokeWidth="2"
            let:y
            let:tick
            let:format
            let:d
          >
            <text
              slot="label"
              dy="-8"
              fonts-size="24"
              fill="gray"
              font-family="Brandon Grotesque"
            >
              % Unemployment
            </text>

            <Tick {y} let:size let:props>
              <line stroke="#e8e8e8" x2={size} />
              <text
                {...props}
                fill="gray"
                alignment-baseline="middle"
                font-size="14pt"
                font-family="Brandon Grotesque">{format(tick)}</text
              >
            </Tick>
          </YAxis>

          <Line
            {data}
            y={yAccessor}
            x={xAccessor}
            stroke="black"
            strokeWidth="1"
          />
        </Declare>

        <div slot="title" style={'font-family:"Brandon Grotesque"'}>
          Bureau of Labor Statistics
        </div>
      </Grafico>
    </Declare>
  </Declare>
</Story>

<Story
  name="Multi-line"
  args={{
    height: 600
  }}
  let:args
>
  <Declare value={(d) => d.date} let:value={accessor}>
    <Grafico
      {...args}
      data={multiLineData}
      let:data
      let:innerWidth
      let:innerHeight
    >
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
          stroke="gray"
          stroke-width="2"
          let:tick
          let:format
          let:x
          let:d
        >
          <Tick {x} y={0} let:size let:props>
            <line stroke="#e8e8e8" y2={size} />
            <text {...props} fill="gray" font-family="Brandon Grotesque"
              >{format(tick)}</text
            >
          </Tick>
          <text
            slot="label"
            text-anchor="end"
            x={innerWidth}
            dy="64"
            font-size="24"
            fill="gray"
            font-family="Brandon Grotesque">Years</text
          >
        </XAxis>
      </ScaleTime>

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
          stroke="gray"
          stroke-width="2"
          let:y
          let:tick
          let:format
          let:d
        >
          <text
            slot="label"
            transform="rotate(90)"
            dy="64"
            fonts-size="24"
            fill="gray"
            font-family="Brandon Grotesque"
          >
            % Unemployment
          </text>

          <Tick {y} let:size let:props>
            <line stroke="#e8e8e8" x2={size} />
            <text
              {...props}
              fill="gray"
              alignment-baseline="middle"
              font-size="14pt"
              font-family="Brandon Grotesque">{format(tick)}</text
            >
          </Tick>
        </YAxis>
      </ScaleLinear>

      <ScaleOrdinal
        domain={['ny', 'sf', 'au']}
        range={schemeCategory10}
        let:scale
      >
        <g>
          <Line
            {data}
            y={(d) => d['New York_1']}
            x={accessor}
            stroke={scale('ny')}
          />
          <Line
            {data}
            y={(d) => d['San Francisco_1']}
            x={accessor}
            stroke={scale('sf')}
          />
          <Line
            {data}
            y={(d) => d['Austin_1']}
            x={accessor}
            stroke={scale('au')}
          />
        </g>
      </ScaleOrdinal>

      <div slot="title" style={'font-family:"Brandon Grotesque"'}>
        Bureau of Labor Statistics
      </div>
    </Grafico>
  </Declare>
</Story>
