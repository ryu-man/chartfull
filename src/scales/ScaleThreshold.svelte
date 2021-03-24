<script>
  import { scaleStore } from './scaleStore'
  import { scaleThreshold } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let unknown

  const scale = scaleStore(scaleThreshold())

  $: scale.domain(domain)
  $: scale.range(range)
  $: unknown && $scale.unknown(unknown)
</script>

<slot
  scale={$scale}
  {domain}
  copy={scale.copy}
  invertExtent={scale.get.invertExtent}
  toString={scale.toString}
/>
