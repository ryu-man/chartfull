<script>
  import { scaleSequential } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let rangeRound
  export let interpolator
  export let clamp
  export let unknown

  const root = scaleSequential()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: interpolator && (scale = root.interpolator(interpolator))
  $: clamp && (scale = root.clamp(clamp))
  $: unknown && (scale = root.unknown(unknown))
</script>

<slot {scale} />
