<script>
  import YAxis from '../y_axis.svelte'
  import YTick from '../y_tick.svelte'
  import { scaleBand } from 'd3-scale'

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
  export let align
  export let step
  export let bandwidth

  let _class
  export { _class as class }
  export let position = 'bottom'
  let scale = scaleBand()
  export let accessor = $yAccessor
  // $yAccessor = accessor

  scale.round(round)
  scale.padding(padding)
  scale.align(align)
  scale.step(step)
  bandwidth = scale.bandwidth()

  let formatter = (d) => d

  $: $yTicks = ticks
  $: tickValues = domain?.($data, $yAccessor, $bins) ?? domain
  $: scale.rangeRound(rangeRound?.($innerWidth, $innerHeight) ?? rangeRound)
</script>

<YAxis
  class={_class}
  {scale}
  {accessor}
  {domain}
  {range}
  {tickValues}
  {position}
  let:index
  let:tick
>
  <slot coord={(scale(tick) * 100) / $innerHeight} {tick} {index}>
    <YTick
      y={(scale(tick) * 100) / $innerHeight}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: 0, y: 36 }}
      outParams={{ duration: 50 * index, x: 0, y: 36 }}
    />
  </slot>

  <slot name="label" slot="label" />
</YAxis>