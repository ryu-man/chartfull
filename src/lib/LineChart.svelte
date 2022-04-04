<script>
  import { XAxis, YAxis } from './axis'
  import Line from './components/Line.svelte'
  import Grafico from './Grafico.svelte'

  export let width
  export let height
  export let padding
  export let data = []
  export let style = {}

  export let xAccessor
  export let xDomain
  export let xRange
  export let yAccessor
</script>

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
>
  <YAxis />
  <XAxis />
  <slot>
    <Line {data} />
  </slot>
</Grafico>
