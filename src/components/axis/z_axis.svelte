<script lang="ts">
    import { charterContext } from '../../context.svelte'
    import XTick from './x_tick.svelte'
    import Axis from './axis.svelte'
    import { extent } from 'd3'
  
    const {
      innerWidth,
      zScale,
      defaultZScale,
      zAccessor,
      data,
      entries,
      map,
      primaryDomain,
      secondaryDomain
    } = charterContext()
  
    export let scale: any = defaultZScale
    export let accessor: () => any
    accessor && ($zAccessor = accessor)
    export let indent: number = 0
    export let domain: [any, any] = extent(data, $zAccessor)
    export let range: [number, number] = [indent, $innerWidth]

    $zScale = scale(domain, range)
  
  </script>
  
  <!-- <Axis
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
   -->
  <style>
  </style>
  