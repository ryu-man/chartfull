<script lang="ts">
  import type { CurveFactory } from 'd3'
  import { XAxis, YAxis, Legend, Grid, Line } from './components'
  import Chartist from './chartist.svelte'

  export let width: number
  export let height: number
  export let margin 
  export let data: any[] = []
  export let groupBy: (d: any) => any
  export let curve: CurveFactory
  export let colorRange: readonly string[]

  export let style = {}

  /* let innerWidth: number
  let innerHeight: number

  let _margin = { top: 32, right: 32, bottom: 72, left: 72, ...margin }

  let colorScale: ScaleOrdinal<string, string>

  let grouped: Map<string, any[]>

  let keys: string[]

  const context = writable({
    colorScale,
    width,
    height,
    innerWidth,
    innerHeight,
    ticks,
    margin: _margin,
    keys,
    data
  })
  setContext(key, context)

  $: console.log($context.xAccessor)

  function init(node: HTMLElement, data: any[]) {
    css(node, style)
    // data = data.sort((a, b) => xAccessor(a) - xAccessor(b))

    grouped = group(data, groupBy)
    keys = Array.from(grouped.keys())
    width = node.offsetWidth
    innerWidth = width - _margin.left - _margin.right
    innerHeight = height - _margin.top - _margin.bottom

    colorScale = scaleOrdinal<string>().domain(keys).range(colorRange)

    $context.width = width
    $context.innerWidth = innerWidth
    $context.innerHeight = innerHeight
    $context.keys = keys
    $context.colorScale = colorScale

    return {
      update(data: any[]) {
        grouped = group(data, groupBy)
        keys = Array.from(grouped.keys())
        width = node.offsetWidth

        colorScale.domain(keys)
      }
    }
  } */
</script>

<Chartist
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:samples
  let:colorScale>
  <g>
    {#each samples as entry}
      <slot>
        <Line
          class={entry[0]}
          data={entry[1]}
          {curve}
          style={{ stroke: colorScale(entry[0]) }} />
      </slot>
    {/each}
  </g>

  <slot name="content" slot="content" test={true}>
    <XAxis class="x" position="bottom" />
    <YAxis
      class="y"
      format="~s"
      position="right" />
    <Grid />
    <!-- {#if keys.length > 1}
          <Legend right="1vw" top="1vw" />
        {/if} -->
  </slot>
</Chartist>

<style>
  .charter {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    position: relative;
  }
</style>
