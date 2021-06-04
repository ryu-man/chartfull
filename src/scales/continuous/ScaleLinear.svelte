<script>
  import { scaleStore } from '../scaleStore'
  import { scaleLinear } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown
  export let ticks
  export let specifier

  const scale = scaleStore(scaleLinear())

  $: scale.domain(domain)
  $: scale.range(range)
  $: rangeRound && scale.get.rangeRound(rangeRound)
  $: unknown && scale.get.unknown(unknown)
  $: scale.get.clamp(clamp)
  $: interpolate && scale.get.interpolate(interpolate)
  $: scale.get.nice(nice)
</script>

<slot
  scale={$scale}
  domain={$scale.domain()}
  range={$scale.range()}
  ticks={$scale.ticks()}
  format={scale.get.tickFormat(ticks, specifier)}
  invert={scale.get.invert}
  once={scale.get.once}
  copy={scale.copy}
  toString={scale.toString}
/>
