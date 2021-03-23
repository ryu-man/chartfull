<script>
  import YAxis from '../y_axis.svelte'
  import { scaleTime } from 'd3-scale'
  import { graficoContext } from '../../../context.svelte'

  const { innerHeight } = graficoContext()

  export let invert
  export let domain
  export let range
  export let rangeRound
  export let clamp = false
  export let unknown
  export let interpolate
  export let ticks
  export let tickFormat
  export let tickValues
  export let nice = false

  let _class
  export { _class as class }
  export let scale = scaleTime()
  export let position = 'bottom'

  nice && $scale.nice(ticks)
  unknown && $scale.unknown(unknown)
  clamp && $scale.clamp(clamp)
  interpolate && $scale.interpolate(interpolate)
  invert = $scale.invert

  let formatter = $scale.tickFormat(ticks, tickFormat)

  $: rangeRound && $scale.rangeRound(rangeRound)
</script>

<YAxis
  class={_class}
  {scale}
  {domain}
  {range}
  {tickValues}
  {position}
  let:index
  let:tick
  let:x
  let:y
  let:tickPosition
>
  <slot {tick} {index} {x} {y} {tickPosition} {formatter}>
    <span
      use:tickPosition={{ y: (scale(tick) * 100) / $innerHeight, x: 0 }}
      class="tick">{formatter(tick)}</span
    >
  </slot>

  <slot name="label" slot="label" />
</YAxis>
