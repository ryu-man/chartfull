<script>
  import { pie, arc as d3Arc, schemeCategory10, scaleOrdinal } from 'd3'
  import { writable } from 'svelte/store'
  import Context, { graficoContext } from '../context.svelte'

  const {
    colorScale: _colorScale = writable(),
    width,
    height,
    innerWidth,
    innerHeight,
    data,
    key,
    value,
    // innerArc = writable(),
    radius: _radius = writable(16),
    innerRadius: _innerRadius = writable(0),
    ...rest
  } = graficoContext()
  $_radius = Math.min($width, $height) / 2

  export let radius = $_radius
  export let innerRadius = $_innerRadius
  export let colorRange = schemeCategory10

  radius && ($_radius = radius)
  innerRadius && ($_innerRadius = innerRadius)
  console.log(_radius)
  const context = {
    // arc,
    // innerArc,
    radius: _radius,
    innerRadius,
    colorScale: _colorScale,
    width,
    height,
    key,
    value,
    ...rest
  }

  console.log($_innerRadius, $_radius)
  const arc = d3Arc().innerRadius($_innerRadius).outerRadius($_radius)

  // $innerArc = d3Arc().innerRadius($_radius).outerRadius($_radius)

  $_colorScale = scaleOrdinal().domain($data.map(key)).range(colorRange)
  const pieGen = pie().value(value)
</script>

<Context value={context}>
  <g transform={`translate(${$width / 2},${$height / 2})`}>
    {#each pieGen($data) as arcData, i (key(arcData.data))}
      <slot
        data={arcData}
        key={key(arcData.data)}
        value={value(arcData.data)}
        color={$_colorScale(key(arcData.data))}
        index={i}
      >
        <path
          class="slice"
          d={arc(arcData)}
          fill={$_colorScale(key(arcData.data))}
        />
      </slot>
    {/each}
  </g>
</Context>

<style>
</style>
