<script>
  import { bin as Bin } from 'd3-array'
  import { graficoContext } from '../Context.svelte'

  const { xScales, yScales } = graficoContext()

  export let xAxisId = 'default'
  export let yAxisId = 'default'

  export let data = []
  export let domain = []
  export let value
  export let thresholds

  const bin = Bin()

  const xScale = xScales[xAxisId]
  const yScale = yScales[yAxisId]

  $: domain && bin.domain(domain)
  $: value && bin.value(value)
  $: thresholds && bin.thresholds(thresholds)

  $: bins = bin(data)
</script>

<slot
  data={bins}
  x0Get={(d) => $xScale(d.x0)}
  x1Get={(d) => $xScale(d.x1)}
  yGet={(d) => $yScale(d.length)}
/>
