<script>
  import { graficoContext } from '../Grafico.svelte'
  import { Declare } from '../components'
  import { classNames } from '../utils'
  import Axis from './Axis.svelte'
  import Tick from './Tick.svelte'
  import TickContext from './TickContext.svelte'
  import { writable } from 'svelte/store'

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
  export let tickPadding = 4
  export let offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5
  export let tickColor

  export let stroke = '#545863'
  export let strokeWidth
  export let strokeOpacity
  export let strokeLinecap
  export let strokeLinejoin
  export let strokeDasharray
  export let strokeDashoffset
  export let strokeMiterlimit
  export let fill = 'none'
  export let d

  let _class = ''
  export { _class as class }

  $: $scales[id] = scale

  const k = orient === 'top' ? -1 : 1

  const context = writable({
    xy: 'y',
    k,
    offsetX: 0,
    offsetY: offset,
    size: tickSize,
    padding: tickPadding,
    textAnchor: 'middle',
    tickColor
  })

  $: !d && (d = `M0,${k * 6}V0H${$innerWidthStore}V${k * 6}`)

</script>

<TickContext value={context}>
  <Axis
    class={classNames(_class, 'x')}
    {scale}
    {x}
    {y}
    {id}
    {ticks}
    {tickArguments}
    {tickValues}
    {tickFormat}
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

    <path
      class="domain"
      {fill}
      {stroke}
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDasharray}
      stroke-dashoffset={strokeDashoffset}
      stroke-opacity={strokeOpacity}
      stroke-linecap={strokeLinecap}
      stroke-linejoin={strokeLinejoin}
      stroke-miterlimit={strokeMiterlimit}
      {d}
    />

    <slot name="label" />
  </Axis>
</TickContext>
