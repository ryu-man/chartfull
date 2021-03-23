<script>
  import XAxis from '../x_axis.svelte'
  import { scaleUtc } from 'd3-scale'
  import { max } from 'd3-array'
  import { Declare } from '../../components'
  import Continious from './continious.svelte'

  export let id = 'default'
  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let unknown
  export let interpolate
  export let ticks
  export let tickFormat
  export let tickValues = (scale) => scale.ticks()
  export let nice = false

  let _class
  export { _class as class }
  export let scale = scaleUtc()
  export let position = 'bottom'
</script>

<Continious {scale} {nice} {unknown} {clamp} {interpolate} {rangeRound}>
  <XAxis
    class={_class}
    {id}
    {scale}
    {domain}
    {range}
    {position}
    {tickValues}
    let:index
    let:tick
    let:x
    let:y
    let:tickPosition
  >
    <Declare value={scale.tickFormat(ticks, tickFormat)} let:value={format}>
      <slot {tick} {index} {x} {y} {tickPosition} {format}>
        <span
          use:tickPosition={{
            x: (scale(tick) * 100) / max(range || rangeRound),
            y: 0
          }}
          class="tick">{format(tick)}</span
        >
      </slot>
    </Declare>

    <slot name="label" slot="label" />
  </XAxis>
</Continious>
