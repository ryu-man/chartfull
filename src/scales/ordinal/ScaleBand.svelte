<script>
  import { scaleStore } from '../scaleStore'
  import { scaleBand } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let rangeRound
  export let round = false
  export let padding
  export let paddingInner
  export let paddingOuter
  export let align

  const scale = scaleStore(scaleBand())

  $: scale.domain(domain)
  $: scale.range(range)
  $: scale.get.round(round)
  $: rangeRound && scale.get.rangeRound(rangeRound)
  $: align && scale.get.align(align)
  $: padding && scale.get.padding(padding)
  $: paddingInner && scale.get.paddingInner(paddingInner)
  $: paddingOuter && scale.get.paddingOuter(paddingOuter)
</script>

<slot
  scale={$scale}
  domain={$scale.domain()}
  range={$scale.range()}
  step={$scale.step()}
  bandwidth={$scale.bandwidth()}
  padding={$scale.padding()}
  paddingInner={$scale.paddingInner()}
  paddingOuter={$scale.paddingOuter()}
/>
