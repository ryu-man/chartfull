<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { Grafico, XAxis, YAxis, Tick } from 'graficos'
  import { csv, scaleBand, scaleLinear, scaleOrdinal, max, stack } from 'd3'

  const dataConverter = (d) => ({
    group: d.group,
    nitrogen: +d.nitrogen,
    normal: +d.normal,
    stress: +d.stress
  })
  csv('./data_stacked.csv', dataConverter).then((_) => (data = _))

  let data = []

  let innerWidth
  let innerHeight

  const keys = ['nitrogen', 'normal', 'stress']
  const xAccessor = (d) => d.group
  const nitrogenAccessor = (d) => d.nitrogen
  const normalAccessor = (d) => d.normal
  const stressAccessor = (d) => d.stress

  $: xScale = scaleBand(data.map(xAccessor), [0, innerWidth]).padding(0.1)
  $: yScale = scaleLinear(
    [
      0,
      max(
        data.map(
          (d) => nitrogenAccessor(d) + normalAccessor(d) + stressAccessor(d)
        )
      )
    ],
    [innerHeight, 0]
  )
  $: colorScale = scaleOrdinal(keys, ['#e41a1c', '#377eb8', '#4daf4a'])
  $: stacked = stack().keys(keys)(data)

  $: xGet = (d) => xScale(xAccessor(d))
  $: y0Get = (d) => yScale(d[0])
  $: y1Get = (d) => yScale(d[1])
</script>

<Meta
  title="Charts/Stacked bars"
  component={Grafico}
  subcomponents={{ XAxis, YAxis }}
/>

<Story
  name="Stacked bars"
  args={{
    height: 0,
    padding: {
      left: 48,
      top: 24,
      right: 24,
      bottom: 24
    }
  }}
  let:args
>
  <Grafico bind:innerWidth bind:innerHeight {...args}>
    <XAxis scale={xScale} y={innerHeight} orient="bottom" />
    <YAxis scale={yScale} tickSize={-innerWidth} />

    {#each stacked as serie}
      <g class="stacked-serie {serie.key}" fill={colorScale(serie.key)}>
        {#each serie as item}
          <rect
            x={xGet(item.data)}
            y={y1Get(item)}
            height={y0Get(item) - y1Get(item)}
            width={xScale.bandwidth()}
          />
        {/each}
      </g>
    {/each}
  </Grafico>
</Story>
