<script>
  import { graficoContext } from '../../../context.svelte'
  import { scaleIdentity } from '../../../scales'
  import YAxis from '../y_axis.svelte'
  import YTick from '../y_tick.svelte'

  const {
    innerWidth,
    innerHeight,
    yScale,
    yAccessor,
    yTicks,
    data,
    bins,
    defaultXDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerWidth]
  } = graficoContext()

  export let invert
  export let domain = defaultXDomain($data, $yAccessor, $bins)
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
  export let accessor = $yAccessor
  $yAccessor = accessor
  export let scale = scaleIdentity()
  export let position = 'bottom'

  nice && scale.nice(ticks)
  scale.unknown(unknown)
  invert = scale.invert
  let formatter = scale.tickFormat(ticks, tickFormat)

  $: $yTicks = ticks
  $: $yScale.range(range?.($innerWidth, $innerHeight) ?? range)
  $: $yScale.domain(domain?.($data, $yAccessor) ?? domain)
</script>

<YAxis class={_class} {accessor} {position} let:index let:tick>
  <slot coord={(scale(tick) * 100) / $innerHeight} {tick} {index} {formatter}>
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
