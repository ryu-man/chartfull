<script>
  import { Grid, Area, XAxis, YAxis } from './components'
  import Grafico from './grafico.svelte'

  export let width
  export let height
  export let margin
  export let data = []
  export let groupBy
  export let colorRange

  export let style = {}
</script>

<Grafico
  class="area"
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:entries
  let:colorScale>
  <slot name="content" slot="content" test={true}>
    <XAxis class="x" position="bottom" />
    <YAxis
      class="y"
      format="~s"
      position="right" />
    <Grid />
  </slot>

  <g>
    {#each entries as entry}
      <slot key={entry[0]} lineData={entry[1]} color={colorScale(entry[0])}>
        <Area
          data={entry[1]}
          style={{ fill: colorScale(entry[0]), stroke: 'none' }} />
      </slot>
    {/each}
  </g>
</Grafico>

<style>
</style>
