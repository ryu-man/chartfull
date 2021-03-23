<script>
  import { storeScale } from './store_scale'
  import { scaleLog } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let rangeRound
  export let align
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown
  const scale = storeScale(scaleLog())

  $: scale.domain(domain)
  $: scale.range(range)
  $: clamp && scale.get.clamp(clamp)
  $: interpolate && scale.get.interpolate(interpolate)
  $: nice && scale.get.nice(nice)
  $: unknown && scale.get.unknown(unknown)
  $: rangeRound && scale.get.rangeRound(rangeRound)
  $: align && scale.get.align(align)
</script>

<slot
  scale={$scale}
  {domain}
  tickFormat={scale.get.tickFormat}
  copy={scale.get.copy}
  invert={scale.get.invert}
  once={scale.get.once}
  ticks={scale.get.ticks}
  toString={scale.toString}
/>
