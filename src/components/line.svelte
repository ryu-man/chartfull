<script lang="ts">
  import { css } from '../utils'
  import { curveMonotoneX, line } from 'd3'
  import { charterContext } from '../context.svelte'

  const context = charterContext()
  const { xScale, xAccessor, yScale, yAccessor, innerHeight } = charterContext()

  export let data: any[]
  export let curve = curveMonotoneX
  export let style = {}
  let _class: string = ''
  export { _class as class }

  let _line = line() // Creating the line
    .curve(curve)
  let path = 'M 0 0'

  $: _line.x((d) => $xScale($xAccessor(d)))
  $: _line.y((d) => $yScale($yAccessor(d)))
  $: path = _line(data)

  function init(node: SVGPathElement, data: any[]) {
    return {
      update(data: any[]) {
        path = _line(data)
      }
    }
  }
</script>

<path
  use:init={data}
  use:css={style}
  d={path}
  class="{_class} line"
  fill="transparent"
  stroke-width="2px" />

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
    vector-effect: non-scaling-stroke;
    mix-blend-mode: multiply;
  }
</style>
