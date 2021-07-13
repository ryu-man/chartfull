<script>
  import { curveMonotoneX, line as Line } from 'd3-shape'
  import { graficoContext } from '../Grafico.svelte'

  const { scales, accessors } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'

  export let x = $accessors[xId]
  export let y = $accessors[yId]
  export let curve = curveMonotoneX

  const xScale = $scales[xId]
  const yScale = $scales[yId]

  $accessors[xId] = x
  $accessors[yId] = y

  const line = Line()
    .x((d) => xScale(x(d)))
    .y((d) => yScale(y(d)))
    .curve(curve)
</script>

<slot {line} />
