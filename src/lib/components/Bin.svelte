<script>
  import { bin as Bin, extent } from 'd3-array'
  import { graficoContext } from '../Grafico.svelte'
  import { scaleLinear } from 'd3-scale'
  import { interpolate as interpolateValue } from 'd3-interpolate'

  const { scales } = graficoContext()

  export let data = []

  export let xId = 'x'
  export let xScale
  $: !xScale && (xScale = $scales[xId])

  export let domain = [0, 1]
  export let value
  export let thresholds

  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate = interpolateValue
  export let nice = false
  export let unknown

  const root = Bin()
  let bin = root

  $: bins = bin.domain(domain).value(value).thresholds(thresholds)(data)

  $: yDomain = extent(bins, (d) => d.length)
  $: yScale = scaleLinear(yDomain, range)
    .rangeRound(rangeRound ?? range)
    .clamp(clamp)
    .interpolate(interpolate)
    .nice(nice)
    .unknown(unknown)
</script>

{#if data.length}
  <slot
    data={bins}
    {bins}
    x0Get={(d) => xScale(d.x0 ?? 0)}
    x1Get={(d) => xScale(d.x1 ?? 0)}
    yGet={(d) => yScale(d.length ?? 0)}
    {yScale}
  />
{/if}
