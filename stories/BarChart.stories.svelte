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
  import { backOut } from 'svelte/easing'
  import MarginDecorator from './MarginDecorator.svelte'
  import { onMount } from 'svelte'

  let data = []

  csv('./7_OneCatOneNum_header.csv', (d) => ({
    Country: d['Country'],
    Value: +d.Value
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
                  from={[0, 0, 0]}
                  to={[yScale(xAccessor(item)), xGet(item), yScale.bandwidth()]}
                  damping={0.5}
                  stiffness={0.04}
                  let:value={[y, width, height]}
                >
                  <g transform={`translate(${0},${y})`}>
                    <text dx="-8" dy={yScale.bandwidth() / 2} text-anchor="end"
                      >{xAccessor(item)}</text
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

        <svelte:fragment slot="xaxis">
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
              let:tick
              let:format
              let:x
              let:d
            >
              <Tick {x} y={-6} value={format(tick)} let:tickSize>
                <line y2={tickSize} stroke="#e8e8e8" />
              </Tick>
              <path
                slot="path"
                {d}
                stroke="gray"
                stroke-width="2"
                fill="none"
              />
            </XAxis>
          </ScaleLinear>
        </svelte:fragment>
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
        <ScaleOrdinal
          domain={data.map(xAccessor)}
          range={schemeCategory10}
          let:scale={scaleOrdinal}
        >
          <Ordinal
            T={typeof data}
            x={xAccessor}
            y={(d, a, b) => d.Value}
            let:xGet
            let:yGet
            let:bandwidth
          >
            {#each data as item, i}
              <Rect
                x={xGet(item)}
                y={0}
                width={bandwidth}
                height={innerHeight - yGet(item)}
                optionsHeight={{
                  duration: 600,
                  delay: 100 * i,
                  easing: backOut
                }}
                let:x
                let:y
                let:width
                let:height
              >
                <rect
                  class={item.Country}
                  {x}
                  {y}
                  {width}
                  {height}
                  fill={scaleOrdinal(item.Country)}
                  transform="rotate(180, {x + bandwidth / 2}, {innerHeight /
                    2})"
                />
              </Rect>
            {/each}
          </Ordinal>
        </ScaleOrdinal>

        <svelte:fragment slot="xaxis">
          <ScaleBand
            domain={data.map(xAccessor)}
            range={[innerWidth, 0]}
            padding={0.2}
            let:scale
          >
            <XAxis {scale} tickPadding={8} let:tick let:format let:x let:d>
              <Tick x={x + scale.bandwidth() / 2} value={format(tick)}>
                <line y2={6} stroke="#e8e8e8" />
              </Tick>
              <path
                slot="path"
                {d}
                stroke="gray"
                stroke-width="2"
                fill="none"
              />
            </XAxis>
          </ScaleBand>
        </svelte:fragment>

        <svelte:fragment slot="yaxis">
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
              <Tick {y} value={format(tick)}>
                <line x2={innerWidth} stroke="#e8e8e8" />
              </Tick>
              <path
                {d}
                slot="path"
                stroke="gray"
                stroke-width="2"
                fill="none"
              />
            </YAxis>
          </ScaleLinear>
        </svelte:fragment>
      </Grafico>
    </Declare>
  </MarginDecorator>
</Story>
