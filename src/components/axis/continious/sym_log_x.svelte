<script>
  import XAxis from '../x_axis.svelte'
  import { scaleSymlog } from 'd3-scale'

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
  export let scale = scaleSymlog()
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
  $: rangeRound && $xScale.rangeRound(_rangeRound($innerWidth, $innerHeight))
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
  <slot coord={(scale(tick) * 100) / $innerWidth} {tick} {index}>
    <slot {tick} {index} {x} {y} {tickPosition} {formatter}>
      <span
        use:tickPosition={{ x: (scale(tick) * 100) / $innerWidth, y: 0 }}
        class="tick">{formatter(tick)}</span
      >
    </slot>
  </slot>

  <slot name="label" slot="label" />
</XAxis>
