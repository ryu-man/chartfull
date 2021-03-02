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
  <g>
    {#each entries as [key, data]}
      <slot {key} {data} color={colorScale(key)}>
        <Line class={key} {data} {curve} style={{ stroke: colorScale(key) }} />
      </slot>
    {/each}
  </g>

  <slot name="content" slot="content">
    <XAxis class="x" position="bottom" />
    <YAxis class="y" format="~s" position="right" />
    <Grid />
    <!-- {#if keys.length > 1}
          <Legend right="1vw" top="1vw" />
        {/if} -->
  </slot>
</Grafico>
