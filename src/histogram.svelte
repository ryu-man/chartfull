<script lang="ts">
  import { writable } from 'svelte/store'
  import { bin, extent, max } from 'd3'
  import { Rect, Grid , XAxis, YAxis} from './components'
  import { updateChartistContext } from './context.svelte'
  import Chartist from './chartist.svelte'

  export let width: number
  export let height: number = 400
  export let margin = {}
  export let data: any[] = []
  export let groupBy: (d: any) => any = () => ''
  export let colorRange: readonly string[]
  export let style = {}
  let type = 'histogram'

  updateChartistContext({
    primaryDomain: (data, accessor) => extent(data, accessor),
    secondaryDomain: (data, accessor) => [
      0,
      max(data.map((d) => d[1]).flat(1), accessor)
    ],
    xAccessor: writable((d) => d.length),
    yAccessor: writable((d) => d.length),
    bins : writable([]),

    map: (entries, scale, accessor, ticks = null) => {
      const _bin = bin()
        .value(accessor)
        .domain(scale.domain())
        .thresholds(scale.ticks(ticks))
      return entries.map((d) => [d[0], _bin(d[1])])
    }
  })
</script>

<Chartist
  class="histogram"
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  {type}
  let:entries
  let:colorScale
  let:innerWidth
  let:innerHeight
  let:xScale
  let:yScale>
  <slot name="content" slot="content">
    <XAxis class="x" position="bottom" />
    <YAxis class="y" format="~s" position="right" />
    <Grid />
  </slot>
  <g>
    {#each entries as entry}
      <g>
        <!-- {@debug bins} -->
        {#each entry[1] as bin}
          <slot
            {entry}
            {colorScale}
            {xScale}
            {yScale}
            {innerHeight}
            {innerWidth}
            {bin}>
            <Rect
              x={xScale(bin.x0)}
              width={Math.max(0, xScale(bin.x1) - xScale(bin.x0))}
              y={yScale(bin.length)}
              height={Math.max(0, innerHeight - yScale(bin.length))}
              fill={colorScale(entry[0])} />
          </slot>
        {/each}
      </g>
    {/each}
  </g>
</Chartist>

<style>
</style>
