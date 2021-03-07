<script>
  import { XAxis, YAxis, Grid, Rect } from './components'
  import { scaleBand, scaleLinear } from './scales'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'
  import { writable } from 'svelte/store'
  import { tick } from 'svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let groupBy
  export let curve
  export let colorRange

  export let style = {}

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleBand()),
    yScale = writable(scaleLinear())
  } = graficoContext()
</script>

<Context value={{ xAccessor, yAccessor, xScale, yScale }}>
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
    <slot name="content" slot="content" test={true}>
      <XAxis class="x" position="bottom" />
      <YAxis class="y" format="~s" position="right" />
      <Grid />
      <!-- {#if keys.length > 1}
            <Legend right="1vw" top="1vw" />
          {/if} -->
    </slot>
    {#await tick() then value}
      {#each entries as [key, data]}
        <g>
          {#each data as item}
            <slot {key} {data} {item} {innerWidth} {innerHeight} xAccessor={$xAccessor} yAccessor={$yAccessor}>
              <Rect
                x1={$xAccessor(item)}
                x2={$xAccessor(item)}
                y1={$yAccessor(item)}
                let:x
                let:y
                let:width
                let:height
              >
                <rect
                  {x}
                  {y}
                  width={width}
                  height={height}
                />
              </Rect>
            </slot>
          {/each}
        </g>
      {/each}
    {/await}
  </Grafico>
</Context>

<style>
</style>
