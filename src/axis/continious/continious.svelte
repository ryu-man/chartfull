<script>
  export let rangeRound
  export let clamp = false
  export let unknown
  export let interpolate
  export let ticks
  export let nice = false

  export let scale

  $: nice && scale.nice(ticks)
  $: unknown && scale.unknown(unknown)
  $: clamp && scale.clamp(clamp)
  $: interpolate && scale.interpolate(interpolate)
  $: rangeRound && scale.rangeRound(rangeRound)
</script>

<slot />
