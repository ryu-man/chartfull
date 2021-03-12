<script>
  import { XAxis, YAxis, Legend, Grid, Line } from './components'
  import Grafico from './grafico.svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let groupBy
  export let curve
  export let colorRange
  export let style = {}
</script>

<Grafico
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
    <XAxis />
  </slot>

  <slot name="yaxis" slot="yaxis">
    <YAxis />
  </slot>

  <slot name="grid" slot="grid">
    <Grid />
  </slot>

  <slot name="legend" slot="legend" />

  <slot name="title" slot="title" />

  <g>
    {#each entries as [key, data]}
      <slot {key} {data} color={colorScale(key)}>
        <Line {data} {curve} let:d>
          <path {d} fill="transparent" stroke={colorScale(key)} />
        </Line>
      </slot>
    {/each}
  </g>
</Grafico>
