<script>
  import { scalePoint } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let round = false
  export let padding
  export let paddingInner
  export let paddingOuter
  export let align

  const root = scalePoint()
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

<slot {scale} />
