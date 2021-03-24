<script>
  import { scaleStore } from './scaleStore'
  import { scaleQuantize } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let thresholds
  export let unknown
  export let ticks
  export let specifier

  const scale = scaleStore(scaleQuantize())
  
  $: scale.domain(domain)
  $: scale.range(range)
  $: thresholds && $scale.thresholds(thresholds)
  $: unknown && $scale.unknown(unknown)
  $: nice && $scale.nice(nice)
  $: ticks && $scale.ticks(ticks)
  $: nice && $scale.nice(nice)
</script>

<slot
  scale={$scale}
  {domain}
  copy={scale.copy}
  invertExtent={scale.get.invertExtent}
  thresholds={$scale.thresholds()}
  format={$scale.tickFormat(ticks, specifier)}
  toString={scale.toString}
/>
