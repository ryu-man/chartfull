<script>
  import { scaleSqrt } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown
  export let exponent

  const root = scaleSqrt()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: clamp && (scale = root.clamp(clamp))
  $: nice && (scale = root.nice(nice))
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: unknown && (scale = root.unknown(unknown))
  $: interpolate && (scale = root.interpolate(interpolate))
  $: exponent && (scale = root.exponent(exponent))

  export function ticks(count = 10) {
    return root.ticks(count)
  }
  export function tickFormat(count, specifier) {
    return root.tickFormat(count, specifier)
  }
  export function copy() {
    return root.copy()
  }
  export function invert(value) {
    return root.invert(value)
  }
</script>

<slot {scale} />
