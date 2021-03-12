<script>
  import { writable } from 'svelte/store'
  import { scaleLinear } from 'd3-scale'
  import { XAxis, YAxis, Grid, Line } from './components'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'

  export let width = 600
  export let height = 400
  export let padding
  export let data = []
  export let groupBy = () => ''
  export let style = {}

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleLinear()),
    yScale = writable(scaleLinear())
  } = graficoContext()
</script>

<Context value={{ xAccessor, yAccessor, xScale, yScale }}>
  <Grafico
    class="scatter"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {style}
    let:entries
    let:colorScale
  >
    <slot name="xaxis" slot="xaxis">
      <XAxis scale={$xScale} />
    </slot>

    <slot name="yaxis" slot="yaxis">
      <YAxis scale={$yScale} />
    </slot>

    <slot name="grid" slot="grid">
      <Grid />
    </slot>

    <slot name="legend" slot="legend" />

    <slot name="title" slot="title" />

    <g>
      {#each entries as [key, data]}
        <g>
          <slot name="line" />
          {#each data as item, i}
            <slot
              {key}
              {data}
              {item}
              index={i}
              color={colorScale(key)}
              xScale={$xScale}
              xAccessor={$xAccessor}
              yScale={$yScale}
              yAccessor={$yAccessor}
            >
              <circle
                cx={$xScale($xAccessor(item))}
                cy={$yScale($yAccessor(item))}
                r={4}
                fill={colorScale(key)}
              />
            </slot>
          {/each}
        </g>
      {/each}
    </g>
  </Grafico>
</Context>

<style>
</style>
