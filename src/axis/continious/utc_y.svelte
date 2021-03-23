<script>
  import YAxis from '../y_axis.svelte'
  import { scaleUtc } from 'd3-scale'
  import { graficoContext } from '../../../context.svelte'

  const {
    innerWidth,
    innerHeight,
    yScale,
    yAccessor,
    yTicks,
    data,
    bins,
    defaultYDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerHeight]
  } = graficoContext()

  export let invert
  export let domain = defaultYDomain
  export let range = defaultRange
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
  export let accessor = $yAccessor
  $yAccessor = accessor
  export let scale = scaleUtc()
  export let position = 'bottom'

  nice && scale.nice(ticks)
  scale.unknown(unknown)
  scale.clamp(clamp)
  scale.interpolate(interpolate)
  invert = scale.invert

  let formatter = scale.tickFormat(ticks, tickFormat)

  $: _rangeRound =
    typeof rangeRound !== 'function' ? () => rangeRound : rangeRound
  $: _tickValues =
    typeof tickValues !== 'function'
      ? (scale) => tickValues || scale.ticks(ticks)
      : tickValues

  $: $yTicks = ticks
  $: rangeRound && $yScale.rangeRound(_rangeRound($innerWidth, $innerHeight))
</script>

<YAxis
  class={_class}
  {scale}
  {accessor}
  {domain}
  {range}
  {position}
  tickValues={_tickValues}
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
