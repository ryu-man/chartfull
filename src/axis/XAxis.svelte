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
  import { graficoContext } from '../Context.svelte'
  import { tick as Tick } from 'svelte'
  import { scaleLinear } from 'd3-scale'
  import Axis from './Axis.svelte'
  import { scaleStore } from '../scale'

  const { innerWidthStore, xScales, xTickValues } = graficoContext()
  let { xAxisId } = graficoContext()

  export let id = 'default'
  export let domain = [0, 1]
  export let range = [0, 1]

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
    scale = scaleStore(scaleLinear())
    $Scale = scale
  }

  $: $Scale.range(range)
  $: $Scale.domain(Domain($Scale, domain))
  $: $xTickValues = TickValues(tickValues, $Scale)

  function Domain(scale, domain) {
    return typeof domain === 'function' ? domain(scale) : domain || []
  }
  function TickValues(tickValues, scale) {
    return typeof tickValues === 'function'
      ? tickValues(scale)
      : tickValues || []
  }
</script>

<Axis class={_class + ' x'} {position} {id}>
  {#await Tick() then value}
    {#each $xTickValues as tick, index (+tick || tick)}
      <slot
        {index}
        {tick}
        x={(scale(tick) * 100) / $innerWidthStore}
        y={0}
        {tickPosition}
      >
        <span
          use:tickPosition={{
            x: (scale(tick) * 100) / $innerWidthStore,
            y: 0
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
