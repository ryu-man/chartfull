<script>
  import { XAxis, YAxis, Grid, Rect } from './components'
  import { scaleBand, scaleLinear } from './scales'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'
  import { writable } from 'svelte/store'
  import { tick } from 'svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let groupBy
  export let colorRange

  export let style = {}

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleBand()),
    yScale = writable(scaleLinear())
  } = graficoContext()
</script>

<Context value={{ xAccessor, yAccessor, xScale, yScale }}>
  <Grafico
    class="bar"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {colorRange}
    {style}
    let:entries
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

    <slot name="title" slot="title" />

    {#await tick() then value}
      {#each entries as [key, data], index}
        <g class={key}>
          {#each data as item}
            <slot
              {key}
              {data}
              {item}
              {innerWidth}
              {innerHeight}
              {index}
              xScale={$xScale}
              xAccessor={$xAccessor}
              yScale={$yScale}
              yAccessor={$yAccessor}
              bandwidth={$xScale?.bandwidth?.() ?? $yScale?.bandwidth?.()}
            >
              <Rect
                x={$xScale($xAccessor(item))}
                y={0}
                width={$xScale($xAccessor(item)) + xScale.bandwidth()}
                height={innerHeight - $yScale($yAccessor(item))}
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
    {/await}
  </Grafico>
</Context>

<style>
  g :global(rect.hor) {
    transform: rotateX(180deg);
    transform-origin: center;
  }
</style>
