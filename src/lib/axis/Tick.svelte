<script>
  // https://github.com/d3/d3-axis/blob/master/src/axis.js

  import { get } from './TickContext.svelte'
  const context = get()

  const k = $context.k
  const xy = $context.xy
  const textAnchor = $context.textAnchor

  export let x = 0
  export let y = 0
  export let value = ''

  export let size
  const reactOnSizeChange = !size
  reactOnSizeChange && (size = $context.size)
  $: reactOnSizeChange && (size = $context.size)

  export let padding
  const reactOnPaddingChange = !padding
  reactOnPaddingChange && (padding = $context.padding)
  $: reactOnPaddingChange && (padding = $context.padding)

  const offsets = {
    x: 0,
    y: 0
  }
  export let offset
  const reactOnOffsetChange = !offset
  reactOnOffsetChange && (offsets[$context.xy] = $context.offset)
  $: reactOnOffsetChange && (offsets[$context.xy] = $context.offset)
  $: !reactOnOffsetChange && (offsets[$context.xy] = offset)

  export let fontFamily
  export let fontSize = '12pt'
  export let fontSizeAdjust
  export let fontStretch
  export let fontStyle
  export let fontVariant
  export let fontWeight

  export let stroke = '#e8e8e8'
  export let strokeWidth
  export let strokeOpacity
  export let strokeLinecap
  export let strokeLinejoin
  export let strokeDasharray
  export let strokeDashoffset
  export let strokeMiterlimit
  export let fill = 'var(--axis-fill)'

  export let x1=0
  export let x2
  const reactOnX2 = !x2 && xy === 'x'
  reactOnX2 && (x2 = $context.size)
  $: reactOnX2 && (x2 = $context.size)

  export let y1=0
  export let y2
  const reactOnY2 = !y2 && xy === 'y'
  reactOnY2 && (y2 = $context.size)
  $: reactOnY2 && (y2 = $context.size)

  $: props = {
    x: 0,
    y: 0,
    [xy]: k * padding
  }
</script>

<g
  class="tick {xy}"
  transform={`translate(${x + offsets[xy]},${y + offsets[xy]})`}
  font-family={fontFamily}
  font-size={fontSize}
  font-weight={fontWeight}
  font-size-adjust={fontSizeAdjust}
  font-stretch={fontStretch}
  font-style={fontStyle}
  font-variant={fontVariant}
  text-anchor={textAnchor}
  alignment-baseline="middle"
  {...props}
  style="--fill:{fill}; --padding:{k * padding}px;"
  on:click
>
  <line
    {x1}
    {y1}
    {...{ [xy + '2']: size * k, x2: x2 * k, y2: y2 * k }}
    {stroke}
    stroke-width={strokeWidth}
    stroke-opacity={strokeOpacity}
    stroke-linecap={strokeLinecap}
    stroke-linejoin={strokeLinejoin}
    stroke-dasharray={strokeDasharray}
    stroke-dashoffset={strokeDashoffset}
    stroke-miterlimit={strokeMiterlimit}
  />
  <slot {k} {x2} {y2} {...props}>
    <text {...props}>{value}</text>
  </slot>
</g>

<style>
  .tick :global(text:not(.raw)) {
    vector-effect: non-scaling-stroke;
    fill: var(--fill);
  }
  .tick.x :global(text:not(.raw)) {
    transform: translateX(var(--padding));
  }
  .tick.y :global(text:not(.raw)) {
    transform: translateY(var(--padding));
  }
  .tick :global(line) {
  }
</style>
