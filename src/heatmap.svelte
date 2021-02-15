<script lang="ts">
  import type { ScaleLinear, ScaleBand } from 'd3'
  import { setContext, tick } from 'svelte'
  import { css } from './utils'
  import { scaleBand, scaleLinear } from 'd3'
  import { XAxis, YAxis, Rect, XTick, YTick } from './components'
  import { fade, fly } from 'svelte/transition'
  import Grafico from './grafico.svelte'
  import Grid from './components/grid/grid.svelte'
  import { key } from './context.svelte'
  import Bin from './components/bin.svelte'
  import { writable } from 'svelte/store'

  export let width: number = 600
  export let height: number = 400
  export let margin = {}
  export let data: Array<any> = []
  
  export let colorAccessor: (d: any) => any = () => ''

  export let colorDomain: [number, number] = [1, 100]
  export let colorRange: [any, any] = ['white', '#69b3a2']
  export let style = {}

 
  let colorScale: ScaleLinear<number, number>

</script>

<Grafico
  class="heat"
  {width}
  {height}
  {margin}
  {data}
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
    {#each data as item, i}
      <slot>
        <Bin
          item="{item}"
          style="{{ fill: colorScale(colorAccessor(item)), stroke: '#fff', strokeWidth: '2px' }}"
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
