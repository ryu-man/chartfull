<script>
  import { graficoContext } from '../context.svelte'

  const {
    xScales,
    yScales,
    xAccessors,
    yAccessors,
    colorScale
  } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'
  export let x = xAccessors[xAxisId]
  export let y = yAccessors[yAxisId]

  xAccessors[xAxisId] = x
  yAccessors[yAxisId] = y

  colorScale.domain([...colorScale.domain(), id])

  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]
</script>

<slot
  xGet={(d, ...args) => $xScale(x(d, ...args))}
  yGet={(d, ...args) => $yScale(y(d, ...args))}
  bandwidth={$xScale?.bandwidth?.() || $yScale?.bandwidth?.() || 0}
/>
