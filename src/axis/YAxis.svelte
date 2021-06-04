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
  import { scaleStore } from '../scales'
  import { Declare } from '../components'
  import Axis from './Axis.svelte'
  import YTickValuesUpdater from './YTickValuesUpdater.svelte'

  const { innerHeightStore, yScales } = graficoContext()
  let { yAxisId } = graficoContext()

  export let id = 'default'
  export let scale
  export let ticks
  export let tickArguments
  export let tickValues
  export let tickFormat
  export let position = 'left'
  let _class = ''
  export { _class as class }

  yAxisId = id
  yScales[id] = scaleStore(scale)
</script>

<Axis
  class={_class + ' y'}
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
  <YTickValuesUpdater tickValues={values} {id}>
    {#each values as tick, index (tick)}
      <Declare value={(scale(tick) * 100) / $innerHeightStore} let:value={y}>
        <slot {index} {tick} {y} x={0} {tickPosition}>
          <span
            use:tickPosition={{
              y,
              x: 0
            }}
            class="tick">{format(tick)}</span
          >
        </slot>
      </Declare>
    {/each}
  </YTickValuesUpdater>

  <slot name="label" slot="label" />
</Axis>
