<script>
  import { graficoContext } from '../Grafico.svelte'
  import { Declare } from '../components'
  import { classNames } from '../utils'
  import Axis from './Axis.svelte'
  import Tick from './Tick.svelte'

  const { innerHeightStore, scales } = graficoContext()

  export let id = 'y'
  export let x = 0
  export let y = 0
  export let scale
  export let ticks
  export let orient = 'left'
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
  class={classNames(_class, 'y')}
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
    <Declare value={scale(tick)} let:value={y}>
      <slot {index} {tick} x={0} {y} {format}>
        <Tick {y} value={format(tick)} />
      </slot>
    </Declare>
  {/each}

  <slot name="path" d={`M-6,0H0V${$innerHeightStore}H-6`}>
    <path
      class="domain"
      fill="none"
      stroke="black"
      strokeWidth={2}
      d={`M-6,0H0V${$innerHeightStore}H-6`}
    />
  </slot>

  <slot name="label" />
</Axis>

<style>
  
</style>
