<script context="module">
  export function tickPosition(node, { x = 0, y = 0, position = 'bottom' }) {
    function setPos({ x = 0, y = 0, position = 'left' }) {
      node.style.left = `${x}%`
      if (position === 'bottom') {
        node.style.top = `${y}%`
      }
      if (position === 'top') {
        node.style.bottom = `${y}%`
      }
    }
    setPos({ x, y, position })
    return {
      update({ x = 0, y = 0, position = 'left' }) {
        setPos({ x, y, position })
      }
    }
  }
</script>

<script>
  import { graficoContext } from '../../context.svelte'
  import { tick as Tick } from 'svelte'
  import { scaleLinear } from 'd3-scale'
  import { extent } from 'd3-array'
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
      <slot
        {index}
        {tick}
        x={($xScale(tick) * 100) / $innerWidth}
        y={0}
        {tickPosition}
      >
        <span
          use:tickPosition={{ x: ($xScale(tick) * 100) / $innerWidth, y: 0 }}
          class="tick">{tick}</span
        >
      </slot>
    {/each}
  {/await}

  <slot name="label" slot="label" />
</Axis>

<style>
</style>
