<script>
  import { css } from '../utils'

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

  export let style = {}

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
    [xy]: k * padding,
    'text-anchor': textAnchor,
    'font-family': 'system-ui'
  }

  let sl
</script>

<g class="tick" transform={`translate(${x + offsetX},${y + offsetY})`} on:click>
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
    {fill}
    use:css={style}
  />
  <slot {k} {size} {props}>
    <text alignment-baseline="middle" {...props}>{value}</text>
  </slot>
</g>

<style>
  text {
    vector-effect: non-scaling-stroke;
  }
</style>
