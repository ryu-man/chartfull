<script>
  import { graficoContext } from '../Grafico.svelte'
  import { Declare } from '../components'
  import { classNames } from '../utils'
  import Axis from './Axis.svelte'
  import Tick from './Tick.svelte'

  const { innerWidthStore, scales } = graficoContext()

  export let id = 'x'
  export let x = 0
  export let y = 0
  export let scale
  export let orient = 'top'
  export let ticks
  export let tickArguments
  export let tickValues
  export let tickFormat

  export let tickSize = 6
  export let tickPadding = 3
  export let offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5

  let _class = ''
  export { _class as class }

  $scales[id] = scale
</script>

<Axis
  class={classNames(_class, 'x')}
  {scale}
  {x}
  {y}
  {id}
  {ticks}
  {orient}
  {tickArguments}
  {tickValues}
  {tickFormat}
  {tickSize}
  {tickPadding}
  {offset}
  let:values
  let:format
>
  {#each values as tick, index (tick)}
    <Declare value={scale(tick)} let:value={x}>
      <slot {index} {tick} {x} y={0} {format}>
        <Tick {x} value={format(tick)} />
      </slot>
    </Declare>
  {/each}

  <slot name="path" d={`M0,6V0H${$innerWidthStore}V6`}>
    <path
      class="domain"
      fill="none"
      stroke="black"
      strokeWidth={2}
      d={`M0,6V0H${$innerWidthStore}V6`}
    />
  </slot>

  <slot name="label" />
</Axis>
