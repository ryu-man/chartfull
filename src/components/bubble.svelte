<script>
  import { graficoContext } from '../context.svelte'

  const {
    xScales,
    yScales,
    zScale,
    xAccessors,
    yAccessors,
    colorScale
  } = graficoContext()

  export let id = 'default'
  export let xAxisId = 'default'
  export let yAxisId = 'default'
  export let x = xAccessors[xAxisId]
  export let y = yAccessors[yAxisId]
  export let z = (d) => d.z

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y

  colorScale.domain([...colorScale.domain(), id])

  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]
</script>

<slot
  xGet={(d) => $xScale(x(d))}
  yGet={(d) => $yScale(y(d))}
  zGet={(d) => zScale(z(d))}
  color={colorScale(id)}
/>
