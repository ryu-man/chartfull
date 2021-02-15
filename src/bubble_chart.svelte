<script lang="ts">
  import { setContext } from 'svelte'
  import { extent, scaleLinear } from 'd3'
  import { XAxis, YAxis, Grid } from './components'
  import type { ScaleLinear } from 'd3'
  import Grafico from './grafico.svelte'
  import { key } from './context.svelte'
  import { writable } from 'svelte/store'
  import Circle from './components/circle.svelte'
  import AnimatedCircle from './components/animated_circle.svelte'

  export let width: number
  export let height: number
  export let margin
  export let groupBy: (d: any) => any
  export let curve
  export let colorRange: readonly string[]
  export let style = {}
  export let data: any[] = []

  export let zAccessor: (d: any) => any = () => ''
  export let zDomain: any[]
  export let zRange: [number, number]

  let zScale: ScaleLinear<number, number> = scaleLinear()

  const context = writable({
    zScale
  })
  setContext(key, context)

  zDomain = zDomain || extent(data, zAccessor)
  zRange = zRange || [2, innerHeight * 0.1]
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

<Grafico
  class="bubble"
  {width}
  {height}
  {margin}
  {data}
  {groupBy}
  {colorRange}
  {style}
  let:entries
  let:colorScale
>
  <slot name="content" slot="content">
    <XAxis position="bottom" />
    <YAxis format="~s" position="right" />
    <Grid />
    <!-- {#if keys.length > 1}
          <Legend right="1vw" top="1vw" />
        {/if} -->
  </slot>

  <g>
    {#each entries as entry}
      {#each entry[1] as item}
        <slot>
          <AnimatedCircle
            {item}
            r={zScale(zAccessor(item))}
            fill={colorScale(entry[0])}
          />
        </slot>
      {/each}
    {/each}
  </g>
</Grafico>

<style>
  circle {
    mix-blend-mode: multiply;
  }
</style>
