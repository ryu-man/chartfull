<script lang="ts">
  import type { ScaleOrdinal, Arc, DefaultArcObject, Pie } from 'd3'
  import { setContext, tick } from 'svelte'
  import { scaleOrdinal, pie, arc, schemeAccent } from 'd3'
  import { Slice } from './components'
  import { key } from './context.svelte'
  import { writable } from 'svelte/store'

  type PieData = {
    data: { label: string; value: number }
    endAngle: number
    index: number
    padAngle: number
    startAngle: number
    value: number
  }

  // set the dimensions and margins of the graph
  export let width: number = 300
  export let height: number = 300
  export let margin: number = 16
  export let data: any[] = []
  export let label: (d: any) => string = (d) => d.label
  export let value: (d: any) => number = (d) => d.value
  export let radius: number = width / 2 - margin
  export let innerRadius: number = 0

  export let style

  // set the color scale
  let colorScale: ScaleOrdinal<string, string>
  // Compute the position of each group on the pie:
  let innerArc: Arc<any, DefaultArcObject>
  let outerArc: Arc<any, DefaultArcObject>
  let chart: Pie<any, any>

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
  setContext(key, context)

  function init(node: HTMLElement, data: any[]) {
    width = node.offsetWidth

    innerArc = arc()
      .innerRadius(innerRadius * 0.8)
      .outerRadius(radius * 0.8)
    outerArc = arc().innerRadius(radius).outerRadius(radius)

    chart = pie().value(value)
    colorScale = scaleOrdinal<string>()
      .domain(data.map(label))
      .range(schemeAccent)

    $context.width = width
    $context.innerArc = innerArc
    $context.outerArc = outerArc
    $context.radius = radius
    $context.innerRadius = innerRadius
    $context.label = label
    $context.value = value

    return {
      update(data: any[]) {
        chart = pie().value(value)
        colorScale = scaleOrdinal<string>()
          .domain(data.map(label))
          .range(schemeAccent)
      }
    }
  }
</script>

<div
  use:init={data}
  class="charter pie"
  style={`width:100%;height:auto,position:relative;display: inline-block;`}>
  {#await tick() then value}
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <g transform={`translate(${width / 2},${height / 2})`}>
        {#each chart(data) as item, i (label(item.data))}
          <slot {item} index={i}>
            <Slice index={i} {item} color={colorScale} />
          </slot>
        {/each}
      </g>
    </svg>
  {/await}
</div>

<style>
  .charter {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    position: relative;
  }
  .tooltip {
    width: auto;
    height: auto;
    border-radius: 2em;
    padding: 0.6em;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s;
    border-radius: 0.4em;
    background-color: rgba(0, 0, 0, 0.534);
    display: none;
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
