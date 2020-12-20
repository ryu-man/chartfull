<script lang="ts">
  import { Grid, Area, XAxis, YAxis } from './components'
  import Chartist from './chartist.svelte'

  export let width: number
  export let height: number
  export let margin
  export let data: any[] = []
  export let groupBy: (d: any) => any
  export let colorRange: readonly string[]

  export let style = {}
</script>

<Chartist
  class="area"
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:samples
  let:colorScale>
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

  <g>
    {#each samples as entry}
      <slot key={entry[0]} lineData={entry[1]} color={colorScale(entry[0])}>
        <Area
          data={entry[1]}
          style={{ fill: colorScale(entry[0]), stroke: 'none' }} />
      </slot>
    {/each}
  </g>
</Chartist>

<style>
</style>
