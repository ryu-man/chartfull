<script>
  import { scaleBand } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let rangeRound
  export let round = false
  export let align
  export let padding
  export let paddingInner
  export let paddingOuter

  const root = scaleBand()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: scale = root.round(round)
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: align && (scale = root.align(align))
  $: padding && (scale = root.padding(padding))
  $: paddingInner && (scale = root.paddingInner(paddingInner))
  $: paddingOuter && (scale = root.paddingOuter(paddingOuter))
</script>

<slot {scale} step={scale.step()} bandwidth={scale.bandwidth()} />
