<script>
  import { scaleThreshold } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let invertExtent
  export let unknown

  const root = scaleThreshold()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: scale = root.invertExtent(invertExtent)
  $: unknown && (scale = root.unknown(unknown))
</script>

<slot {scale} />
