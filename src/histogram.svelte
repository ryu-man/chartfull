<script>
  import { writable } from 'svelte/store'
  import { scaleOrdinal, scaleLinear } from 'd3-scale'
  import { schemeAccent } from 'd3-scale-chromatic'
  import { bin, extent, max, group } from 'd3-array'
  import { Rect, Grid, XAxis, YAxis } from './components'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'

  export let width = 600
  export let height = 400
  export let padding = {}
  export let data = []
  export let groupBy = () => ''
  export let colorRange = schemeAccent
  export let thresholds
  export let style = {}

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }

  const {
    width: _width = writable(width),
    height: _height = writable(height),
    innerWidth = writable(width - padding.left - padding.right),
    innerHeight = writable(height - padding.top - padding.bottom),
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.length),
    xScale = writable(scaleLinear()),
    yScale = writable(scaleLinear()),
    colorScale = writable(scaleOrdinal()),
    xTicks = writable(thresholds),
    yTicks = writable(),
    bins = writable(bin()),
    entries = writable([]),
    keys = writable([]),
    defaultYDomain = (data, accessor, bins) => [0, max(bins(data), accessor)]
  } = graficoContext()

  const context = {
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    entries,
    bins,
    colorScale,
    width: _width,
    height: _height,
    innerWidth,
    innerHeight,
    keys,
    data: writable(data),
    entries,
    defaultYDomain,
    xTicks,
    yTicks
  }

  function histogramConfiguration(node, data = []) {
    $_width = node.offsetWidth

    return {
      update(data) {
        $_width = width = node.offsetWidth
      }
    }
  }

  $: {
    $xScale.ticks($xTicks)
    $bins.thresholds($xTicks)
  }

  $: $xScale.range([0, $innerWidth])
  $: $yScale.range([$innerHeight, 0])
  $: {
    $xScale.domain(extent(data, $xAccessor))
    $bins.domain($xScale.domain())
    $bins.value($xAccessor)
    $yScale.domain(defaultYDomain(data, (d) => d.length, $bins))

    if (typeof groupBy === 'string') {
      $entries = Array.from(
        group(data, (d) => d[groupBy]).entries()
      ).map(([key, data]) => [key, $bins(data)])
    } else {
      $entries = Array.from(
        group(data, groupBy).entries()
      ).map(([key, data]) => [key, $bins(data)])
    }

    $keys = $entries.map((e) => e[0])

    $colorScale = scaleOrdinal().domain($keys).range(colorRange)
  }
  $: $innerWidth = $_width - padding.left - padding.right
  $: $innerHeight = $_height - padding.top - padding.bottom
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
      {#each $entries as [key, bins], i}
        <g class={key}>
          {#each bins as bin, j}
            <slot
              {key}
              {bins}
              {bin}
              {i}
              {j}
              color={$colorScale(key)}
              xScale={$xScale}
              yScale={$yScale}
              xAccessor={$xAccessor}
              yAccessor={$yAccessor}
              innerHeight={$innerHeight}
              innerWidth={$innerWidth}
            >
              <Rect
                x={$xScale(bin.x0)}
                y={0}
                width={Math.abs($xScale(bin.x1) - $xScale(bin.x0))}
                height={$innerHeight - $yScale(bin.length)}
                let:x
                let:y
                let:width
                let:height
              >
                <rect {x} {y} {width} {height} fill={$colorScale(key)} />
              </Rect>
            </slot>
          {/each}
        </g>
      {/each}
    </g>
  </Grafico>
</Context>

<style>
  g :global(rect) {
    transform: rotateX(180deg);
    transform-origin: center;
  }
</style>
