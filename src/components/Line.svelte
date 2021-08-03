<script>
  import { line as Line } from 'd3-shape'
  import { graficoContext } from '../Grafico.svelte'

  const { scales, accessors } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'

  export let x = $accessors[xId]
  export let y = $accessors[yId]
  export let curve
  export let defined
  export let context

  const xScale = $scales[xId]
  const yScale = $scales[yId]

  export let data = []

  $accessors[xId] = x
  $accessors[yId] = y

  const root = Line()
  let line = root

  $: line = root.x((d) => xScale(x(d)))
  $: line = root.y((d) => yScale(y(d)))
  $: curve && (line = root.curve(curve))
  $: defined && (line = root.defined(defined))
  $: context && (line = root.context(context))
</script>

<slot {line} d={line(data)}/>
