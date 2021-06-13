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
    Tick,
    Bar,
    Rect,
    ScaleBand
  } from '../src'
  import Spring from '../src/components/Spring.svelte'

  import { csv, extent, schemeCategory10, max } from 'd3'
  import { backOut } from 'svelte/easing'
  import MarginDecorator from './MarginDecorator.svelte'

  let data = []

  csv('./7_OneCatOneNum_header.csv', (d) => ({
    Country: d['Country'],
    Value: +d.Value
  })).then((res) => (data = res))

</script>

<Meta
  title="Elements/Bar chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Template let:args>
  <MarginDecorator>
    {#if args.horizontal}
      <Declare value={(d) => d.Country} let:value={xAccessor}>
        <Grafico {...args} {data} let:innerWidth let:innerHeight>
          <ScaleOrdinal
            domain={data.map(xAccessor)}
            range={schemeCategory10}
            let:scale
          >
            <Bar
              T={data}
              x={(d, a, b) => d.Value}
              y={xAccessor}
              let:xGet
              let:yGet
              let:bandwidth
            >
              {#each data as item, i}
                <Spring
                  from={0}
                  to={xGet(item)}
                  damping={0.3}
                  stiffness={0.06}
                  let:value={width}
                >
                  <rect
                    x={0}
                    y={yGet(item)}
                    {width}
                    height={bandwidth}
                    fill={scale(item.Country)}
                  />
                </Spring>
              {/each}
            </Bar>
          </ScaleOrdinal>

          <svelte:fragment slot="xaxis">
            <ScaleLinear
              domain={[0, max(data, (d) => +d.Value)]}
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

          <svelte:fragment slot="yaxis">
            <ScaleBand
              domain={data.map(xAccessor)}
              range={[innerHeight, 0]}
              padding={0.2}
              let:scale
            >
              <YAxis
                {scale}
                tickPadding={8}
                let:tick
                let:format
                let:y
                let:d
                let:tickSize
              >
                <Tick y={y + scale.bandwidth() / 2} value={format(tick)}>
                  <line x2={tickSize} stroke="#e8e8e8" />
                </Tick>
                <path
                  slot="path"
                  {d}
                  stroke="gray"
                  stroke-width="2"
                  fill="none"
                />
              </YAxis>
            </ScaleBand>
          </svelte:fragment>
        </Grafico>
      </Declare>
    {:else}
      <Declare value={(d) => d.Country} let:value={xAccessor}>
        <Grafico {...args} {data} let:innerWidth let:innerHeight>
          <ScaleOrdinal
            domain={data.map(xAccessor)}
            range={schemeCategory10}
            let:scale
          >
            <Bar
              T={data}
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
                    fill={scale(item.Country)}
                    transform="rotate(180, {x + bandwidth / 2}, {innerHeight /
                      2})"
                  />
                </Rect>
              {/each}
            </Bar>
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
                  slot="path"
                  {d}
                  stroke="gray"
                  stroke-width="2"
                  fill="none"
                />
              </YAxis>
            </ScaleLinear>
          </svelte:fragment>
        </Grafico>
      </Declare>
    {/if}
  </MarginDecorator>
</Template>

<Story
  name="Horizontal"
  args={{
    height: 600,
    horizontal: true
  }}
/>

<Story
  name="Vertical"
  args={{
    height: 600,
    padding: { bottom: 0, left: 48, top: 0, right: 0 }
  }}
/>
