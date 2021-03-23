<script>
  import { scaleOrdinal } from 'd3-scale'
  import { storeScale } from './store_scale'

  export let domain = []
  export let range = [0, 1]
  export let unknown

  const scale = storeScale(scaleOrdinal())

  $: scale.domain(domain)
  $: scale.range(range)
  $: unknown && scale.unknown(unknown)
</script>

<slot
  scale={$scale}
  {domain}
  copy={scale.get.copy}
  once={scale.get.once}
  toString={scale.toString}
/>
