<script>
  import { css } from '../utils'
  import { curveMonotoneX, line } from 'd3'
  import { graficoContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = graficoContext()

  export let values = []
  export let curve = curveMonotoneX
  export let style = {}
  let _class = ''
  export { _class as class }

  const _line = line() // Creating the line
    .x(x)
    .y(y)
    .curve(curve)

  let path = ''

  $: path = _line(values)

  function x(d) {
    return $xScale($xAccessor(d))
  }
  function y(d) {
    return $yScale($yAccessor(d))
  }
</script>

<path
  use:css={style}
  d={path}
  class="{_class} line"
  fill="transparent"
  stroke-width="2px"
/>

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
    vector-effect: non-scaling-stroke;
    mix-blend-mode: multiply;
  }
</style>
