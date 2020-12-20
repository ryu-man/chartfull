<script lang="ts">
  import { onMount, setContext, tick } from 'svelte'
  import {
    extent,
    group,
    scaleLinear,
    scaleTime,
    scaleOrdinal,
    schemeCategory10
  } from 'd3'
  import { XAxis, YAxis, Grid } from './components'
  import { css } from './utils'
  import type { ScaleLinear } from 'd3'
  import Chartist from './chartist.svelte'
  import { key } from './context.svelte'
  import { writable } from 'svelte/store'
  import Circle from './components/circle.svelte'

  export let width: number
  export let height: number
  export let margin
  export let data: any[] = []
  export let groupBy: (d: any) => any
  export let curve
  export let colorRange: readonly string[]
  export let style = {}
  export let zDomain: any[]
  export let zAccessor: (d: any) => any = () => ''
  export let zRange: [number, number]

  let zScale: ScaleLinear<number, number> = scaleLinear()

  const context = writable({
    zScale
  })
  setContext(key, context)
  
  zDomain = zDomain || extent(data, zAccessor)
  zRange = zRange || [4, innerHeight * 0.1]
  zScale.domain(zDomain).range(zRange)
  
  function init(node: HTMLElement, data: Array<any>) {

    return {
      update(data: Array<any>) {
        zDomain = extent(data, zAccessor)
        zScale.domain(zDomain)

        zScale = zScale
      }
    }
  }
</script>

<Chartist
  class="bubble"
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:samples
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
  
  <g>
    {#each samples as entry}
      {#each entry[1] as item}
        <slot>
          <Circle
            {item}
            r={zScale(zAccessor(item))}
            fill={colorScale(entry[0])} />
        </slot>
      {/each}
    {/each}
  </g>

  
</Chartist>

<style>
  circle {
    mix-blend-mode: multiply;
  }
</style>
