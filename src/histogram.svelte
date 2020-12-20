<script lang="ts">
  import { setContext, tick } from 'svelte'
  import {
    extent,
    scaleLinear,
    histogram,
    max,
    group,
    scaleOrdinal,
    schemeCategory10
  } from 'd3'
  import { css } from './utils'
  import { XAxis, YAxis, Rect, Grid } from './components'
  import type {
    ScaleLinear,
    Bin,
    ScaleOrdinal,
    HistogramGeneratorNumber
  } from 'd3'
  import { key } from './context.svelte'
  import Chartist from './chartist.svelte'
  import Legend from './components/legend.svelte'
  import { writable } from 'svelte/store'

  export let width: number
  export let height: number = 400
  export let margin = {}
  export let data: any[] = []
  export let accessor: (d: any) => number = () => 0
  export let groupBy: (d: any) => any = () => ''
  export let ticks: number[] = [null, null]
  export let domaine: [number, number]
  export let xRange: [number, number]
  export let yRange: [number, number]
  export let colorRange: readonly string[]
  export let style = {}

  let innerWidth: number
  let innerHeight: number
  let _margin = { top: 36, right: 36, bottom: 72, left: 72, ...margin }
  let xScale: ScaleLinear<number, number>
  let yScale: ScaleLinear<number, number>
  let colorScale: ScaleOrdinal<string, unknown>
  let grouped: Map<string, any>
  let keys: string[]
  let histo: HistogramGeneratorNumber<number, number>
  let bins: Array<[string, Bin<number, number>[]]>

  const context = writable({
    accessor,
    colorScale,
    width,
    height,
    innerWidth,
    innerHeight,
    ticks,
    margin: _margin,
    keys,
    data
  })
  setContext(key, context)

  function init(node: HTMLElement, data: Array<any>) {
    css(node, style)
    width = node.offsetWidth

    innerWidth = width - _margin.left - _margin.right
    innerHeight = height - _margin.top - _margin.bottom

    domaine = domaine || extent(data, accessor)
    xRange = xRange || [0, innerWidth]
    xScale = scaleLinear<number, number>(domaine, xRange).nice()
    // set the parameters for the histogram
    xScale.domain()
    histo = histogram()
      .value(accessor) // I need to give the vector of value
      .domain(domaine) // then the domain of the graphic
      .thresholds(xScale.ticks(70))

    // then the numbers of bins
    // And apply this function to data to get the bins
    grouped = group(data, groupBy)
    keys = Array.from(grouped.keys())
    bins = Array.from(grouped.entries()).map((d) => [d[0], histo(d[1])])

    yRange = yRange || [innerHeight, 0]
    yScale = scaleLinear()
      .domain([0, max(bins.map((d) => d[1]).flat(), (d) => d.length)])
      .range(yRange)
      .nice()
    colorScale = scaleOrdinal<string>()
      .domain(Array.from(grouped.keys()))
      .range(colorRange ?? schemeCategory10)

    return {
      update(data: Array<any>) {
        width = node.offsetWidth
        xScale.domain(domaine)
        histo = histo.domain(xScale.domain() as [number, number]) // then the domain of the graphic
        grouped = group(data, groupBy)
        bins = Array.from(grouped.entries()).map((d) => [d[0], histo(d[1])])
        yScale.domain([0, max(bins.map((d) => d[1]).flat(), (d) => d.length)])
        colorScale.domain(Array.from(grouped.keys()))

        xScale = xScale
        yScale = yScale
      }
    }
  }
</script>

<div class="histogram charter" use:init="{data}">
  {#await tick() then value}
    <Chartist>
      {#await tick() then value}
        <g>
          {#each bins as entry}
            {#each entry[1] as bin}
              <slot>
                <Rect
                  x1="{bin.x0}"
                  x2="{bin.x1}"
                  y1="{bin.length}"
                  y2="{0}"
                  style="{{ fill: colorScale(entry[0]) + '' }}"
                />
              </slot>
            {/each}
          {/each}
        </g>
      {/await}
      <div slot="content">
        <Grid />
        <XAxis
          class="x"
          style="{{ width: '100%', top: '100%', padding: '1% 0 0 0' }}"
        />
        <YAxis
          class="y"
          format="~s"
          style="{{ height: '100%', right: '100%', padding: '0 1% 0 0' }}"
        />
      </div>
    </Chartist>
  {/await}
</div>

<style>
  .histogram-container {
    overflow: hidden;
  }
  .charter {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    position: relative;
  }
</style>
