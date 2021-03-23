<script>
  import { XAxis, YAxis } from './axis'
  import { Grid } from './components'
  import Grafico from './grafico.svelte'
  import Context, { graficoContext } from './context.svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let style = {}

  const {} = graficoContext()

  let resizeListener
  const onMount = (node, data) => {
    resizeListener = window.addEventListener('resize', (e) => {
      /* $Width = node.offsetWidth
      $innerWidth = $Width - padding.left - padding.right */
    })
  }
  const onDestroy = () => window.removeEventListener('resize', resizeListener)
</script>

<Context value={{}}>
  <Grafico
    class="bubble"
    {width}
    {height}
    {padding}
    {data}
    {style}
    {onMount}
    {onDestroy}
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

    <g class="data-bubbles">
      <slot
        {data}
        {width}
        {height}
        {innerWidth}
        {innerHeight}
        {padding}
        {xScales}
        {xAccessors}
        {yScales}
        {yAccessors}
        {xAxisId}
        {yAxisId}
      />
    </g>
  </Grafico>
</Context>

<style>
</style>
