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
  import { scaleStore } from '../scales'
  import { Declare } from '../components'
  import Axis from './Axis.svelte'
  import XTickValuesUpdater from './XTickValuesUpdater.svelte'

  const { innerWidthStore, xScales } = graficoContext()
  let { xAxisId } = graficoContext()

  export let id = 'default'
  export let position = 'bottom'
  export let scale
  export let ticks
  export let tickArguments
  export let tickValues
  export let tickFormat

  let _class = ''
  export { _class as class }

  xAxisId = id
  xScales[id] = scaleStore(scale)
</script>

<Axis
  class={_class + ' x'}
  {scale}
  {position}
  {id}
  {ticks}
  {tickArguments}
  {tickValues}
  {tickFormat}
  let:values
  let:format
>
  <XTickValuesUpdater tickValues={values} {id}>
    {#each values as tick, index (tick)}
      <Declare value={(scale(tick) * 100) / $innerWidthStore} let:value={x}>
        <slot {index} {tick} {x} y={0} {tickPosition}>
          <span
            use:tickPosition={{
              x,
              y: 0
            }}
            class="tick">{format(tick)}</span
          >
        </slot>
      </Declare>
    {/each}
  </XTickValuesUpdater>

  <slot name="label" slot="label" />
</Axis>
