<script>
  import { XAxis, YAxis } from './components'
  import Grafico from './grafico.svelte'
  import Context, { graficoContext } from './context.svelte'
  import { writable } from 'svelte/store'
  import { scaleBand, scaleLinear } from 'd3-scale'

  export let width = 600
  export let height = 400
  export let padding = {}
  export let data = []
  export let colorAccessor = () => ''
  export let colorDomain = [1, 100]
  export let colorRange = ['white', '#69b3a2']
  export let style = {}

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleBand()),
    yScale = writable(scaleBand()),
    colorScale = writable(scaleLinear())
  } = graficoContext()

  $: $colorScale.domain(colorDomain).range(colorRange),
    ($colorScale = $colorScale)
</script>

<Context value={{ xAccessor, yAccessor, xScale, yScale }}>
  <Grafico
    class="heat"
    {width}
    {height}
    {padding}
    {data}
    {colorRange}
    {style}
  >
    <slot name="xaxis" slot="xaxis">
      <XAxis scale={$xScale} />
    </slot>
    <slot name="yaxis" slot="yaxis">
      <YAxis scale={$yScale} />
    </slot>
    <slot name="grid" slot="grid">
      <!-- <Grid /> -->
    </slot>
    <slot name="legend" slot="legend" />

    <g>
      {#each data as item, i}
        <slot
          x={$xScale($xAccessor(item))}
          y={$yScale($yAccessor(item))}
          xBandwidth={$xScale.bandwidth()}
          yBandwidth={$yScale.bandwidth()}
          color={$colorScale(colorAccessor(item))}
        >
          <rect
            x={$xScale($xAccessor(item))}
            y={$yScale($yAccessor(item))}
            width={$xScale.bandwidth()}
            height={$yScale.bandwidth()}
            fill={$colorScale(colorAccessor(item))}
          />
        </slot>
      {/each}
    </g>
  </Grafico>
</Context>

<style>
</style>
