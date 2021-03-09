<script>
  import { graficoContext } from '../../../context.svelte'
  import { scaleIdentity } from '../../../scales'
  import XAxis from '../x_axis.svelte'
  import XTick from '../x_tick.svelte'

  const {
    innerWidth,
    innerHeight,
    xScale,
    xAccessor,
    xTicks,
    data,
    bins,
    defaultXDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerWidth]
  } = graficoContext()

  export let invert
  export let domain = defaultXDomain($data, $xAccessor, $bins)
  export let range = defaultRange($innerWidth, $innerHeight)
  export let unknown
  export let ticks
  export let tickFormat
  export let nice

  /* export let tickArguments
  export let tickValues
  export let tickFormat
  export let tickSize
  export let tickSizeInner
  export let tickSizeOuter
  export let tickPadding */

  let _class
  export { _class as class }
  export let accessor = $xAccessor
  $xAccessor = accessor
  export let scale = scaleIdentity()
  export let position = 'bottom'

  nice && scale.nice(ticks)
  scale.unknown(unknown)
  let formatter = scale.tickFormat(ticks, tickFormat)

  $: $xTicks = ticks
  $: $xScale.range(range?.($innerWidth, $innerHeight) ?? range)
  $: $xScale.domain(domain?.($data, $xAccessor) ?? domain)
</script>

<XAxis class={_class} {accessor} {position} let:index let:tick>
  <slot coord={(scale(tick) * 100) / $innerWidth} {tick} {index} {formatter}>
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
