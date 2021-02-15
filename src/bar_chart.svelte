<script lang="ts">
  import { XAxis, YAxis, Grid } from './components'
  import Grafico from './grafico.svelte'
  import Bin from './components/bin.svelte'

  export let width: number
  export let height: number
  export let margin
  export let data: any[] = []
  export let groupBy: (d: any) => any
  export let curve
  export let colorRange: readonly string[]

  export let style = {}
</script>

<Grafico
  class="bar"
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
