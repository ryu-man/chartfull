<script>
  import { XAxis, YAxis, Legend, Grid, Line } from './components'
  import Chartist from './chartist.svelte'

  export let width
  export let height
  export let margin
  export let data = []
  export let groupBy
  export let curve
  export let colorRange
  export let style = {}
</script>

<Chartist
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:entries
  let:colorScale>
  <g>
    {#each entries as entry}
      <slot {entry}>
        <Line
          class={entry[0]}
          data={entry[1]}
          {curve}
          style={{ stroke: colorScale(entry[0]) }} />
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
</Chartist>
