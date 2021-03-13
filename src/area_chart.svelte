<script>
  import { writable } from 'svelte/store'
  import { scaleLinear } from 'd3-scale'
  import { Grid, Area, XAxis, YAxis } from './components'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'

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
    xScale = writable(scaleLinear()),
    yScale = writable(scaleLinear())
  } = graficoContext()
</script>

<Context value={{ xScale, xAccessor, yScale, yAccessor }}>
  <Grafico
    class="area"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {colorRange}
    {style}
    let:entries
    let:colorScale
  >
    <slot name="xaxis" slot="xaxis">
      <XAxis scale={$xScale} accessor={$xAccessor} />
    </slot>

    <slot name="yaxis" slot="yaxis">
      <YAxis scale={$xScale} accessor={$xAccessor} />
    </slot>

    <slot name="grid" slot="grid">
      <Grid />
    </slot>

    <slot name="legend" slot="legend" />

    <slot name="title" slot="title" />

    <g>
      {#each entries as [key, data]}
        <slot
          {key}
          {data}
          color={colorScale(key)}
          xScale={$xScale}
          xAccessor={$xAccessor}
          yScale={$yScale}
          yAccessor={$yAccessor}
        >
          <Area {data} let:d>
            <path {d} fill={colorScale(key)} />
          </Area>
        </slot>
      {/each}
    </g>
  </Grafico>
</Context>
