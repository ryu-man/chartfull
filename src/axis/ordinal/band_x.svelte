<script>
  import XAxis from '../x_axis.svelte'
  import { scaleBand } from 'd3-scale'
  import { graficoContext } from '../../../context.svelte'

  const { innerWidthStore, innerHeightStore } = graficoContext()

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
  let scale = scaleBand()

  round && scale.round(round)
  padding && scale.padding(padding)
  paddingInner && scale.paddingInner(paddingInner)
  paddingOuter && scale.paddingOuter(paddingOuter)
  align && scale.align(align)

  let formatter = (d) => d
  
  $: rangeRound &&
    scale.rangeRound(rangeRound)
</script>

<XAxis
  class={_class}
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
  <slot {tick} {index} {x} {y} {tickPosition} bandmid={((scale?.bandwidth?.() ?? 0) * 100) / $innerWidthStore / 2}>
    <span
      use:tickPosition={{
        x: (scale(tick) * 100) / $innerWidthStore + (((scale?.bandwidth?.() ?? 0) * 100) / $innerWidthStore / 2),
        y: 0
      }}
      class="tick">{tick}</span
    >
  </slot>

  <slot name="label" slot="label" />
</XAxis>
