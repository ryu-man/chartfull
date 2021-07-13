<script>
  import { area as Area, curveMonotoneX } from 'd3-shape'
  import { graficoContext } from '../Grafico.svelte'

  const { scales, accessors } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'

  export let x = $accessors[xId]
  export let y0 = 0
  export let y1 = $accessors[yId]
  export let curve = curveMonotoneX

  const xScale = $scales[xId]
  const yScale = $scales[yId]

  $accessors[xId] = x
  $accessors[yId] = y1

  const area = Area()
    .x((d) => xScale(x(d)))
    .y0(y0)
    .y1((d) => yScale(y1(d)))
    .curve(curve)
</script>

<slot {area} />
