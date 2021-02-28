<script>
  import { setContext } from 'svelte'
  import { extent, scaleLinear } from 'd3'
  import { XAxis, YAxis, Grid } from './components'
  import Grafico from './grafico.svelte'
  import { key } from './context.svelte'
  import { writable } from 'svelte/store'
  import Circle from './components/circle.svelte'
  import AnimatedCircle from './components/animated_circle.svelte'

  export let width
  export let height
  export let padding
  export let groupBy
  export let curve
  export let colorRange
  export let style = {}
  export let data = []

  export let zAccessor = () => ''
  export let zDomain
  export let zRange

  let zScale = scaleLinear()

  const context = writable({
    zScale
  })
  setContext(key, context)

  zDomain = zDomain || extent(data, zAccessor)
  zRange = zRange || [2, innerHeight * 0.1]
  zScale.domain(zDomain).range(zRange)

  function init(node, data) {
    return {
      update(data) {
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
  {padding}
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
