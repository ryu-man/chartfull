<script>
  import { writable } from 'svelte/store'
  import { bin, extent, max, group, scaleOrdinal, schemeAccent } from 'd3'
  import { Rect, Grid, XAxis, YAxis } from './components'
  import Context, { graficoContext, key } from './context.svelte'
  import Grafico from './grafico.svelte'
  import { linear } from './components/scales'
  import { getInnerSize } from './utils'

  export let width = 600
  export let height = 400
  export let padding = {}
  export let data = []
  export let groupBy = () => ''
  export let colorRange = schemeAccent
  export let accessor = (d) => d.x
  export let thresholds
  export let style = {}

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }

  let { innerWidth, innerHeight } = getInnerSize({ width, height }, padding)

  let entries

  const _width = writable(width)
  const _height = writable(height)
  const _innerWidth = writable(innerWidth)
  const _innerHeight = writable(innerHeight)
  const __padding = writable(padding)
  const _data = writable(data)
  const _entries = writable([])
  const _keys = writable([])
  const _xscale = writable(linear())
  const _yscale = writable(linear())
  const _colorScale = writable(undefined)

  let context = {
    xAccessor: writable((d) => d.length),
    yAccessor: writable((d) => d.length),
    xScale: _xscale,
    yScale: _yscale,
    entries: _entries,
    histogram: true,
    colorScale: _colorScale,
    width: _width,
    height: _height,
    innerWidth: _innerWidth,
    innerHeight: _innerHeight,
    margin: padding,
    keys: _keys,
    data: _data,
    entries: _entries,
    defaultXScale: linear,
    defaultYScale: linear,
    defaultZScale: linear,
    xScale: _xscale,
    yScale: _yscale,
    xTicks: writable(thresholds),
    yTicks: writable(null)
  }

  function histogramConfiguration(
    node,
    data = [],
    { width, height, padding, keys = $_keys }
  ) {
    let { innerWidth, innerHeight } = getInnerSize({ width, height }, padding)

    let entries = []
    $_xscale.domain(extent(data, accessor))
    $_xscale.range([0, innerWidth])
    $_xscale.ticks(thresholds)
    // $_xscale = $_xscale

    const bins = bin()
      .value(accessor)
      .domain($_xscale.domain())
      .thresholds($_xscale.ticks())

    $_yscale.domain([0, max(bins(data), (d) => d.length)])
    $_yscale.range([innerHeight, 0])
    $_yscale = $_yscale

    if (typeof groupBy === typeof '') {
      $_entries = entries = Array.from(
        group(data, (d) => d[groupBy]).entries()
      ).map(([key, data]) => [key, bins(data)])
    } else {
      $_entries = entries = Array.from(
        group(data, groupBy).entries()
      ).map(([key, data]) => [key, bins(data)])
    }
    $_keys = entries.map((e) => e[0])

    $_width = width = node.offsetWidth
    $_innerWidth = innerWidth = width - padding.left - padding.right
    $_innerHeight = innerHeight = height - padding.top - padding.bottom

    $_colorScale = scaleOrdinal().domain(keys).range(colorRange)

    return {
      update(data) {
        entries = Array.from(group(data, groupBy).entries())
        if (typeof groupBy === typeof '') {
          entries = Array.from(
            group(data, (d) => d[groupBy]).entries()
          ).map(([key, data]) => [key, bins(data)])
        } else {
          entries = Array.from(
            group(data, groupBy).entries()
          ).map(([key, data]) => [key, bins(data)])
        }

        $_keys = entries.map((e) => e[0])
        $_colorScale.domain($_keys)
        $_entries = entries
        $_width = width = node.offsetWidth
        $_innerWidth = innerWidth = width - padding.left - padding.right
        $_innerHeight = innerHeight = height - padding.top - padding.bottom
      }
    }
  }
</script>

<Context value={context}>
  <Grafico
    class="histogram"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {colorRange}
    {style}
    configure={histogramConfiguration}
    let:innerWidth
    let:innerHeight
  >
    <slot name="content" slot="content">
      <XAxis class="x" position="bottom" />
      <YAxis class="y" format="~s" position="right" />
      <Grid />
    </slot>
    <g>
      {#each $_entries as [key, bins]}
        <g>
          {#each bins as bin}
            <slot
              entry={[key, bins]}
              colorScale={$_colorScale}
              xScale={$_xscale}
              yScale={$_yscale}
              {innerHeight}
              {innerWidth}
              {bin}
            >
              <Rect
                x1={bin.x0}
                y1={bin.length}
                x2={bin.x1}
                y2={0}
                fill={$_colorScale(key)}
                let:x
                let:y
                let:width
                let:height
              >
                <rect {x} {y} {width} {height} />
              </Rect>
            </slot>
          {/each}
        </g>
      {/each}
    </g>
  </Grafico>
</Context>

<style>
</style>
