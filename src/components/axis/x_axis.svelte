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
    xScales,
    xTickValues,
    data,
    bins,
    defaultXDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [0, innerWidth]
  } = graficoContext()
  let { xAxisId } = graficoContext()

  export let id = 'default'
  export let domain = defaultXDomain
  export let range = defaultRange
  export let scale
  export let tickValues
  export let position = 'bottom'
  let _class = ''
  export { _class as class }

  xAxisId = id
  const Scale = xScales[id]

  if (scale) {
    $Scale = scale
  } else if ($Scale) {
    scale = $Scale
  } else {
    scale = scaleLinear()
    $Scale = scale
  }

  let Range = typeof range !== 'function' ? () => range : range
  let Domain = typeof domain !== 'function' ? () => domain : domain
  let TickValues =
    typeof tickValues !== 'function' ? () => tickValues || [] : tickValues

  $xTickValues = TickValues

  $: $Scale = $Scale.range(Range($innerWidth, $innerHeight))
  $: $Scale = $Scale.domain(Domain($data, $bins))
</script>

<Axis class={_class + ' x'} {position} {id}>
  {#await Tick() then value}
    {#each TickValues($Scale) as tick, index (+tick || tick)}
      <slot
        {index}
        {tick}
        x={($Scale(tick) * 100) / $innerWidth}
        y={0}
        {tickPosition}
      >
        <span
          use:tickPosition={{ x: ($Scale(tick) * 100) / $innerWidth, y: 0 }}
          class="tick">{tick}</span
        >
      </slot>
    {/each}
  {/await}

  <slot name="label" slot="label" />
</Axis>

<style>
</style>
