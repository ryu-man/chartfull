<script>
  import { bin as Bin } from 'd3-array'
  import { graficoContext } from '../Grafico.svelte'

  const { scales } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'

  // export let data = []
  export let domain = []
  export let value
  export let thresholds

  const root = Bin()
  let bin = root

  const xScale = $scales[xId]
  const yScale = $scales[yId]

  $: domain && (bin = root.domain(domain))
  $: value && (bin = root.value(value))
  $: thresholds && (bin = root.thresholds(thresholds))
</script>

<slot
  {bin}
  x0Get={(d) => $xScale(d.x0)}
  x1Get={(d) => $xScale(d.x1)}
  yGet={(d) => $yScale(d.length)}
/>
