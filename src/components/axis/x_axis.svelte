<script>
  import { graficoContext } from '../../context.svelte'
  import { extent } from 'd3'
  import XTick from './x_tick.svelte'
  import Axis from './axis.svelte'

  const {
    innerWidth,
    xScale,
    defaultXScale,
    xAccessor,
    data,
    xTicks,
    bins,
    defaultXDomain = (data, accessor, bins) => extent(data, accessor)
  } = graficoContext()

  export let scale
  export let accessor = $xAccessor
  $xAccessor = accessor
  export let indent = 0
  export let ticks = null
  export let domain = defaultXDomain
  export let range = [indent, $innerWidth]
  export let nice = false
  export let format
  export let position = 'bottom'
  export let style = {}
  let _class = ''
  export { _class as class }

  if (scale) {
    $xScale = scale(domain?.($data, $xAccessor) ?? domain, range)
  } else if (!$xScale) {
    scale = defaultXScale
    $xScale = scale(domain?.($data, $xAccessor) ?? domain, range)
  }

  $: $xTicks = ticks
  $: $xScale.range(range)
  $: $xScale.domain(domain?.($data, $xAccessor) ?? domain)
</script>

<Axis
  class={_class + ' x'}
  scale={$xScale}
  dimension={$innerWidth}
  ticks={$xTicks}
  {format}
  {position}
  {style}
  {nice}
  let:coord
  let:index
  let:tick
  let:formatter
>
  <slot x={coord} {index} {tick}>
    <XTick
      x={coord}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: 0, y: 36 }}
      outParams={{ duration: 50 * index, x: 0, y: 36 }}
    />
  </slot>
  <slot name="label" slot="label" />
</Axis>

<style>
</style>
