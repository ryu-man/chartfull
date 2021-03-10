<script>
  import { setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { scaleLinear, scaleOrdinal } from 'd3-scale'
  import { schemeCategory10 } from 'd3-scale-chromatic'
  import { group } from 'd3-array'
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
  export let updateOnResize = false
  let _class = ''
  export { _class as class }

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }
  let innerSize = getInnerSize({ width, height }, padding)

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleLinear()),
    yScale = writable(scaleLinear()),
    data: _data = writable(data),
    entries = writable([]),
    colorScale = writable([]),
    width: _width = writable(width),
    height: _height = writable(height),
    innerWidth = writable(innerSize.innerWidth),
    innerHeight = writable(innerSize.innerHeight),
    zAccessor = writable((d) => d.z),
    xTicks = writable(null),
    yTicks = writable(null),
    ...rest
  } = graficoContext() ?? {}

  let context = {
    colorScale,
    width: _width,
    height: _height,
    innerWidth,
    innerHeight,
    margin: padding,
    padding,
    data: _data,
    entries,
    defaultXScale: scaleLinear,
    defaultYScale: scaleLinear,
    defaultZScale: scaleLinear,
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
    return configure(node, data)
  }

  function basicConfiguration(node, data = []) {
    $_width = node.offsetWidth
    $innerWidth = $_width - padding.left - padding.right
    $innerHeight = $_height - padding.top - padding.bottom
    if (typeof groupBy === typeof '') {
      $entries = Array.from(group(data, (d) => d[groupBy]).entries())
    } else {
      $entries = Array.from(group(data, groupBy).entries())
    }

    $colorScale = scaleOrdinal()
      .domain($entries.map((e) => e[0]))
      .range(colorRange)

    let resizeListener
    if (updateOnResize) {
      resizeListener = window.addEventListener('resize', (e) => {
        $_width = node.offsetWidth
        $innerWidth = $_width - padding.left - padding.right
      })
    }

    return {
      update(data) {
        $entries = Array.from(group(data, groupBy).entries())

        $_width = node.offsetWidth
        $innerWidth = $_width - padding.left - padding.right
        $innerHeight = $_height - padding.top - padding.bottom

        $colorScale.domain($entries.map((e) => e[0]))
      },
      destroy() {
        resizeListener && window.removeEventListener(resizeListener)
      }
    }
  }
</script>

<figure
  use:css={style}
  use:init={data}
  class="{_class && `${_class} `}grafico"
  style={`--height:${height}px;`}
>
  <div
    class="elements"
    style={`padding:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`}
  >
    <div class="inner">
      {#await tick() then value}
        <slot name="xaxis" />
        <slot name="yaxis" />
        <slot name="legend" />
      {/await}
    </div>
  </div>
  <svg
    {height}
    viewBox="0 0 {$innerWidth} {$innerHeight}"
    preserveAspectRatio="none"
    style={`padding:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`}
  >
    {#await tick() then value}
      <slot
        entries={$entries}
        innerWidth={$innerWidth}
        innerHeight={$innerHeight}
        colorScale={$colorScale}
        xScale={$xScale}
        yScale={$yScale}
      />

      <slot name="grid" />
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
  .elements > .inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .grafico :global(figcaption) {
    position: absolute;
    bottom: 101%;
    right: 0;
    font-weight: 600;
    font-size: 1.2em;
  }
</style>
