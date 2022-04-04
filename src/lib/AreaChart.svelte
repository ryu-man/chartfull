<script>
  import { writable } from 'svelte/store'
  import { scaleLinear } from 'd3-scale'
  import { XAxis, YAxis } from './axis'
  import Context, { graficoContext } from './Context.svelte'
  import Grafico from './Grafico.svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let groupBy
  export let colorRange

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

  <Grafico
    class="area"
    {width}
    {height}
    {padding}
    {data}
    {groupBy}
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
