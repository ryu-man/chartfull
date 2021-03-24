<script>
  import { scaleStore } from '../scaleStore'
  import { scaleRadial } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let align
  export let clamp = false
  export let nice
  export let unknown
  export let ticks
  export let specifier

  const scale = scaleStore(scaleRadial())

  $: scale.domain(domain)
  $: scale.range(range)
  $: rangeRound && scale.get.rangeRound(rangeRound)
  $: clamp && scale.get.clamp(clamp)
  $: nice && scale.get.nice(nice)
  $: unknown && scale.get.unknown(unknown)
  $: align && scale.get.align(align)
  $: scale.get.ticks(ticks)
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
