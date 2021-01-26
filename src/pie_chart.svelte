<script>
  import { setContext, tick } from 'svelte'
  import { scaleOrdinal, pie, arc, schemeAccent } from 'd3'
  import { Slice } from './components'
  import { key } from './context.svelte'
  import { writable } from 'svelte/store'

  // set the dimensions and margins of the graph
  export let width = 300
  export let height = width
  export let margin = 16
  export let data = []
  export let label = (d) => d.label
  export let value = (d) => d.value
  export let radius = width / 2 - margin
  export let innerRadius = 0

  export let style

  // set the color scale
  let colorScale
  // Compute the position of each group on the pie:
  let innerArc
  let outerArc
  let _pie

  const context = writable({
    innerArc,
    outerArc,
    innerRadius,
    radius,
    colorScale,
    width,
    height,
    label,
    value
  })
  const _innerArc = writable(innerArc)
  const _outerArc = writable(outerArc)
  const _innerRadius = writable(innerRadius)
  const _radius = writable(radius)
  const _colorScale = writable(colorScale)
  const _width = writable(width)
  const _height = writable(height)
  const _label = writable(label)
  const _value = writable(value)

  const _context = {
    innerArc: _innerArc,
    outerArc: _outerArc,
    innerRadius: _innerRadius,
    radius: _radius,
    colorScale: _colorScale,
    width: _width,
    height: _height,
    label: _label,
    value: _value
  }
  setContext(key, context)

  function init(node, data) {
    width = node.offsetWidth

    innerArc = arc()
      .innerRadius(innerRadius * 0.8)
      .outerRadius(radius * 0.8)

    outerArc = arc().innerRadius(radius).outerRadius(radius)

    _pie = pie().value(value)

    colorScale = scaleOrdinal().domain(data.map(label)).range(schemeAccent)

    $context.width = width
    $context.innerArc = innerArc
    $context.outerArc = outerArc
    $context.radius = radius
    $context.innerRadius = innerRadius
    $context.label = label
    $context.value = value

    return {
      update(data) {
        _pie = pie().value(value)
        colorScale = scaleOrdinal().domain(data.map(label)).range(schemeAccent)
      }
    }
  }
</script>

<figure
  use:init={data}
  class="pie chartist"
  style={`width:${width}px;height:${height}px;position:relative;display: inline-block;`}>
  <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
    {#await tick() then value}
      <g transform={`translate(${width / 2},${height / 2})`}>
        {#each _pie(data) as arcData, i (label(arcData.data))}
          <slot {arcData} index={i}>
            <path
              class="slice"
              d={innerArc(arcData)}
              fill={colorScale(label(arcData.data))} />
          </slot>
        {/each}
      </g>
    {/await}
  </svg>
  <slot name="title">
    <!-- optional fallback -->
  </slot>
</figure>

<style>
  .chartist {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    position: relative;
  }
  path.arc {
    stroke-linejoin: bevel;
  }
  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  svg :global(*) {
    vector-effect: non-scaling-stroke;
  }
</style>
