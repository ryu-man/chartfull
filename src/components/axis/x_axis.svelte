<script>
  import { graficoContext } from '../../context.svelte'
  import { tick as Tick } from 'svelte'
  import { scaleLinear } from 'd3-scale'
  import { extent } from 'd3-array'
  import XTick from './x_tick.svelte'
  import Axis from './axis.svelte'

  const {
    innerWidth,
    innerHeight,
    xScale,
    xAccessor,
    data,
    bins,
    defaultXDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerWidth]
  } = graficoContext()

  export let domain = defaultXDomain
  export let range = defaultRange
  export let scale
  export let tickValues
  export let position = 'bottom'
  export let accessor = $xAccessor
  $xAccessor = accessor
  let _class = ''
  export { _class as class }

  if (scale) {
    $xScale = scale
  } else if ($xScale) {
    scale = $xScale
  } else {
    scale = scaleLinear()
  }

  let _range = typeof range !== 'function' ? () => range : range
  let _domain = typeof domain !== 'function' ? () => domain : domain
  let _tickValues =
    typeof tickValues !== 'function' ? () => tickValues || [] : tickValues

  $: $xScale.range(_range($innerWidth, $innerHeight))
  $: $xScale.domain(_domain($data, $xAccessor, $bins))
</script>

<Axis class={_class + ' x'} {position}>
  {#await Tick() then value}
    {#each _tickValues(scale) as tick, index (+tick || tick)}
      <slot {index} {tick}>
        <XTick
          x={(scale(tick) * 100) / $innerWidth}
          {tick}
          formatter={(d) => d}
          inParams={{ duration: 100 * index, x: 0, y: 36 }}
          outParams={{ duration: 50 * index, x: 0, y: 36 }}
        />
      </slot>
    {/each}
  {/await}

  <slot name="label" slot="label" />
</Axis>

<style>
</style>
