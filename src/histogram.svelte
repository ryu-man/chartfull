<script>
  import { writable } from 'svelte/store'
  import { scaleOrdinal } from 'd3-scale'
  import { schemeAccent } from 'd3-scale-chromatic'
  import { bin, extent, max, group } from 'd3-array'
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

  let innerSize = getInnerSize({ width, height }, padding)

  const _width = writable(width)
  const _height = writable(height)
  const _innerWidth = writable(innerSize.innerWidth)
  const _innerHeight = writable(innerSize.innerHeight)
  const __padding = writable(padding)
  const _data = writable(data)
  const _entries = writable([])
  const _keys = writable([])
  const _xscale = writable(linear())
  const _yscale = writable(linear())
  const _colorScale = writable(undefined)
  const xTicks = writable(thresholds)
  const yTicks = writable(null)
  const bins = writable(bin())
  const defaultYDomain = (data, accessor, bins) => [
    0,
    max(bins(data), accessor)
  ]

  let context = {
    xAccessor: writable(accessor),
    yAccessor: writable((d) => d.length),
    xScale: _xscale,
    yScale: _yscale,
    entries: _entries,
    bins,
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
    defaultYDomain,
    xTicks,
    yTicks
  }

  function histogramConfiguration(node, data = []) {
    $_width = node.offsetWidth
    let { innerWidth, innerHeight } = getInnerSize({ width, height }, padding)
    $_innerWidth = innerWidth
    $_innerHeight = innerHeight

    $_xscale.domain(extent(data, accessor))
    $_xscale.range([0, $_innerWidth])
    $_xscale.ticks($xTicks)
    // $_xscale = $_xscale

    $bins.value(accessor).domain($_xscale.domain()).thresholds($xTicks)

    $_yscale.domain(defaultYDomain(data, (d) => d.length, $bins))
    $_yscale.range([$_innerHeight, 0])
    $_yscale = $_yscale

    if (typeof groupBy === typeof '') {
      $_entries = Array.from(
        group(data, (d) => d[groupBy]).entries()
      ).map(([key, data]) => [key, $bins(data)])
    } else {
      $_entries = Array.from(
        group(data, groupBy).entries()
      ).map(([key, data]) => [key, $bins(data)])
    }
    $_keys = $_entries.map((e) => e[0])

    $_colorScale = scaleOrdinal().domain($_keys).range(colorRange)

    return {
      update(data) {
        entries = Array.from(group(data, groupBy).entries())
        if (typeof groupBy === typeof '') {
          entries = Array.from(
            group(data, (d) => d[groupBy]).entries()
          ).map(([key, data]) => [key, $bins(data)])
        } else {
          entries = Array.from(
            group(data, groupBy).entries()
          ).map(([key, data]) => [key, $bins(data)])
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
    <slot name="xaxis" slot="xaxis">
      <XAxis position="bottom" />
    </slot>

    <slot name="yaxis" slot="yaxis">
      <YAxis />
    </slot>

    <slot name="grid" slot="grid">
      <Grid />
    </slot>

    <slot name="legend" slot="legend" />
    
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
