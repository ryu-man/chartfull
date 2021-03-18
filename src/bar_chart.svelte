<script>
  import { XAxis, YAxis, Grid, Rect } from './components'
  import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
  import { schemeCategory10 } from 'd3-scale-chromatic'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'
  import { writable } from 'svelte/store'
  import { tick } from 'svelte'
  import { stack as Stack } from 'd3-shape'

  export let width
  export let height
  export let padding
  export let data = []
  export let series
  export let groupBy
  export let colorRange
  export let stacked = false
  export let serieColorRange = schemeCategory10
  export let style = {}

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleBand()),
    yScale = writable(scaleLinear()),

    serieColorScale = writable(),
    serieScale = writable(),
    seriesData = writable(series),
  } = graficoContext()

  if (stacked) {
    $seriesData = Stack().keys(series)(data)
  }

  if (series) {
    $serieColorScale = scaleOrdinal()
    $serieScale = scaleBand().padding([0.05])
    $serieScale.padding([0.05])
  }

  $: if (series) {
    $serieColorScale?.domain?.(series)
    $serieColorScale?.range?.(serieColorRange).unknown('#ccc')
  }

  $: series && $serieScale?.domain?.(series)

  $: series &&
    $serieScale?.range?.([
      0,
      $xScale?.bandwidth?.() || $yScale?.bandwidth?.() || 0
    ]) 
</script>

<Context
  value={{
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    serieScale,
    serieColorScale,
    seriesData
  }}
>
  <Grafico
    class="bar"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {colorRange}
    {style}
    let:entries
    let:innerWidth
    let:innerHeight
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

    <slot name="title" slot="title" />

    {#await tick() then value}
      <g>
        {#each (stacked && $seriesData) || data as item, i}
          <slot
            {item}
            {data}
            {innerWidth}
            {innerHeight}
            {i}
            serieScale={$serieScale}
            xScale={$xScale}
            xAccessor={$xAccessor}
            yScale={$yScale}
            yAccessor={$yAccessor}
            bandwidth={$xScale?.bandwidth?.() ?? $yScale?.bandwidth?.()}
          >
            <Rect
              x={$xScale($xAccessor(item))}
              y={0}
              width={$xScale($xAccessor(item)) + xScale.bandwidth()}
              height={innerHeight - $yScale($yAccessor(item))}
              let:x
              let:y
              let:width
              let:height
            >
              <rect {x} {y} {width} {height} />
            </Rect>
          </slot>
        {/each}
      </g>
    {/await}
  </Grafico>
</Context>

<style>
  g :global(rect.hor) {
    transform: rotateX(180deg);
    transform-origin: center;
  }
</style>
