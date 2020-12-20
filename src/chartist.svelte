<script lang="ts">
  import type { ScaleOrdinal } from 'd3'
  import { group, scaleOrdinal, schemePaired } from 'd3'
  import { setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { linear } from './components/scales'

  import { key } from './context.svelte'
  import { css } from './utils'

  export let width: number = 300
  export let height: number = 300
  export let margin = {}
  export let data: any[] = []
  export let groupBy: (d: any) => any = () => ""
  export let colorRange: readonly string[] = schemePaired
  export let style = {}
  let _class = {}
  export { _class as class }

  let _margin = { top: 32, right: 32, bottom: 72, left: 72, ...margin }
  let innerWidth = width - _margin.left - _margin.right
  let innerHeight = height - _margin.top - _margin.bottom

  let colorScale: ScaleOrdinal<string, string>

  let samples: any[] = []

  let keys: string[] = []

  const _context = {}
  const _width = writable(width)
  const _height = writable(height)
  const _innerWidth = writable(innerWidth)
  const _innerHeight = writable(innerHeight)
  const __margin = writable(_margin)
  const _data = writable(data)
  const _keys = writable(keys)
  const _xscale = writable(linear)
  const _yscale = writable(linear)
  const _xaccessor = writable((d) => d.x)
  const _yaccessor = writable((d) => d.y)

  const context = {
    colorScale,
    width: _width,
    height: _height,
    innerWidth: _innerWidth,
    innerHeight: _innerHeight,
    margin: _margin,
    keys,
    data,
    defaultXScale: linear,
    xScale: _xscale,
    defaultYScale: linear,
    yScale: _yscale,
    xAccessor: _xaccessor,
    yAccessor: _yaccessor,
    xTicks: null,
    yTicks: null
  }
  setContext(key, context)

  function init(node: HTMLElement, data: any[]) {
    css(node, style)
    // data = data.sort((a, b) => xAccessor(a) - xAccessor(b))

    samples = Array.from(group(data, groupBy).entries())
    keys = samples.map((e) => e[0])
    console.log(samples)
    width = node.offsetWidth
    innerWidth = width - _margin.left - _margin.right
    innerHeight = height - _margin.top - _margin.bottom

    colorScale = scaleOrdinal<string>().domain(keys).range(colorRange)


    $_width = width
    $_innerWidth = innerWidth
    $_innerHeight = innerHeight
    $_keys = keys
    // $_colorScale = colorScale

    return {
      update(data: any[]) {
        samples = Array.from(group(data, groupBy).entries())
        keys = samples.map((e) => e[0])
        width = node.offsetWidth
        innerWidth = width - _margin.left - _margin.right
        innerHeight = height - _margin.top - _margin.bottom

        $_width = width
        $_innerWidth = innerWidth
        $_innerHeight = innerHeight
        $_keys = keys

        colorScale.domain(keys)
      }
    }
  }
</script>

<figure class="{_class + ' '}chartist" use:init={data}>
  <div
    class="elements"
    style={`padding:${_margin.top}px ${_margin.right}px ${_margin.bottom}px ${_margin.left}px;height:${innerHeight}px;`}>
    {#await tick() then value}
      <slot name="content" />
    {/await}
  </div>
  <svg
    height={innerHeight}
    viewBox="0 0 {innerWidth} {innerHeight}"
    preserveAspectRatio="none"
    style={`padding:${_margin.top}px ${_margin.right}px ${_margin.bottom}px ${_margin.left}px;`}>
    {#await tick() then value}
      <slot {samples} {keys} {colorScale} />
    {/await}
  </svg>
</figure>

<style>
  .chartist {
    width: 100%;
    min-width: 300px;
    height: auto;
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
</style>
