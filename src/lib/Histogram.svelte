<script>
  import { XAxis, YAxis } from './axis'
  import { Grid } from './components'
  import Grafico from './Grafico.svelte'

  export let width = 600
  export let height = 400
  export let padding = {}
  export let data = []
  export let style = {}

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }
</script>

<Grafico
  class="histogram"
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
    <XAxis position="bottom" />
  </slot>

  <slot name="yaxis" slot="yaxis">
    <YAxis />
  </slot>

  <slot name="grid" slot="grid">
    <Grid />
  </slot>

  <slot name="legend" slot="legend" />

  <g>
    <slot
      {xScales}
      {yScales}
      {xAccessors}
      {yAccessors}
      {width}
      {height}
      {innerHeight}
      {innerWidth}
      {padding}
      {xAxisId}
      {yAxisId}
      xScale={xScales[xAxisId]}
      yScale={yScales[yAxisId]}
      xAccessor={xAccessors[xAxisId]}
      yAccessor={yAccessors[yAxisId]}
    />
  </g>
</Grafico>

<style>
  g :global(rect) {
    transform: rotateX(180deg);
    transform-origin: center;
  }
</style>
