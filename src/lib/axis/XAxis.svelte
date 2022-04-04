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
  export let tickPadding = 8
  export let tickOffset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5
  export let tickColor

  export let fontFamily
  export let fontSize
  export let fontSizeAdjust
  export let fontStretch
  export let fontStyle
  export let fontVariant
  export let fontWeight

  export let stroke = '#9b9b9b'
  export let strokeWidth = 2
  export let strokeOpacity
  export let strokeLinecap
  export let strokeLinejoin
  export let strokeDasharray
  export let strokeDashoffset
  export let strokeMiterlimit
  export let fill = '#9b9b9b'
  export let d

  let _class = ''
  export { _class as class }

  const k = orient === 'top' ? -1 : 1

  const isPathDataSet = !!d

  const context = writable({
    xy: 'y',
    k,
    offset: tickOffset,
    size: tickSize,
    padding: tickPadding,
    textAnchor: 'middle',
    tickColor
  })

  $: $context.size = tickSize
  $: $context.padding = tickPadding
  $: $context.offset = tickOffset

  $: $scales[id] = scale
  $: !isPathDataSet && (d = `M0,${k * 6}V0H${$innerWidthStore}V${k * 6}`)
</script>

<TickContext value={context}>
  <Axis
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
    class={classNames(_class, 'x', orient)}
    style="--axis-fill: {fill};"
    let:ticks
    let:format
  >
    {#each ticks as tick, index (+tick || tick)}
      <Declare value={scale(tick)} let:value={x}>
        <slot
          {index}
          {tick}
          {x}
          y={0}
          {format}
          formatedTick={format(tick)}
          text={format(tick)}
        >
          <Tick {x}>
            <text>{format(tick)}</text>
          </Tick>
        </slot>
      </Declare>
    {/each}

    <path
      class="domain"
      fill="none"
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

    <g class="label">
      <slot name="label" />
    </g>
  </Axis>
</TickContext>
