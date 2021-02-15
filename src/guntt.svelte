<script>
  import { XAxis, YAxis, Grid, Line, Circle } from './components'
  import Grafico from './grafico.svelte'

  export let width = 600
  export let height = 400
  export let margin = { top: 36, right: 36, bottom: 36, left: 100 }
  export let data = []
  export let groupBy = () => ''
  export let radius = 8
  export let connected = false

  export let style = {}
</script>

<Grafico
  class="bubble"
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {style}
  let:entries
  let:colorScale
>
  <slot name="content" slot="content" test={true}>
    <XAxis class="x" position="bottom" />
    <YAxis class="y" format="~s" position="right" />
    <Grid />
  </slot>

  <g>
    {#each entries as entry}
      <g>
        {#if connected}
          <slot name="line" lineData={entry[1]}>
            <Line data={entry[1]} style={{ stroke: colorScale(entry[0]) }} />
          </slot>
        {/if}
        {#each entry[1] as item, i}
          <slot index={i} color={colorScale(groupBy(entry[0]))}>
            <Circle index={i} duration={i * 96} r={radius} />
          </slot>
        {/each}
      </g>
    {/each}
  </g>
</Grafico>

<style>
</style>
