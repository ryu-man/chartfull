<script>
  import { spring } from 'svelte/motion'

  export let from = 0
  export let to = 0
  export let stiffness = 0.15
  export let damping = 0.8
  export let precision = 0.001

  const output = spring(from, {
    stiffness,
    precision,
    damping
  })

  $: $output = to
</script>

<slot value={$output} />
