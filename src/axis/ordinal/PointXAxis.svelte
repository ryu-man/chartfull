<script>
  import XAxis from '../XAxis.svelte'
  import { scalePoint } from 'd3-scale'
  import { max } from 'd3-array'

  export let id = 'default'
  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let round = false
  export let padding
  export let paddingInner
  export let paddingOuter
  export let align
  export let tickValues = (scale) => scale.domain()

  let _class
  export { _class as class }
  export let position
  let scale = scalePoint()

  round && scale.round(round)
  padding && scale.padding(padding)
  paddingInner && scale.paddingInner(paddingInner)
  paddingOuter && scale.paddingOuter(paddingOuter)
  align && scale.align(align)

  $: rangeRound && scale.rangeRound(rangeRound)
  $: maxRange = max(range || rangeRound)
</script>

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
  <slot {tick} {index} {x} {y} {tickPosition}>
    <span
      use:tickPosition={{ x: (scale(tick) * 100) / maxRange, y: 0 }}
      class="tick">{tick}</span
    >
  </slot>

  <slot name="label" slot="label" />
</XAxis>
