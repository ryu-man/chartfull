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

<slot
  xGet={(d, ...args) => $xScale(x(d, ...args))}
  yGet={(d, ...args) => $yScale(y(d, ...args))}
  xBandwidth={$xScale?.bandwidth?.() || 0}
  yBandwidth={$yScale?.bandwidth?.() || 0}
/>
