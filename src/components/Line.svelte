<script>
  import { curveMonotoneX, line as Line } from 'd3-shape'
  import { graficoContext } from '../Context.svelte'

  const { xAccessors, yAccessors, xScales, yScales } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'
  export let data = []
  const xAccessor = xAccessors[xAxisId]
  const yAccessor = xAccessors[yAxisId]
  export let x = xAccessor
  export let y = yAccessor
  export let curve = curveMonotoneX

  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y

  const line = Line()
    .x((d) => $xScale(x(d)))
    .y((d) => $yScale(y(d)))
    .curve(curve)

  $: d = line(data)
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
    transition: 0.2s;
  }
</style>
