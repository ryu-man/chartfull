<script>
  import { graficoContext } from '../Grafico.svelte'
  import { Declare } from '../components'
  import { classNames } from '../utils'
  import Axis from './Axis.svelte'
  import Tick from './Tick.svelte'
  import TickContext from './TickContext.svelte'
  import { writable } from 'svelte/store'

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
  export let tickPadding = 4
  export let offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5

  export let fontFamily
  export let fontSize
  export let fontSizeAdjust
  export let fontStretch
  export let fontStyle
  export let fontVariant
  export let fontWeight

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

  const k = orient === 'left' ? -1 : 1

  const context = writable({
    xy: 'x',
    k,
    offsetX: offset,
    offsetY: 0,
    size: tickSize,
    padding: tickPadding,
    textAnchor: orient === 'left' ? 'end' : 'start'
  })

  $: !d && (d = `M${k * 6},0H0V${$innerHeightStore}H${k * 6}`)
</script>

<TickContext value={context}>
  <Axis
    class={classNames(_class, 'y')}
    {scale}
    {x}
    {y}
    {id}
    {ticks}
    {tickArguments}
    {tickValues}
    {tickFormat}
    {fontFamily}
    {fontWeight}
    {fontSize}
    {fontSizeAdjust}
    {fontVariant}
    {fontStyle}
    {fontStretch}
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

<style>
</style>
