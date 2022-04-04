<script>
  import { XAxis, YAxis } from './axis'
  import { Grid } from './components'
  import Grafico from './Grafico.svelte'
  import Context, { graficoContext } from './Context.svelte'
  import { writable } from 'svelte/store'
  import { scaleBand } from 'd3-scale'

  export let width = 600
  export let height = 400
  export let padding = {}
  export let data = []
  export let style = {}

  const {
    xAccessors = {
      default: (d) => d.x
    },
    yAccessors = {
      default: (d) => d.y
    },
    xScales = {
      default: writable(scaleBand())
    },
    yScales = {
      default: writable(scaleBand())
    },
  } = graficoContext()
</script>

<Context value={{ xAccessors, yAccessors, xScales, yScales }}>
  <Grafico
    class="heat"
    {width}
    {height}
    {padding}
    {data}
    {colorRange}
    {style}
    let:innerWidth
    let:innerHeight
  >
    <slot name="xaxis" slot="xaxis">
      <XAxis />
    </slot>

    <slot name="yaxis" slot="yaxis">
      <YAxis />
    </slot>

    <slot name="grid" slot="grid">
      <!-- <Grid /> -->
    </slot>

    <slot name="legend" slot="legend" />

    <slot name="title" slot="title" />

    <g>
      <slot
        {data}
        {width}
        {height}
        {innerWidth}
        {innerHeight}
        {xScales}
        {xAccessors}
        {yScales}
        {yAccessors}
      />
    </g>
  </Grafico>
</Context>

<style>
</style>
