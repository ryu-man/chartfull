<script>
  import { group, scaleOrdinal, schemeCategory10 } from 'd3'
  import { getContext, setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { linear } from './components/scales'
  import { graficoContext, key } from './context.svelte'
  import { css, getInnerSize } from './utils'

  export let configure = basicConfiguration
  export let width = 300
  export let height = 300
  export let padding = {}
  export let data = []
  export let groupBy = (d) => ''
  export let colorRange = schemeCategory10
  export let style = {}
  let _class = ''
  export { _class as class }

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }
  let { innerWidth, innerHeight } = getInnerSize({ width, height }, padding)

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(linear()),
    yScale = writable(linear()),
    entries = writable([]),
    keys = writable([]),
    colorScale = writable([]),
    width: _width = writable(width),
    height: _height = writable(height),
    innerWidth: _innerWidth = writable(innerWidth),
    innerHeight: _innerHeight = writable(innerHeight),
    zAccessor = writable((d) => d.z),
    xTicks = writable(null),
    yTicks = writable(null),
    ...rest
  } = graficoContext() ?? {}

  // const _width = writable(width)
  // const _height = writable(height)
  // const _innerWidth = writable(innerWidth)
  // const _innerHeight = writable(innerHeight)
  const _padding = writable(padding)
  const _data = writable(data)
  // const _entries = entries
  const _keys = keys
  const _xscale = xScale
  const _yscale = yScale
  const _xaccessor = xAccessor
  const _yaccessor = yAccessor
  const _colorScale = colorScale

  let context = {
    colorScale,
    width: _width,
    height: _height,
    innerWidth: _innerWidth,
    innerHeight: _innerHeight,
    margin: padding,
    padding,
    keys,
    data: _data,
    entries,
    defaultXScale: linear,
    defaultYScale: linear,
    defaultZScale: linear,
    xScale,
    yScale,
    xAccessor,
    yAccessor,
    zAccessor,
    xTicks,
    yTicks,
    ...rest
  }

  setContext(key, context)

  function init(node, data) {
    $_width = node.offsetWidth

    $_innerWidth = width - padding.left - padding.right
    $_innerHeight = height - padding.top - padding.bottom

    return configure(node, data, {
      width,
      height,
      padding
    })
  }

  function basicConfiguration(node, data = [], { width, height, padding }) {
    // data = data.sort((a, b) => xAccessor(a) - xAccessor(b))
    if (typeof groupBy === typeof '') {
      $entries = Array.from(group(data, (d) => d[groupBy]).entries())
    } else {
      $entries = Array.from(group(data, groupBy).entries())
    }
    $keys = $entries.map((e) => e[0])

    $colorScale = scaleOrdinal().domain(keys).range(colorRange)

    return {
      update(data) {
        $entries = Array.from(group(data, groupBy).entries())
        $keys = $entries.map((e) => e[0])

        $_width = node.offsetWidth
        $_innerWidth = width - padding.left - padding.right
        $_innerHeight = height - padding.top - padding.bottom

        $colorScale.domain($keys)
      }
    }
  }
</script>

<figure
  use:css={style}
  use:init={data}
  class="{_class && `${_class} `}grafico"
  style={`--height:${height}px;`}
  transition:fade={{ duration: 100 }}
>
  <div
    class="elements"
    style={`padding:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`}
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
    style={`padding:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`}
  >
    {#await tick() then value}
      <slot
        entries={$entries}
        innerWidth={$_innerWidth}
        innerHeight={$_innerHeight}
        keys={$keys}
        colorScale={$colorScale}
        xScale={$xScale}
        yScale={$yScale}
      />
    {/await}
  </svg>
</figure>

<style>
  .grafico {
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
  .elements > :global(div) {
    position: relative;
    width: 100%;
    height: 100%;
    /* display: contents; */
  }
  .grafico :global(figcaption) {
    position: absolute;
    bottom: 105%;
    right: 0;
    font-weight: 600;
    font-size: 1.2em;
  }
</style>
