<script>
  import { css } from '../utils'
  import { curveMonotoneX, line } from 'd3'
  import { chartistContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = chartistContext()

  export let data = []
  export let curve = curveMonotoneX
  export let style = {}
  let _class = ''
  export { _class as class }

  let _line = line() // Creating the line
    .x((d) => $xScale($xAccessor(d)))
    .y((d) => $yScale($yAccessor(d)))
    .curve(curve)
  let path = 'M 0 0'

  $: path = _line(data)
</script>

<path
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
