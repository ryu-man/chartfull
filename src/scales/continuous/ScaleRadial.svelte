<script>
  import { scaleRadial } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let nice
  export let unknown

  const root = scaleRadial()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: scale = root.clamp(clamp)
  $: scale = root.nice(nice)
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: unknown && (scale = root.unknown(unknown))

  export function ticks(count = 10) {
    return scale.ticks(count)
  }
  export function tickFormat(count, specifier) {
    return scale.tickFormat(count, specifier)
  }
  export function copy() {
    return scale.copy()
  }
  export function invert(value) {
    return scale.invert(value)
  }
</script>

<slot {scale} />
