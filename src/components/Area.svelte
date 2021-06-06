<script>
  import { area as Area, curveMonotoneX } from 'd3-shape'
  import { graficoContext } from '../Context.svelte'

  const { xScales, yScales, xAccessors, yAccessors } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'

  export let curve = curveMonotoneX
  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]
  export let x = xAccessors[xAxisId]
  export let y0 = 0
  export let y1 = yAccessors[yAxisId]

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y1

  const area = Area()
    .x((d) => $xScale(x(d)))
    .y0(y0)
    .y1((d) => $yScale(y1(d)))
    .curve(curve)

</script>

<slot {area} />
