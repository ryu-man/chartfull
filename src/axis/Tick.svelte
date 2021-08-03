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
    textAnchor,
    tickColor = '#D8D8D8'
  } = $context

  export let x = 0
  export let y = 0
  export let value = ''

  export let size = _size
  export let padding = _padding
  export let offsetX = _offsetX
  export let offsetY = _offsetY

  export let style = {}

  $: props = {
    [xy]: k * padding,
    fill: '#545863',
    'text-anchor': textAnchor,
    'font-family': 'system-ui'
  }
</script>

<g class="tick" transform={`translate(${x + offsetX},${y + offsetY})`} on:click>
  <slot {k} {size} {props}>
    <line stroke={tickColor} {...{ [xy + '2']: size * k }} />
    <text alignment-baseline="middle" use:css={style} {...props}>{value}</text>
  </slot>
</g>

<style>
  text {
    vector-effect: non-scaling-stroke;
  }
</style>
