<script>
  import { scaleStore } from '../scaleStore'
  import { scaleSqrt } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let align
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown
  export let ticks
  export let specifier

  const scale = scaleStore(scaleSqrt())

  $: scale.domain(domain)
  $: scale.range(range)
  $: rangeRound && scale.get.rangeRound(rangeRound)
  $: unknown && scale.get.unknown(unknown)
  $: clamp && scale.get.clamp(clamp)
  $: interpolate && scale.get.interpolate(interpolate)
  $: nice && scale.get.nice(nice)
  $: align && scale.get.align(align)
  $: scale.get.ticks(ticks)
</script>

<slot
  scale={$scale}
  domain={$scale.domain()}
  range={$scale.range()}
  ticks={$scale.ticks()}
  format={scale.get.tickFormat(ticks, specifier)}
  copy={scale.get.copy}
  invert={scale.get.invert}
  once={scale.get.once}
  toString={scale.toString}
/>
