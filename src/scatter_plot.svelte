<script>
  import { XAxis, YAxis, Grid, Line, Circle } from './components'
  import Context, { graficoContext } from './context.svelte'
  import Grafico from './grafico.svelte'

  export let width = 600
  export let height = 400
  export let padding
  export let data = []
  export let groupBy = () => ''
  export let radius = 8
  export let connected = false
  export let style = {}

  const {
    xAccessor = writable((d) => d.x),
    yAccessor = writable((d) => d.y),
    xScale = writable(scaleLinear()),
    yScale = writable(scaleLinear())
  } = graficoContext()
</script>

<Context value={{ xAccessor, yAccessor, xScale, yScale }}>
  <Grafico
    class="scatter"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
    {style}
    let:entries
    let:colorScale
  >
    <slot name="xaxis" slot="xaxis">
      <XAxis scale={$xScale} />
    </slot>

    <slot name="yaxis" slot="yaxis">
      <YAxis scale={$yScale} />
    </slot>

    <slot name="grid" slot="grid">
      <Grid />
    </slot>

    <slot name="legend" slot="legend" />

    <slot name="title" slot="title" />

    <g>
      {#each entries as entry}
        <g>
          {#if connected}
            <slot name="line" lineData={entry[1]}>
              <Line data={entry[1]} style={{ stroke: colorScale(entry[0]) }} />
            </slot>
          {/if}
          {#each entry[1] as item, i}
            <slot index={i} color={colorScale(groupBy(entry[0]))}>
              <Circle index={i} duration={i * 96} r={radius} />
            </slot>
          {/each}
        </g>
      {/each}
    </g>
  </Grafico>
</Context>

<style>
</style>
