<script>
  import YAxis from '../y_axis.svelte'
  import { scaleLinear } from 'd3-scale'
  import { max } from 'd3-array'
  import { graficoContext } from '../../../context.svelte'
  import Declare from '../../declare.svelte'

  const { yScale } = graficoContext()

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
  export let scale = scaleLinear()
  export let position = 'bottom'

  nice && scale.nice(ticks)
  unknown && scale.unknown(unknown)
  clamp && scale.clamp(clamp)
  interpolate && scale.interpolate(interpolate)

  $: rangeRound && $yScale.rangeRound(rangeRound)
</script>

<YAxis
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
  <Declare value={scale.tickFormat(ticks, tickFormat)} let:value={format}>
    <slot {tick} {index} {x} {y} {tickPosition} {format}>
      <span
        use:tickPosition={{
          y: (scale(tick) * 100) / max(range || rangeRound),
          x: 0
        }}
        class="tick">{format(tick)}</span
      >
    </slot>
  </Declare>

  <slot name="label" slot="label" />
</YAxis>
