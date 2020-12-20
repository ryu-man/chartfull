<script lang="ts">
  import { charterContext } from '../../context.svelte'
  import { extent } from 'd3'
  import XTick from './x_tick.svelte'
  import Axis from './axis.svelte'

  const { innerWidth, xScale, defaultXScale, data, xAccessor } = charterContext()

  export let scale: any = defaultXScale
  export let accessor: () => any
  export let indent: number = 0
  export let ticks: number | null = null
  export let domain: [any, any] = extent(data, accessor || $xAccessor)
  export let range: [number, number] = [indent, $innerWidth]
  export let nice: boolean = false
  export let format: string
  export let position: string = 'bottom'
  export let style = {}
  let _class = ''
  export { _class as class }

  $xScale = scale(domain, range)
  accessor && ($xAccessor = accessor)

</script>

<Axis
  class={_class + ' x'}
  scale = {$xScale}
  dimension= {$innerWidth}
  {ticks}
  {format}
  {position}
  {style}
  {nice}
  let:coord
  let:index
  let:tick
  let:formatter>
  <slot x={coord} {index} {tick}>
    <XTick
      x={coord}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: 0, y: 36 }}
      outParams={{ duration: 50 * index, x: 0, y: 36 }} />
  </slot>
  <slot name="label" slot="label">
    <span style="position:absolute;right:0;">label</span>
  </slot>
</Axis>
<style>
 
</style>
