<script>
  import { scaleDivergingSqrt } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate
  export let unknown

  const root = scaleDivergingSqrt()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: unknown && (scale = root.unknown(unknown))
  $: clamp && (scale = root.clamp(clamp))
  $: interpolate && (scale = root.interpolator(interpolator))
</script>

<slot {scale} />
