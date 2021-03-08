<script>
  import { scaleLinear } from 'd3-scale'
  import { extent } from 'd3-array'
  import { XAxis, YAxis, Grid, Circle } from './components'
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
    zScale = writable(scaleLinear())
  } = graficoContext()

  zDomain = zDomain || extent(data, zAccessor)
  zRange = zRange || [2, innerHeight * 0.1]
  // $zScale = $zScale.domain(zDomain).range(zRange)

  $: {
    zDomain = extent(data, zAccessor)
    $zScale = $zScale.domain(zDomain)
  }
  $: {
    zRange = zRange || [2, innerHeight * 0.1]
    $zScale = $zScale.range(zRange)
  }
</script>

<Context value={{ xAccessor, yAccessor, xScale, yScale, zScale }}>
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
      <XAxis position="bottom" />
    </slot>
    <slot name="yaxis" slot="yaxis">
      <YAxis />
    </slot>
    <slot name="grid" slot="grid">
      <Grid />
    </slot>
    <slot name="legend" slot="legend" />

    <g>
      {#each entries as [key, data]}
        {#each data as item}
          <slot {key} {data} color={colorScale(key)}>
            <Circle
              {item}
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
