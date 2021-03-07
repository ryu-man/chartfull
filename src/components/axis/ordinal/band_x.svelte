<script>
  import XAxis from '../x_axis.svelte'
  import XTick from '../x_tick.svelte'
  import { scaleBand } from 'd3-scale'

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
  export let align
  export let step
  export let bandwidth
  export let tickValues

  let _class
  export { _class as class }
  export let position = 'bottom'
  let scale = scaleBand()
  export let accessor = $xAccessor
  // $xAccessor = accessor

  scale.round(round)
  scale.padding(padding)
  scale.align(align)
  scale.step(step)
  bandwidth = scale.bandwidth()

  let formatter = (d) => d

  $: $xTicks = ticks
  $: scale.rangeRound(rangeRound?.($innerWidth, $innerHeight) ?? rangeRound)
</script>

<XAxis
  class={_class}
  {scale}
  {accessor}
  {domain}
  {range}
  {position}
  tickValues={tickValues || (domain?.($data, $xAccessor, $bins) ?? domain)}
  let:index
  let:tick
>
  <slot coord={(scale(tick) * 100) / $innerWidth} {tick} {index}>
    <XTick
      y={(scale(tick) * 100) / $innerWidth}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: 0, y: 36 }}
      outParams={{ duration: 50 * index, x: 0, y: 36 }}
    />
  </slot>

  <slot name="label" slot="label" />
</XAxis>
