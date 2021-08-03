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
    Bubble,
    Area,
    ScaleOrdinal
  } from '../src'
  import { csv, extent, max, schemeAccent, schemeCategory10 } from 'd3'

  let data = []

  csv(
    './4_ThreeNum.csv',
    ({ country, continent, lifeExp, pop, gdpPercap }) => ({
      country,
      continent,
      lifeExp: +lifeExp,
      pop: +pop,
      gdpPercap: +gdpPercap
    })
  ).then((res) => (data = res))

  const [xAcc, yAcc, zAcc] = [
    (d) => d.gdpPercap,
    (d) => +d.lifeExp,
    (d) => d.pop
  ]
</script>

<Meta
  title="Elements/Bubble chart"
  component={Grafico}
  argTypes={{
    height: { control: { type: 'number' } },
    xScale: { control: { type: 'object' } },
    yScale: { control: { type: 'object' } }
  }}
/>

<Story
  name="Normal"
  args={{
    height: 600,
    xScale: {},
    yScale: {}
  }}
  let:args
>
  <Grafico {...args} {data} let:innerWidth let:innerHeight>
    <ScaleLinear
      domain={extent(data, xAcc)}
      range={[0, innerWidth]}
      {...args.xScale}
      let:scale
    >
      <XAxis
        {scale}
        tickPadding={16}
        tickSize={-innerHeight}
      />
    </ScaleLinear>

    <ScaleLinear
      domain={[0, max(data, yAcc)]}
      range={[innerHeight, 0]}
      {...args.yScale}
      let:scale
    >
      <YAxis {scale} tickPadding={8} />
    </ScaleLinear>

    <Bubble
      x={xAcc}
      y={yAcc}
      z={zAcc}
      domain={[200000, 1310000000]}
      range={[4, 40]}
      let:xGet
      let:yGet
      let:zGet
    >
      {#each data as item}
        <circle cx={xGet(item)} cy={yGet(item)} r={zGet(item)} />
      {/each}
    </Bubble>
  </Grafico>
</Story>

<Story
  name="Multi-color"
  args={{
    height: 600,
    xScale: {},
    yScale: {}
  }}
  let:args
>
  <Grafico {...args} {data} let:innerWidth let:innerHeight>
    <ScaleLinear
      domain={extent(data, xAcc)}
      range={[0, innerWidth]}
      {...args.xScale}
      let:scale
    >
      <XAxis
        {scale}
        tickPadding={16}
        tickSize={-innerHeight}
      />
    </ScaleLinear>

    <ScaleLinear
      domain={[0, max(data, yAcc)]}
      range={[innerHeight, 0]}
      {...args.yScale}
      let:scale
    >
      <YAxis {scale} tickPadding={8} />
    </ScaleLinear>

    <ScaleOrdinal
      domain={data.map((d) => d.country)}
      range={schemeAccent}
      let:scale={colorize}
    >
      <Bubble
        x={xAcc}
        y={yAcc}
        z={zAcc}
        domain={[200000, 1310000000]}
        range={[4, 40]}
        let:xGet
        let:yGet
        let:zGet
      >
        {#each data as item}
          <circle
            cx={xGet(item)}
            cy={yGet(item)}
            r={zGet(item)}
            fill={colorize(item.country)}
            style='mix-blend-mode: difference;'
          />
        {/each}
      </Bubble>
    </ScaleOrdinal>
  </Grafico>
</Story>
