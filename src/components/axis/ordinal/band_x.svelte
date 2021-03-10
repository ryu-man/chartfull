<script>
  import XAxis from '../x_axis.svelte'
  import { scaleBand } from 'd3-scale'
  import { graficoContext } from '../../../context.svelte'

  const {
    innerWidth,
    innerHeight,
    xScale,
    xAccessor,
    xTicks,
    data,
    bins,
    defaultXDomain = (data, accessor, bins) => data.map(accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerWidth]
  } = graficoContext()

  export let domain = defaultXDomain
  export let range = defaultRange
  export let rangeRound
  export let round = false
  export let padding
  export let paddingInner
  export let paddingOuter
  export let align
  export let step
  export let bandwidth
  export let tickValues

  let _class
  export { _class as class }
  export let position
  let scale = scaleBand()
  export let accessor = $xAccessor
  // $xAccessor = accessor

  round && scale.round(round)
  padding && scale.padding(padding)
  paddingInner && scale.paddingInner(paddingInner)
  paddingOuter && scale.paddingOuter(paddingOuter)
  align && scale.align(align)
  step = scale.step()
  bandwidth = scale.bandwidth()

  let _rangeRound =
    typeof rangeRound !== 'function' ? () => rangeRound : rangeRound
  let _tickValues =
    typeof tickValues !== 'function'
      ? (scale) => tickValues || scale.domain()
      : tickValues
  let formatter = (d) => d

  $: rangeRound && scale.rangeRound(_rangeRound($innerWidth, $innerHeight))
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
  <slot {tick} {index} {x} {y} {tickPosition}>
    <span
      use:tickPosition={{ x: (scale(tick) * 100) / $innerWidth, y: 0 }}
      class="tick">{tick}</span
    >
  </slot>

  <slot name="label" slot="label" />
</XAxis>
