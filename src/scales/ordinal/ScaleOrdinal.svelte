<script>
  import { scaleOrdinal } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let unknown

  const root = scaleOrdinal()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: unknown && (scale = root.unknown(unknown))
</script>

<slot {scale} />
