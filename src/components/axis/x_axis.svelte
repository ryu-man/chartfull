<script>
  import { graficoContext } from '../../context.svelte'
  import XTick from './x_tick.svelte'
  import Axis from './axis.svelte'
  import { extent } from 'd3'

  const {
    innerWidth,
    xScale,
    defaultXScale,
    xAccessor,
    data,
    entries,
    map,
    xTicks
  } = graficoContext()

  export let scale = defaultXScale
  export let accessor
  accessor && ($xAccessor = accessor)
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

  $xScale = scale(domain, range)
  ticks && ($xTicks = ticks)
  map && ($entries = map($entries, $xScale, $xAccessor, 30))
</script>

<Axis
  class={_class + ' x'}
  scale={$xScale}
  dimension={$innerWidth}
  {ticks}
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
  :global(.x.axis .label, .x.axis span[slot='label']) {
    position: absolute;
    right: 0;
  }
</style>
