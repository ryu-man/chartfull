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
  import { graficoContext } from '../Context.svelte'
  import { tick as Tick } from 'svelte'
  import { scaleLinear } from 'd3-scale'
  import Axis from './Axis.svelte'
  import { scaleStore } from '../scales'

  const {
    innerWidthStore,
    innerHeightStore,
    yScales,
    yTickValues
  } = graficoContext()
  let { yAxisId } = graficoContext()

  export let id = 'default'
  export let domain = [0, 1]
  export let range = [1, 0]
  export let scale
  export let tickValues
  export let position = 'left'
  let _class = ''
  export { _class as class }

  yAxisId = id
  const Scale = yScales[id]

  if (scale) {
    $Scale = scale
  } else if ($Scale) {
    scale = $Scale
  } else {
    scale = scaleStore(scaleLinear())
    $Scale = scale
  }

  $: $Scale.range(range)
  $: $Scale.domain(Domain($Scale, domain))
  $: $yTickValues = TickValues(tickValues, $Scale)

  function Domain(scale, domain) {
    return typeof domain === 'function' ? domain(scale) : domain || []
  }
  function TickValues(tickValues, scale) {
    return typeof tickValues === 'function'
      ? tickValues(scale)
      : tickValues || []
  }
</script>

<Axis class={_class + ' y'} {position} {id}>
  {#await Tick() then value}
    {#each $yTickValues as tick, index (+tick || tick)}
      <slot
        {index}
        {tick}
        y={(scale(tick) * 100) / $innerHeightStore}
        x={0}
        {tickPosition}
      >
        <span
          use:tickPosition={{
            y: (scale(tick) * 100) / $innerHeightStore,
            x: 0
          }}
          class="tick">{tick}</span
        >
      </slot>
    {/each}
  {/await}

  <slot name="label" slot="label" />
</Axis>

<style>
</style>
