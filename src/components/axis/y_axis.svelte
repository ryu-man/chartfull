<script>
  import { chartistContext } from '../../context.svelte'
  import YTick from './y_tick.svelte'
  import Axis from './axis.svelte'
  import { extent } from 'd3'

  const {
    innerHeight,
    data,
    yScale,
    defaultYScale,
    yAccessor,
    yTicks
  } = chartistContext()

  export let scale = defaultYScale
  export let accessor
  accessor && ($yAccessor = accessor)
  export let indent = 0
  export let ticks = null
  export let domain = extent($data, $yAccessor)
  export let range = [$innerHeight, indent]
  export let nice = false
  export let format = 's'
  export let position = 'left'
  export let style = {}
  let _class = ''
  export { _class as class }

  $yScale = scale(domain, range)
  ticks && ($yTicks = ticks)
</script>

<Axis
  class={_class + ' y'}
  scale={$yScale}
  dimension={$innerHeight}
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
  <slot y={coord} {index} {tick}>
    <YTick
      y={coord}
      {tick}
      {formatter}
      inParams={{ duration: 100 * index, x: -36 }}
      outParams={{ duration: 50 * index, x: -36 }}
    />
  </slot>
  <slot name="label" slot="label">
    <span class="label">label</span>
  </slot>
</Axis>

<style>
  :global(.y.axis .label, .y.axis span[slot='label']) {
    position: absolute;
    left: 0;
    bottom: 105%;
  }
</style>
