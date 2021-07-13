<script>
  import { area as Area } from 'd3-shape'
  import { graficoContext } from '../Grafico.svelte'

  const { scales, accessors } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'

  export let x = $accessors[xId]
  export let y0 = 0
  export let y1 = $accessors[yId]

  export let x0
  export let x1
  export let y
  export let curve

  const xScale = $scales[xId]
  const yScale = $scales[yId]

  $accessors[xId] = x
  $accessors[yId] = y1

  const root = Area()
  let area = root

  $: area = root.x((d) => xScale(x(d)))
  $: area = root.y0(y0)
  $: area = root.y1((d) => yScale(y1(d)))

  $: x0 && (area = root.x0(x0))
  $: x1 && (area = root.x1(x1))
  $: y && (area = root.y(y))
  $: curve && (area = root.curve(curve))
</script>

<slot {area} />
