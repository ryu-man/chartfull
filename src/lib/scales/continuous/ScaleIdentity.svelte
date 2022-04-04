<script>
  import { scaleStore } from '../scaleStore'
  import { scaleIdentity } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let align
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown
  export let ticks
  export let specifier

  const scale = scaleStore(scaleIdentity())

  $: scale.domain(domain)
  $: scale.range(range)
  $: clamp && scale.get.clamp(clamp)
  $: interpolate && scale.get.interpolate(interpolate)
  $: nice && scale.get.nice(nice)
  $: unknown && scale.get.unknown(unknown)
  $: align && scale.get.align(align)
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
