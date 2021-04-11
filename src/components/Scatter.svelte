<script>
  import { graficoContext } from '../Context.svelte'

  const { xScales, yScales, xAccessors, yAccessors } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'
  export let x = xAccessors[xAxisId]
  export let y = yAccessors[yAxisId]

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y

  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]
</script>

<slot xGet={(d) => $xScale(x(d))} yGet={(d) => $yScale(y(d))} />
