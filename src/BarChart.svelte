<script>
  import { XAxis, YAxis } from './axis'
  import { Grid } from './components'
  import { scaleBand } from 'd3-scale'
  import Context, { graficoContext } from './Context.svelte'
  import Grafico from './Grafico.svelte'
  import { scaleStore } from './scales'

  export let width
  export let height
  export let padding
  export let data = []
  export let style = {}

  const {
    xScales = {
      default: scaleStore(scaleBand())
    }
  } = graficoContext()
</script>

<Context
  value={{
    xScales
  }}
>
  <Grafico
    class="bar"
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
    let:yScales
    let:xAccessors
    let:yAccessors
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
  </Grafico>
</Context>

<style>
  g :global(rect.hor) {
    transform: rotateX(180deg);
    transform-origin: center;
  }
</style>
