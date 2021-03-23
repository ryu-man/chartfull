<script>
  import XAxis from '../x_axis.svelte'
  import { scaleUtc } from 'd3-scale'
  import { graficoContext } from '../../../context.svelte'

  const {
    innerWidth,
    innerHeight,
    xScale,
    xAccessor,
    xTicks,
    defaultXDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerWidth]
  } = graficoContext()

  export let invert
  export let domain = defaultXDomain
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
  export let scale = scaleUtc()
  export let position = 'bottom'
  export let accessor = $xAccessor
  $xAccessor = accessor

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

  $: $xTicks = ticks
  $: $xScale.rangeRound(_rangeRound($innerWidth, $innerHeight))
</script>

<XAxis
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
      use:tickPosition={{ x: (scale(tick) * 100) / $innerWidth, y: 0 }}
      class="tick">{formatter(tick)}</span
    >
  </slot>

  <slot name="label" slot="label" />
</XAxis>
