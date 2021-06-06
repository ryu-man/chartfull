<script>
  import { curveMonotoneX, line as Line } from 'd3-shape'
  import { graficoContext } from '../Context.svelte'

  const { xAccessors, yAccessors, xScales, yScales } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'

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

</script>

<slot {line} />