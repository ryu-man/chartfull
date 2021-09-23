<script>
  import { bin as Bin, max } from 'd3-array'
  import { tick } from 'svelte'
  import { graficoContext } from '../Grafico.svelte'
  import { scaleLinear } from 'd3-scale'
  import { interpolate as interpolateValue } from 'd3-interpolate'

  const { scales } = graficoContext()

  export let data = []

  export let xId = 'x'
  export let xScale
  $: !xScale && (xScale = $scales[xId])

  export let binDomain = xScale.domain()
  export let value
  export let thresholds

  const root = Bin()
  let bin = root

  $: binDomain && (bin = root.domain(binDomain))
  $: value && (bin = root.value(value))
  $: thresholds && (bin = root.thresholds(thresholds))


  $: bins = bin(data)

  export let domain
  export let range = [0, 1]
  export let rangeRound = range
  export let clamp = false
  export let interpolate = interpolateValue
  export let nice = false
  export let unknown

  $: scale = scaleLinear(
    [
      typeof domain[0] === 'function' ? domain[0](bins) : domain[0],
      typeof domain[1] === 'function' ? domain[1](bins) : domain[1]
    ],
    range
  )
    .rangeRound(rangeRound)
    .clamp(clamp)
    .interpolate(interpolate)
    .nice(nice)
    .unknown(unknown)
</script>

{#await tick() then value}
  <slot
    data={bins}
    {bins}
    x0Get={(d) => xScale(d.x0 ?? 0)}
    x1Get={(d) => xScale(d.x1 ?? 0)}
    yGet={(d) => scale(d.length ?? 0)}
    {scale}
  />
{/await}
