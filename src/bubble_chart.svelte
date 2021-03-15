<script>
  import { scaleLinear } from 'd3-scale'
  import { extent } from 'd3-array'
  import { XAxis, YAxis, Grid } from './components'
  import Grafico from './grafico.svelte'
  import Context, { graficoContext, key } from './context.svelte'
  import { writable } from 'svelte/store'

  export let width
  export let height
  export let padding
  export let groupBy
  export let colorRange
  export let style = {}
  export let data = []

  export let zAccessor = () => ''
  export let zDomain
  export let zRange

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleLinear()),
    yScale = writable(scaleLinear()),
    zScale = writable(scaleLinear()),
    innerWidth = writable(48),
    innerHeight = writable(48)
  } = graficoContext()

  $: $zScale.domain(zDomain || extent(data, zAccessor)), ($zScale = $zScale)

  $: $zScale.range(zRange || [0, $innerHeight * 0.1]), ($zScale = $zScale)

  $: $xScale.range([0, $innerWidth]), ($xScale = $xScale)
</script>

<Context
  value={{
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    zScale,
    innerWidth,
    innerHeight
  }}
>
  <Grafico
    class="bubble"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {colorRange}
    {style}
    updateOnResize
    let:entries
    let:colorScale
  >
    <slot name="xaxis" slot="xaxis">
      <XAxis scale={$xScale} accessor={$xAccessor} />
    </slot>

    <slot name="yaxis" slot="yaxis">
      <YAxis scale={$yScale} accessor={$yAccessor} />
    </slot>

    <slot name="grid" slot="grid">
      <Grid />
    </slot>

    <slot name="legend" slot="legend" />

    <slot name="title" slot="title" />

    <g>
      {#each entries as [key, data], i}
        {#each data as item, j}
          <slot
            {key}
            {data}
            {item}
            {i}
            {j}
            color={colorScale(key)}
            xScale={$xScale}
            xAccessor={$xAccessor}
            yScale={$yScale}
            yAccessor={$yAccessor}
            zScale={$zScale}
            {zAccessor}
          >
            <circle
              cx={$xScale($xAccessor(item))}
              cy={$yScale($yAccessor(item))}
              r={$zScale(zAccessor(item))}
              fill={colorScale(key)}
            />
          </slot>
        {/each}
      {/each}
    </g>
  </Grafico>
</Context>

<style>
</style>
