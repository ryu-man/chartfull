<script>
  import XAxis from '../x_axis.svelte'
  import XTick from '../x_tick.svelte'
  import { scaleTime } from 'd3-scale'
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
  export let scale = scaleTime()
  export let position = 'bottom'
  export let accessor = $xAccessor
  // $xAccessor = accessor

  nice && scale.nice(ticks)
  scale.unknown(unknown)
  scale.clamp(clamp)
  scale.interpolate(interpolate)
  invert = scale.invert

  let formatter = scale.tickFormat(ticks, tickFormat)

  $: $xTicks = ticks
  $: $xScale.rangeRound(rangeRound?.($innerWidth, $innerHeight) ?? rangeRound)
</script>

<XAxis
  class={_class}
  {scale}
  {accessor}
  {domain}
  {range}
  {position}
  tickValues={tickValues || scale.ticks(ticks)}
  let:index
  let:tick
>
  <slot coord={(scale(tick) * 100) / $innerWidth} {tick} {index}>
    <XTick
      x={(scale(tick) * 100) / $innerWidth}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: 0, y: 36 }}
      outParams={{ duration: 50 * index, x: 0, y: 36 }}
    />
  </slot>

  <slot name="label" slot="label" />
</XAxis>
