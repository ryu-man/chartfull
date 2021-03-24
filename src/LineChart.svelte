<script>
  import { XAxis, YAxis } from './axis'
  import { Grid } from './components'
  import Context, { graficoContext } from './Context.svelte'
  import Grafico from './Grafico.svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let style = {}
</script>

<Context value={{}}>
  <Grafico
    {width}
    {height}
    {padding}
    {data}
    {style}
    let:width
    let:height
    let:innerWidth
    let:innerHeight
    let:padding
    let:xAxisId
    let:yAxisId
    let:xScales
    let:yScales
    let:xAccessors
    let:yAccessors
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

    <g class="data-lines">
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
        {padding}
        {xAxisId}
        {yAxisId}
      />
    </g>
  </Grafico>
</Context>
