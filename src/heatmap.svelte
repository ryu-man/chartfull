<script>
  import { setContext, tick } from 'svelte'
  import { css } from './utils'
  import { scaleOrdinal } from 'd3-scale'
  import { schemeAccent } from 'd3-scale-chromatic'
  import { bin, extent, max, group } from 'd3-array'
  import { XAxis, YAxis, Rect, XTick, YTick } from './components'
  import { fade, fly } from 'svelte/transition'
  import Grafico from './grafico.svelte'
  import Grid from './components/grid/grid.svelte'
  import { key } from './context.svelte'
  import Bin from './components/bin.svelte'
  import { writable } from 'svelte/store'

  export let width = 600
  export let height = 400
  export let padding = {}
  export let data = []

  export let colorAccessor = () => ''

  export let colorDomain = [1, 100]
  export let colorRange = ['white', '#69b3a2']
  export let style = {}

  let colorScale
</script>

<Grafico
  class="heat"
  {width}
  {height}
  {padding}
  {data}
  {colorRange}
  {style}
  let:entries
  let:colorScale
>
  <slot name="xaxis" slot="xaxis">
    <XAxis position="bottom" />
  </slot>
  <slot name="yaxis" slot="yaxis">
    <YAxis position="right" />
  </slot>
  <slot name="grid" slot="grid">
    <Grid />
  </slot>
  <slot name="legend" slot="legend" />

  <g>
    {#each data as item, i}
      <slot>
        <Bin
          {item}
          style={{
            fill: colorScale(colorAccessor(item)),
            stroke: '#fff',
            strokeWidth: '2px'
          }}
        />
      </slot>
    {/each}
  </g>
</Grafico>

<!-- <div class="heatmap charter" use:init="{data}">
  {#await tick() then value}
    <Chartist>
      {#await tick() then value}
        
      {/await}
      <div slot="content">
        <Grid />
        <XAxis
          class="x"
          style="{{ width: '100%', top: '100%', padding: '1% 0 0 0',transform: `translateX(${xScale.bandwidth() / 2}px)` }}"
        />
        <YAxis
          class="y"
          format="~s"
          style="{{ height: '100%', right: '100%', padding: '0 1% 0 0', transform: `translateY(${yScale.bandwidth() / 2}px)` }}"
        />
      </div>
    </Chartist>
  {/await}
</div> -->
<style>
  .heatmap {
    overflow: hidden;
  }
  .charter {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    position: relative;
  }
</style>
