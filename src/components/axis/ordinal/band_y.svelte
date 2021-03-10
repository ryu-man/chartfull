<script>
  import YAxis from '../y_axis.svelte'
  import { scaleBand } from 'd3-scale'
  import { graficoContext } from '../../../context.svelte'

  const {
    innerWidth,
    innerHeight,
    yAccessor,
    yTicks,
    data,
    bins,
    defaultYDomain = (data, accessor, bins) => data.map(accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerHeight]
  } = graficoContext()

  export let domain = defaultYDomain
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
  export let accessor = $yAccessor
  // $yAccessor = accessor

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

<YAxis
  class={_class}
  {scale}
  {accessor}
  {domain}
  {range}
  tickValues={_tickValues}
  {position}
  let:index
  let:tick
  let:x
  let:y
  let:tickPosition
>
  <slot {tick} {index} {x} {y} {tickPosition}>
    <span
      use:tickPosition={{ y: (scale(tick) * 100) / $innerHeight, x: 0 }}
      style="transform:translate(0,calc(-50% + {(scale?.bandwidth?.() ?? 0) /
        2}px));"
      class="tick">{tick}</span
    >
  </slot>

  <slot name="label" slot="label" />
</YAxis>
