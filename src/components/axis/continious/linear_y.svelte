<script>
  import YAxis from '../y_axis.svelte'
  import YTick from '../y_tick.svelte'
  import { scaleLinear } from 'd3-scale'
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
  // $yAccessor = accessor
  export let scale = scaleLinear()
  export let position = 'bottom'

  nice && scale.nice(ticks)
  scale.unknown(unknown)
  scale.clamp(clamp)
  scale.interpolate(interpolate)
  invert = scale.invert
  let formatter = scale.tickFormat(ticks, tickFormat)

  $: $yTicks = ticks
  $: $yScale.rangeRound(rangeRound?.($innerWidth, $innerHeight) ?? rangeRound)
</script>

<YAxis
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
  <slot coord={(scale(tick) * 100) / $innerHeight} {tick} {index}>
    <YTick
      x={(scale(tick) * 100) / $innerHeight}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: 0, y: 36 }}
      outParams={{ duration: 50 * index, x: 0, y: 36 }}
    />
  </slot>

  <slot name="label" slot="label" />
</YAxis>
