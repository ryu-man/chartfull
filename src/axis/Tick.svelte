<script>
  // https://github.com/d3/d3-axis/blob/master/src/axis.js

  // import { context } from './Axis.svelte'
  import { get } from './TickContext.svelte'
  const context = get()

  const {
    k,
    xy,
    size: _size,
    padding: _padding,
    offsetX: _offsetX,
    offsetY: _offsetY,
    textAnchor
  } = $context

  export let x = 0
  export let y = 0
  export let value = ''

  export let size = _size
  export let padding = _padding
  export let offsetX = _offsetX
  export let offsetY = _offsetY

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
  export let fill = '#545863'
  export let x2
  export let y2

  $: props = {
    x: 0,
    y: 0,
    [xy]: k * padding
  }
</script>

<g
  class="tick"
  transform={`translate(${x + offsetX},${y + offsetY})`}
  font-family={fontFamily}
  font-size={fontSize}
  font-weight={fontWeight}
  font-size-adjust={fontSizeAdjust}
  font-stretch={fontStretch}
  font-style={fontStyle}
  font-variant={fontVariant}
  {fill}
  text-anchor={textAnchor}
  alignment-baseline="middle"
  {...props}
  on:click
>
  <line
    {...{ [xy + '2']: size * k }}
    {x2}
    {y2}
    {stroke}
    stroke-width={strokeWidth}
    stroke-opacity={strokeOpacity}
    stroke-linecap={strokeLinecap}
    stroke-linejoin={strokeLinejoin}
    stroke-dasharray={strokeDasharray}
    stroke-dashoffset={strokeDashoffset}
    stroke-miterlimit={strokeMiterlimit}
  />
  <slot {k} {size} {...props}>
    <text {...props}>{value}</text>
  </slot>
</g>

<style>
  text {
    vector-effect: non-scaling-stroke;
  }
</style>
