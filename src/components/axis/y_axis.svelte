<script context="module">
  export function tickPosition(node, { x = 0, y = 0, position = 'left' }) {
    function setPos({ x = 0, y = 0, position = 'left' }) {
      node.style.top = `${y}%`
      if (position === 'left') {
        node.style.right = `${x}%`
      }
      if (position === 'right') {
        node.style.left = `${x}%`
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
    yScales,
    yTickValues,
    data,
    bins,
    defaultYDomain = (data, accessor, bins) => extent(data, accessor),
    defaultRange = (innerWidth, innerHeight) => [innerHeight, 0]
  } = graficoContext()
  let {yAxisId} = graficoContext()

  export let id = 'default'
  export let domain = defaultYDomain
  export let range = defaultRange
  export let scale
  export let tickValues = []
  export let position = 'left'
  let _class = ''
  export { _class as class }

  const Scale = yScales[id]
  yAxisId = id

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

  $yTickValues = TickValues

  $: $Scale.range(Range($innerWidth, $innerHeight))
  $: $Scale.domain(Domain($data, $bins))
</script>

<Axis class={_class + ' y'} {position} {id}>
  {#await Tick() then value}
    {#each TickValues($Scale) as tick, index (+tick || tick)}
      <slot
        {index}
        {tick}
        y={($Scale(tick) * 100) / $innerHeight}
        x={0}
        {tickPosition}
      >
        <span
          use:tickPosition={{ y: ($Scale(tick) * 100) / $innerHeight, x: 0 }}
          class="tick">{tick}</span
        >
      </slot>
    {/each}
  {/await}

  <slot name="label" slot="label" />
</Axis>

<style>
</style>
