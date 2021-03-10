<script>
  import { tweened } from 'svelte/motion'
  import { area, curveMonotoneX } from 'd3-shape'
  import { css } from '../utils'
  import { graficoContext } from '../context.svelte'

  const {
    xScale,
    yScale,
    xAccessor,
    yAccessor,
    colorScale,
    innerHeight
  } = graficoContext()

  export let data
  export let curve = curveMonotoneX
  export let x = (d) => $xScale($xAccessor(d))
  export let y0 = $innerHeight
  export let y1 = (d) => $yScale($yAccessor(d))

  const _area = area().x(x).y0(y0).y1(y1).curve(curve)

  $: d = _area(data)
</script>

<slot {d}>
  <path {d} class="area" />
</slot>

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }
</style>
