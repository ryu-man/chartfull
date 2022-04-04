<script context="module">
  import { getContext } from 'svelte'

  export const Key = {}
  export const context = () => getContext(Key)
</script>

<script>
  import { classNames } from '../utils'

  export let x = 0
  export let y = 0
  export let scale
  export let tickArguments
  export let tickValues
  export let tickFormat

  export let fontFamily
  export let fontSize
  export let fontSizeAdjust
  export let fontStretch
  export let fontStyle
  export let fontVariant
  export let fontWeight

  export let style

  let _class
  export { _class as class }

  const identity = (d) => d

  $: ticks =
    tickValues ?? scale?.ticks?.apply(scale, tickArguments) ?? scale.domain()

  $: format =
    tickFormat ?? scale?.tickFormat?.apply(scale, tickArguments) ?? identity

</script>

<g
  class={classNames(_class, 'axis')}
  transform={`translate(${x}, ${y})`}
  font-family={fontFamily}
  font-size={fontSize}
  font-weight={fontWeight}
  font-size-adjust={fontSizeAdjust}
  font-stretch={fontStretch}
  font-style={fontStyle}
  font-variant={fontVariant}
  {style}
>
  <slot {ticks} {format} />
</g>

<style>
  .x.top.axis :global(.tick text) {
    dominant-baseline: text-after-edge;
  }
  .x.bottom.axis :global(.tick text) {
    dominant-baseline: hanging;
  }
  .x.axis :global(.label > :not(.raw)) {
    transform: translateY(-8px);
  }
  .x.axis :global(.label text:not(.raw)) {
    font-size: 10pt;
    text-anchor: end;
    fill: rgb(175, 175, 175);
  }

  .y.axis :global(.tick text) {
    dominant-baseline: central;
  }
  .y.axis :global(.label > :not(.raw)) {
    transform: translate(8px, 0) rotate(-90deg);
  }
  .y.axis :global(.label text:not(.raw)) {
    font-size: 10pt;
    fill: rgb(175, 175, 175);
    text-anchor: end;
    dominant-baseline: hanging;
  }
</style>
