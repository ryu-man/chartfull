<script lang="ts">
  import type { Style } from '../../utils/style'
  import { charterContext } from '../../context.svelte'
  import { extent } from 'd3'
  import YTick from './y_tick.svelte'
  import Axis from './axis.svelte'

  const { innerHeight, data, yAccessor, yScale, defaultYScale } = charterContext()

  export let scale: any = defaultYScale
  export let accessor: () => any
  export let indent: number = 0
  export let ticks: number = null
  export let domain: [any, any] = extent(data, accessor || $yAccessor)
  export let range: [number, number] = [$innerHeight, indent]
  export let nice: boolean = false
  export let format: string = 's'
  export let position: string = 'left'
  export let style: Style = {}
  let _class = ''
  export { _class as class }

  $yScale = scale(domain, range)
  accessor && ($yAccessor = accessor)

  console.log(accessor)
  /* accessor && ($yAccessor = accessor)
  ticks && (context.yTicks = ticks)
  if (scale) {
    $yScale = scale(domain, range)
  } else {
    $yScale.domain(domain).range(range)
  }

  let formatter: (value: any) => string

  function init(node: HTMLElement) {
    css(node, style)
    nice && $yScale.nice()
    formatter = $yScale?.tickFormat?.(ticks, format) ?? ((d) => d)
  }

  function tickValues(scale, ticks): any[] {
    return scale?.ticks?.(ticks) ?? scale.domain()
  } */
</script>

<Axis
  class={_class + ' y'}
  scale = {$yScale}
  dimension= {$innerHeight}
  {ticks}
  {format}
  {position}
  {style}
  {nice}
  let:coord
  let:index
  let:tick
  let:formatter>
  <slot y={coord} {index} {tick}>
    <YTick
      y={coord}
      {tick}
      {formatter}
      inParams={{ duration: 500, x: -36 }}
      outParams={{ duration: 400, x: -36 }} />
  </slot>
  <slot name="label" slot="label">
    <span style="position:absolute;right:0;bottom:100%">label</span>
  </slot>
</Axis>

<!-- <div use:init class="{_class + ' '}{position + ' '}y axis" style="width:2em;">
  <div class="inner-axis">
    {#await tick() then value}
      {#each tickValues($yScale, ticks) as tick, i (+tick || tick)}
        <slot y={($yScale(tick) * 100) / $innerHeight} {tick} index={i}>
          <YTick
            y={($yScale(tick) * 100) / $innerHeight}
            {formatter}
            {tick}
            inParams={{ duration: 500, x: -36 }}
            outParams={{ duration: 400, x: -36 }} />
        </slot>
      {/each}
    {/await}
  </div>
  <slot name="label">
    <span
      class="label"
      style="position:absolute; left:100% ; bottom:100%">Label</span>
  </slot>
</div> -->

<style>
</style>
