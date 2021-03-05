<script>
  import { graficoContext } from '../../context.svelte'
  import YTick from './y_tick.svelte'
  import Axis from './axis.svelte'
  import { extent } from 'd3'

  const {
    innerHeight,
    data,
    yScale,
    defaultYScale,
    yAccessor,
    yTicks,
    bins,
    defaultYDomain = (data, accessor, bins) => extent(data, accessor)
  } = graficoContext()

  export let scale
  export let accessor = $yAccessor
  $yAccessor = accessor
  export let indent = 0
  export let ticks = null
  export let domain = defaultYDomain
  export let range = [$innerHeight, indent]
  export let nice = false
  export let format = 's'
  export let position = 'left'
  export let style = {}
  let _class = ''
  export { _class as class }

  if (scale) {
    $yScale = scale(domain?.($data, $yAccessor, $bins) ?? domain, range)
  } else if (!$yScale) {
    scale = defaultYScale
    $yScale = scale(domain?.($data, $yAccessor, $bins) ?? domain, range)
  }

  $: $yTicks = ticks
  $: $yScale.range(range)
  $: $yScale.domain(domain?.($data, $yAccessor, $bins) ?? domain)
</script>

<Axis
  class={_class + ' y'}
  scale={$yScale}
  dimension={$innerHeight}
  ticks={$yTicks}
  {format}
  {position}
  {style}
  {nice}
  let:coord
  let:index
  let:tick
  let:formatter
>
  <slot y={coord} {index} {tick}>
    <YTick
      y={coord}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: -36 }}
      outParams={{ duration: 50 * index, x: -36 }}
    />
  </slot>
  <slot name="label" slot="label" />
</Axis>

<style>
</style>
