<script>
  import { css } from '../utils'

  // https://github.com/d3/d3-axis/blob/master/src/axis.js

  import { context } from './Axis.svelte'
  const store = context()
  const {
    orient,
    tickSize: _tickSize,
    tickPadding: _tickPadding,
    offset: _offset
  } = $store

  export let x = 0
  export let y = 0
  export let value = ''

  export let tickSize = _tickSize
  export let tickPadding = _tickPadding
  export let offset = _offset

  export let style = {}

  $: isXOrY = ['top', 'bottom'].includes(orient) ? true : false
  $: offsetX = !isXOrY ? offset : 0
  $: offsetY = isXOrY ? offset : 0

  $: spacing = Math.max(tickSize, 0) + tickPadding
  $: k = ['top', 'left'].includes(orient) ? -1 : 1
  $: xy = isXOrY ? 'y' : 'x'
  $: textAnchor = xy === 'y' ? 'middle' : orient === 'left' ? 'end' : 'start'

  $: props = {
    [xy]: k * spacing,
    ['d' + xy]:
      orient === 'top' ? '0em' : orient === 'bottom' ? '0.71em' : '0.32em',
    'text-anchor': textAnchor
  }

</script>

<g class="tick" transform={`translate(${x + offsetX},${y + offsetY})`}>
  <slot>
    <line stroke="black" {...{ [xy + '2']: tickSize * k }} />
  </slot>

  <text use:css={style} {...props}>{value}</text>
</g>
