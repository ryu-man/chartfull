<script>
  import { Grid, Area, XAxis, YAxis } from './components'
  import Grafico from './grafico.svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let groupBy
  export let colorRange

  export let style = {}
</script>

<Grafico
  class="area"
  {width}
  {height}
  {padding}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:entries
  let:colorScale
>
  <slot name="xaxis" slot="xaxis">
    <XAxis position="bottom" />
  </slot>
  <slot name="yaxis" slot="yaxis">
    <YAxis format="~s" />
  </slot>
  <slot name="grid" slot="grid">
    <Grid />
  </slot>
  <slot name="legend" slot="legend" />

  <g>
    {#each entries as entry}
      <slot key={entry[0]} lineData={entry[1]} color={colorScale(entry[0])}>
        <Area
          data={entry[1]}
          style={{ fill: colorScale(entry[0]), stroke: 'none' }}
        />
      </slot>
    {/each}
  </g>
</Grafico>

<style>
</style>
