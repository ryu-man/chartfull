<script>
  import { graficoContext } from '../Context.svelte'
  import { scaleLinear } from 'd3-scale'
  const { xScales, yScales, xAccessors, yAccessors } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'
  export let x = xAccessors[xAxisId]
  export let y = yAccessors[yAxisId]
  export let domain = [0, 1]
  export let range = [0, 1]

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y

  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]
  const zScale = scaleLinear(domain, range)
</script>

<slot
  xGet={(d) => $xScale(x(d))}
  yGet={(d) => $yScale(y(d))}
  zGet={(d) => zScale(d)}
/>
