<script>
  import { area as Area, curveMonotoneX } from 'd3-shape'
  import { graficoContext } from '../context.svelte'

  const {
    xScales,
    yScales,
    xAccessors,
    yAccessors,
    innerHeight
  } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'
  export let data
  export let curve = curveMonotoneX
  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]
  export let x = xAccessors[xAxisId]
  export let y0 = $innerHeight
  export let y1 = yAccessors[yAxisId]

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y1

  const area = Area()
    .x((d) => $xScale(x(d)))
    .y0(y0)
    .y1((d) => $yScale(y1(d)))
    .curve(curve)

  $: d = area(data)
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
