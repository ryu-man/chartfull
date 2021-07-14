<script>
  import { scaleLog } from 'd3-scale'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolate
  export let nice
  export let unknown

  const root = scaleLog()
  let scale = root

  $: scale = root.domain(domain)
  $: scale = root.range(range)
  $: rangeRound && (scale = root.rangeRound(rangeRound))
  $: unknown && (scale = root.unknown(unknown))
  $: clamp && (scale = root.clamp(clamp))
  $: interpolate && (scale = root.interpolate(interpolate))
  $: nice && (scale = root.nice())

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
  export function base(){
    return scale.base()
  }
</script>

<slot {scale} />
