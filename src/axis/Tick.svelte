<script>
  import { css } from '../utils'

  // https://github.com/d3/d3-axis/blob/master/src/axis.js

  import { context } from './Axis.svelte'
  const {
    orient,
    tickSize: _tickSize,
    tickPadding: _tickPadding,
    offset: _offset
  } = context()

  export let x = 0
  export let y = 0
  export let value = ''

  export let tickSize
  export let tickPadding
  export let offset

  export let style = {}

  $: tickSize = $_tickSize
  $: tickPadding = $_tickPadding
  $: offset = $_offset

  $: isXOrY = ['top', 'bottom'].includes($orient) ? true : false
  $: offsetX = !isXOrY ? offset : 0
  $: offsetY = isXOrY ? offset : 0

  $: k = ['top', 'left'].includes($orient) ? -1 : 1
  $: spacing = Math.max(tickSize * k, 0) + tickPadding
  $: xy = isXOrY ? 'y' : 'x'
  $: textAnchor = xy === 'y' ? 'middle' : $orient === 'left' ? 'end' : 'start'

  $: props = {
    [xy]: k * spacing,
    /* ['dy']:
      $orient === 'top' ? '0em' : $orient === 'bottom' ? '0.71em' : '0.32em', */
    'text-anchor': textAnchor
  }
</script>

<g class="tick" transform={`translate(${x + offsetX},${y + offsetY})`}>
  <slot {k} {tickSize} {props}>
    <line stroke="black" {...{ [xy + '2']: tickSize }} />
    <text alignment-baseline="middle" use:css={style} {...props}>{value}</text>
  </slot>
</g>

<style>
  text {
    vector-effect: non-scaling-stroke;
  }
</style>
