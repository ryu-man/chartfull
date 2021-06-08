<script>
  import { graficoContext } from '../Context.svelte'
  import { scaleStore } from '../scales'
  import { Declare } from '../components'
  import { classNames } from '../utils'
  import Axis from './Axis.svelte'

  const { innerHeightStore, yScales, yTickValues } = graficoContext()
  let { yAxisId } = graficoContext()

  export let id = 'default'
  export let x = 0
  export let y = 0
  export let scale
  export let ticks
  export let orient = 'left'
  export let tickArguments
  export let tickValues
  export let tickFormat

  export let tickSize = -6
  export let tickPadding = 3
  export let offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5

  let _class = ''
  export { _class as class }

  yAxisId = id
  yScales[id] = scaleStore(scale)

  $: $yTickValues = tickValues

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
      <slot {index} {tick} {x} y={0} {format}>
        <g class="tick" transform={`translate(0,${y})`}>
          <line stroke="black" x2={tickSize} />
          <text dx={-20} text-anchor="end">{format(tick)}</text>
        </g>
      </slot>
    </Declare>
  {/each}
  <path
    class="domain"
    fill="none"
    stroke="black"
    strokeWidth={2}
    d={`M-6,0H0V${$innerHeightStore}H-6`}
  />

  <slot name="label" slot="label" />
</Axis>

<style>
  text {
    vector-effect: non-scaling-stroke;
  }

</style>
