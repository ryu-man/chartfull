<script>
  import { scaleStore } from '../scaleStore'
  import { scaleDiverging } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate
  export let unknown

  const scale = scaleStore(scaleDiverging())

  $: scale.domain(domain)
  $: scale.range(range)
  $: rangeRound && scale.get.rangeRound(rangeRound)
  $: unknown && scale.get.unknown(unknown)
  $: clamp && scale.get.clamp(clamp)
  $: interpolate && scale.get.interpolate(interpolate)
</script>

<slot
  scale={$scale}
  domain={$scale.domain()}
  range={$scale.range()}
  copy={scale.get.copy}
  invert={scale.get.invert}
  toString={scale.toString}
/>
