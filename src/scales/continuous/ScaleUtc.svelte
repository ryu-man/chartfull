<script>
  import { scaleUtc } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown

  const root = scaleUtc()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: clamp && (scale = root.clamp(clamp))
  $: nice && (scale = root.nice(nice))
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: unknown && (scale = root.unknown(unknown))
  $: interpolate && (scale = root.interpolate(interpolate))
</script>

<slot {scale} />
