<script>
  import { group, scaleOrdinal, schemeCategory10 } from 'd3'
  import { tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { linear } from './components/scales'
  import { graficoContext, key, updateGraficoContext } from './context.svelte'
  import { css } from './utils'

  export let width = 300
  export let height = 300
  export let margin = {}
  export let data = []
  export let groupBy = (d) => ''
  export let colorRange = schemeCategory10
  export let style = {}
  let _class = ''
  export { _class as class }
  export let type = ''

  let _padding = { top: 32, right: 32, bottom: 72, left: 72, ...margin }
  let innerWidth = width - _padding.left - _padding.right
  let innerHeight = height - _padding.top - _padding.bottom

  let colorScale

  let entries = []

  let keys = []

  const { xAccessor, yAccessor } = graficoContext() ?? {}

  const _width = writable(width)
  const _height = writable(height)
  const _innerWidth = writable(innerWidth)
  const _innerHeight = writable(innerHeight)
  const __margin = writable(_padding)
  const _data = writable(data)
  const _entries = writable([])
  const _keys = writable(keys)
  const _xscale = writable(linear())
  const _yscale = writable(linear())
  const _colorScale = writable(undefined)

  let context = graficoContext()
  context = {
    colorScale,
    width: _width,
    height: _height,
    innerWidth: _innerWidth,
    innerHeight: _innerHeight,
    margin: _padding,
    keys,
    data: _data,
    entries: _entries,
    defaultXScale: linear,
    xScale: _xscale,
    defaultYScale: linear,
    yScale: _yscale,
    defaultZScale: linear,
    xAccessor: xAccessor ?? writable((d) => d.x),
    yAccessor: yAccessor ?? writable((d) => d.y),
    zAccessor: writable((d) => d.z),
    xTicks: writable(null),
    yTicks: writable(null),
    type
  }

  updateGraficoContext(context)

  function init(node, data) {
    css(node, style)
    // data = data.sort((a, b) => xAccessor(a) - xAccessor(b))
    if (typeof groupBy === typeof '') {
      entries = Array.from(group(data, (d) => d[groupBy]).entries())
    } else {
      entries = Array.from(group(data, groupBy).entries())
    }
    keys = entries.map((e) => e[0])
    $_entries = entries

    width = node.offsetWidth
    innerWidth = width - _padding.left - _padding.right
    innerHeight = height - _padding.top - _padding.bottom

    colorScale = scaleOrdinal().domain(keys).range(colorRange)

    $_width = width
    $_innerWidth = innerWidth
    $_innerHeight = innerHeight
    $_keys = keys
    $_colorScale = colorScale

    return {
      update(data) {
        entries = Array.from(group(data, groupBy).entries())
        keys = entries.map((e) => e[0])
        $_entries = entries
        width = node.offsetWidth
        innerWidth = width - _padding.left - _padding.right
        innerHeight = height - _padding.top - _padding.bottom

        $_width = width
        $_innerWidth = innerWidth
        $_innerHeight = innerHeight
        $_keys = keys

        colorScale.domain(keys)
      }
    }
  }
</script>

<figure
  use:init={data}
  class="{_class && `${_class} `}chartist"
  style={`--height:${height}px;`}
  transition:fade={{ duration: 100 }}
>
  <div
    class="elements"
    style={`padding:${_padding.top}px ${_padding.right}px ${_padding.bottom}px ${_padding.left}px;`}
  >
    <slot name="onther" />
    {#await tick() then value}
      <slot name="content" />
    {/await}
  </div>
  <svg
    {height}
    viewBox="0 0 {innerWidth} {innerHeight}"
    preserveAspectRatio="none"
    vector-effect="non-scaling-stroke"
    style={`padding:${_padding.top}px ${_padding.right}px ${_padding.bottom}px ${_padding.left}px;`}>
    {#await tick() then value}
      <slot
        entries={$_entries}
        {innerWidth}
        {innerHeight}
        {keys}
        {colorScale}
        xScale={$_xscale}
        yScale={$_yscale}
      />
    {/await}
  </svg>
</figure>

<style>
  .chartist {
    width: 100%;
    min-width: 600px;
    height: var(--height);
    min-height: 300px;
    position: relative;
    margin: 0;
  }
  svg {
    width: 100%;
    overflow: visible;
    box-sizing: border-box;
  }
  .elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  :global(.elements > div) {
    position: relative;
    width: 100%;
    height: 100%;
  }
  :global(.chartist figcaption) {
    position: absolute;
    bottom: 105%;
    right: 0;
    font-weight: 600;
    font-size: 1.2em;
  }
</style>
