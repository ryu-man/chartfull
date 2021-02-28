<script>
  import { XAxis, YAxis, Grid } from './components'
  import Grafico from './grafico.svelte'
  import Bin from './components/bin.svelte'

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
  class="bar"
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
  <slot name="content" slot="content" test={true}>
    <XAxis class="x" position="bottom" />
    <YAxis class="y" format="~s" position="right" />
    <Grid />
    <!-- {#if keys.length > 1}
          <Legend right="1vw" top="1vw" />
        {/if} -->
  </slot>
  {#each entries as entry}
    <slot>
      <g>
        {#each entry[1] as item}
          <Bin {item} />
        {/each}
      </g>
    </slot>
  {/each}
</Grafico>

<style>
</style>
