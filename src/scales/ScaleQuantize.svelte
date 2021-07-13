<script>
  import { scaleQuantize } from 'd3-scale'

  export let domain = []
  export let range = [0, 1]
  export let invertExtent
  export let unknown
  export let ticks
  export let nice

  const root = scaleQuantize()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: scale = root.invertExtent(invertExtent)
  $: unknown && (scale = root.unknown(unknown))
  $: ticks && (scale = root.ticks(ticks))
  $: nice && (scale = root.nice(nice))
</script>

<slot {scale} />
