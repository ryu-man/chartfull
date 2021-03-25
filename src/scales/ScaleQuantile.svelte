<script>
  import { scaleStore } from './scaleStore'
  import { scaleQuantile } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let unknown

  const scale = scaleStore(scaleQuantile())

  $: scale.domain(domain)
  $: scale.range(range)
  $: $scale.unknown(unknown)
</script>

<slot
  scale={$scale}
  {domain}
  quantiles={$scale.quantiles()}
  invertExtent={scale.get.invertExtent}
  copy={scale.get.copy}
  toString={scale.get.toString}
/>
