<script>
  import { scaleQuantile } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let unknown

  const root = scaleQuantile()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: scale = root.unknown(unknown)
</script>

<slot scale={scale} />
