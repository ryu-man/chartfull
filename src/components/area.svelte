<script>
  import { tweened } from 'svelte/motion'
  import { area, curveMonotoneX } from 'd3'
  import { interpolatePath } from 'd3-interpolate-path'
  import { css } from '../utils'
  import { graficoContext } from '../context.svelte'

  export let data
  export let delay = 0
  export let duration = 300
  export let interpolate = interpolatePath
  export let curve = curveMonotoneX
  export let style = {}

  const {
    xScale,
    yScale,
    xAccessor,
    yAccessor,
    colorScale,
    innerHeight
  } = graficoContext()

  const _area = area()
    .x((d) => $xScale($xAccessor(d)))
    .y0($innerHeight)
    .y1((d) => $yScale($yAccessor(d)))
    .curve(curve)
  $: path = _area(data)

  function init(node, data) {
    css(node, style)
    return {
      update(data) {
        path = _area(data)
      }
    }
  }
</script>

<path
  use:init={data}
  d={path}
  class="area-data"
  fill="transparent"
  stroke="black"
  stroke-width="2px"
/>

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
</style>
