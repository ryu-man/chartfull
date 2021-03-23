<script>
  import XAxis from '../x_axis.svelte'
  import { scaleTime } from 'd3-scale'
  import { max } from 'd3-array'

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let unknown
  export let interpolate
  export let ticks
  export let tickFormat
  export let tickValues = (scale) => scale.ticks()
  export let nice = false

  let _class
  export { _class as class }
  export let scale = scaleTime()
  export let position = 'bottom'

  nice && scale.nice(ticks)
  unknown && scale.unknown(unknown)
  clamp && scale.clamp(clamp)
  interpolate && scale.interpolate(interpolate)

  let formatter = scale.tickFormat(ticks, tickFormat)

  $: rangeRound && scale.rangeRound(rangeRound)
</script>

<XAxis
  class={_class}
  {scale}
  {domain}
  {range}
  {position}
  {tickValues}
  let:index
  let:tick
  let:x
  let:y
  let:tickPosition
>
  <slot {tick} {index} {x} {y} {tickPosition} {formatter}>
    <span
      use:tickPosition={{ x: (scale(tick) * 100) / max(range), y: 0 }}
      class="tick">{formatter(tick)}</span
    >
  </slot>

  <slot name="label" slot="label" />
</XAxis>
