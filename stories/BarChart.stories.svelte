<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import {
    Grafico,
    Declare,
    ScaleOrdinal,
    XAxis,
    YAxis,
    ScaleLinear,
    Tick,
    Ordinal,
    Rect,
    ScaleBand
  } from '../src'
  import Spring from '../src/components/Spring.svelte'

  import { csv, schemeCategory10, max } from 'd3'
  import MarginDecorator from './MarginDecorator.svelte'
  import { onMount } from 'svelte'

  let data = []

  csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
    Country,
    Value: +Value
  })).then((res) => (data = res))

  let samples = []

  onMount(() => {
    const interval = setInterval(() => {
      if (samples.length < data.length) {
        const [d] = data.slice(samples.length, data.length)
        samples = [...samples, d]
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  })
</script>

<Meta
  title="Elements/Bar chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Story
  name="Horizontal"
  args={{
    height: 600,
    horizontal: true
  }}
  let:args
>
  <MarginDecorator>
    <Declare value={(d) => d.Country} let:value={xAccessor}>
      <Grafico {...args} data={samples} let:innerWidth let:innerHeight>
        <ScaleLinear
          domain={[0, max(samples, (d) => +d.Value)]}
          range={[0, innerWidth]}
          let:scale
        >
          <XAxis
            {scale}
            orient="top"
            tickPadding={16}
            tickSize={innerHeight - 6}
            stroke="gray"
            stroke-width="2"
            let:tick
            let:format
            let:x
            let:d
          >
            <Tick {x} y={-6} y2={innerHeight} stroke="#e8e8e8" let:props>
              <text
                text-anchor="middle"
                fonts-size="24"
                fill="gray"
                font-family="Brandon Grotesque"
                {...props}>{format(tick)}</text
              >
            </Tick>
          </XAxis>
        </ScaleLinear>

        <ScaleOrdinal
          domain={samples.map(xAccessor)}
          range={schemeCategory10}
          let:scale={scaleOrdinale}
        >
          <ScaleBand
            domain={samples.map(xAccessor)}
            range={[innerHeight, 0]}
            padding={0.2}
            let:scale={yScale}
          >
            <Ordinal
              T={typeof samples}
              x={(d, a, b) => d.Value}
              y={xAccessor}
              let:xGet
              let:yGet
              let:bandwidth
            >
              {#each samples as item, i (i)}
                <Spring
                  from={[0, 0, 0, 0]}
                  to={[
                    yScale(xAccessor(item)),
                    xGet(item),
                    yScale.bandwidth(),
                    1
                  ]}
                  damping={0.5}
                  stiffness={0.04}
                  let:value={[y, width, height, opacity]}
                >
                  <g transform={`translate(${0},${y})`}>
                    <text
                      dx={72 * (1 - opacity) - 16}
                      dy={yScale.bandwidth() / 2}
                      {opacity}
                      text-anchor="end"
                      fonts-size="24"
                      fill="gray"
                      font-family="Brandon Grotesque">{xAccessor(item)}</text
                    >
                    <rect
                      {width}
                      {height}
                      fill={scaleOrdinale(xAccessor(item))}
                    />
                  </g>
                </Spring>
              {/each}
            </Ordinal>
          </ScaleBand>
        </ScaleOrdinal>
      </Grafico>
    </Declare>
  </MarginDecorator>
</Story>

<Story
  name="Vertical"
  args={{
    height: 600,
    padding: { bottom: 0, left: 48, top: 0, right: 0 }
  }}
  let:args
>
  <MarginDecorator>
    <Declare value={(d) => d.Country} let:value={xAccessor}>
      <Grafico {...args} data={samples} let:innerWidth let:innerHeight>
        <ScaleBand
          domain={data.map(xAccessor)}
          range={[innerWidth, 0]}
          padding={0.2}
          let:scale
        >
          <XAxis {scale} tickPadding={8} let:tick let:x let:d>
            <Tick {x} let:props>
              <line y2={6} stroke="#e8e8e8" />
              <text
                dx={scale.bandwidth() / 2}
                fonts-size="24"
                fill="gray"
                font-family="Brandon Grotesque"
                {...props}>{tick}</text
              >
            </Tick>
            <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
          </XAxis>
        </ScaleBand>

        <ScaleLinear
          domain={[0, max(data, (d) => +d.Value)]}
          range={[innerHeight, 0]}
          let:scale
        >
          <YAxis
            {scale}
            orient="left"
            tickPadding={16}
            tickSize={innerWidth}
            let:tick
            let:format
            let:y
            let:d
          >
            <Tick {y} let:props>
              <line x2={innerWidth} stroke="#e8e8e8" />
              <text
                fonts-size="24"
                fill="gray"
                font-family="Brandon Grotesque"
                {...props}>{format(tick)}</text
              >
            </Tick>
            <path {d} slot="path" stroke="gray" stroke-width="2" fill="none" />
          </YAxis>
        </ScaleLinear>

        <ScaleOrdinal
          domain={data.map(xAccessor)}
          range={schemeCategory10}
          let:scale={scaleOrdinal}
        >
          <Ordinal
            T={typeof data}
            x={xAccessor}
            y={(d) => d.Value}
            let:xGet
            let:yGet
            let:bandwidth
            let:xScale
          >
            {#each data as item, i}
              <rect
                class={item.Country}
                x={0}
                y={yGet(item)}
                width={bandwidth}
                height={innerHeight - yGet(item)}
                fill={scaleOrdinal(item.Country)}
                transform={`translate(${xGet(item)},${0})`}
              />
            {/each}
          </Ordinal>
        </ScaleOrdinal>
      </Grafico>
    </Declare>
  </MarginDecorator>
</Story>
