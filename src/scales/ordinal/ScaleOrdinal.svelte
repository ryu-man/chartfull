<script>
  import { scaleOrdinal } from 'd3-scale'
  import { scaleStore } from '../scaleStore'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let unknown

  const scale = scaleStore(scaleOrdinal())

  $: scale.domain(domain)
  $: scale.range(range)
  $: unknown && scale.unknown(unknown)
</script>

<slot
  scale={$scale}
  domain={$scale.domain()}
  copy={scale.get.copy}
  once={scale.get.once}
  toString={scale.toString}
/>
