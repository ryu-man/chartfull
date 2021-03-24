<script>
  import { writable } from 'svelte/store'
  import { scaleLinear, scaleOrdinal } from 'd3-scale'
  import { schemeCategory10 } from 'd3-scale-chromatic'
  import { XAxis, YAxis } from './axis'
  import { Grid } from './components'
  import Context, { graficoContext } from './Context.svelte'
  import Grafico from './Grafico.svelte'

  export let width = 600
  export let height = 400
  export let padding
  export let data = []
  export let colorScale = scaleOrdinal().range(schemeCategory10)
  export let style = {}

  const {
    xAccessors = {
      default: (d) => d.x
    },
    yAccessors = {
      default: (d) => d.y
    },
    xScales = {
      default: writable(scaleLinear())
    },
    yScales = {
      default: writable(scaleLinear())
    }
  } = graficoContext()
</script>

<Context value={{ xAccessors, yAccessors, xScales, yScales, colorScale }}>
  <Grafico
    class="scatter"
    {width}
    {height}
    {padding}
    {data}
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
      <Grid />
    </slot>

    <slot name="legend" slot="legend" />

    <slot name="title" slot="title" />

    <g>
      <slot
        {data}
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
