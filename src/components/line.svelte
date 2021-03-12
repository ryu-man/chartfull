<script>
  import { css } from '../utils'
  import { curveMonotoneX, line } from 'd3-shape'
  import { graficoContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = graficoContext()

  export let data = []
  export let x = (d) => $xScale($xAccessor(d))
  export let y = (d) => $yScale($yAccessor(d))
  export let curve = curveMonotoneX

  const _line = line() // Creating the line
    .x(x)
    .y(y)
    .curve(curve)

  let d = ''

  $: d = _line(data)

  console.log(data, _line(data))
</script>

<slot {d}>
  <path {d} fill="transparent" stroke="black" />
</slot>

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
    vector-effect: non-scaling-stroke;
    mix-blend-mode: multiply;
  }
</style>
