<script>
  import { graficoContext } from '../Context.svelte'
  import { scaleStore } from '../scales'
  import { Declare } from '../components'
  import { classNames } from '../utils'
  import Axis from './Axis.svelte'

  const { innerWidthStore, xScales, xTickValues } = graficoContext()
  let { xAxisId } = graficoContext()

  export let id = 'default'
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

  xAxisId = id
  xScales[id] = scaleStore(scale)

  $: $xTickValues = tickValues

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
        <g class="tick" transform={`translate(${x},0)`}>
          <line stroke="black" y2={tickSize} />
          <text dy="20" text-anchor="middle">{format(tick)}</text>
        </g>
      </slot>
    </Declare>
  {/each}
  <path
    class="domain"
    fill="none"
    stroke="black"
    strokeWidth={2}
    d={`M0,6V0H${$innerWidthStore}V6`}
  />

  <slot name="label" slot="label" />
</Axis>

<style>
  text {
    vector-effect: non-scaling-stroke;
  }

</style>
