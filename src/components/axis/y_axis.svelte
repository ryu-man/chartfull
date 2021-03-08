<script>
  import { graficoContext } from '../../context.svelte'
  import { tick as Tick } from 'svelte'
  import { scaleLinear } from 'd3-scale'
  import { extent } from 'd3-array'
  import YTick from './y_tick.svelte'
  import Axis from './axis.svelte'

  const {
    innerWidth,
    innerHeight,
    yScale,
    yAccessor,
    yTicks,
    data,
    bins,
    defaultYDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [innerHeight, 0]
  } = graficoContext()

  export let domain = defaultYDomain
  export let range = defaultRange
  export let scale
  export let tickValues = []
  export let position = 'left'
  export let accessor = $yAccessor
  $yAccessor = accessor
  let _class = ''
  export { _class as class }

  if (scale) {
    $yScale = scale
  } else if ($yScale) {
    scale = $yScale
  } else {
    scale = scaleLinear()
    $yScale = scale
  }

  let _range = typeof range !== 'function' ? () => range : range
  let _domain = typeof domain !== 'function' ? () => domain : domain
  let _tickValues =
    typeof tickValues !== 'function' ? () => tickValues || [] : tickValues

  $: $yScale.range(_range($innerWidth, $innerHeight))
  $: $yScale.domain(_domain($data, $yAccessor, $bins))
</script>

<Axis class={_class + ' y'} {position}>
  {#await Tick() then value}
    {#each _tickValues($yScale) as tick, index (+tick || tick)}
      <slot {index} {tick}>
        <YTick
          y={(scale(tick) * 100) / $innerHeight}
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
