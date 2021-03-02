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
    histogram
  } = graficoContext()

  export let scale
  export let accessor = $xAccessor
  $xAccessor = accessor
  // !$xAccessor && accessor && ($xAccessor = accessor)
  export let indent = 0
  export let ticks = null
  export let domain = extent($data, $xAccessor)
  export let range = [indent, $innerWidth]
  export let nice = false
  export let format
  export let position = 'bottom'
  export let style = {}
  let _class = ''
  export { _class as class }

  // transform && ($entries = transform($entries, $xScale, $xAccessor, 30))
  if (!histogram) {
    if (scale) {
      $xScale = scale(domain, range)
    } else {
      $xScale = defaultXScale(domain, range)
    }
  } else {
  }
  ticks && ($xTicks = ticks)
  console.log(range)
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
  <slot name="label" slot="label">
    <span class="label">label</span>
  </slot>
</Axis>

<style>
</style>
