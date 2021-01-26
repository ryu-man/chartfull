<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { area, curveMonotoneX } from 'd3'
  import { interpolatePath } from 'd3-interpolate-path'
  import { css } from '../utils'
  import type { CurveFactory } from 'd3'
  import { chartistContext } from '../context.svelte'

  export let data: any[]
  export let delay: number = 0
  export let duration: number = 300
  export let interpolate: (
    a: string,
    b: string
  ) => (t: number) => string = interpolatePath
  export let curve: CurveFactory = curveMonotoneX
  export let style = {}

  const {
    xScale,
    yScale,
    xAccessor,
    yAccessor,
    colorScale,
    innerHeight
  } = chartistContext()

  const _area = area()
    .x((d) => $xScale($xAccessor(d)))
    .y0($innerHeight)
    .y1((d) => $yScale($yAccessor(d)))
    .curve(curve)
  $: path = _area(data)

  function init(node: SVGPathElement, data: any[]) {
    css(node, style)
    return {
      update(data: any[]) {
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
  stroke-width="2px" />

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
</style>
