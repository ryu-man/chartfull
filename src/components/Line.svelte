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

  export let stroke
  export let strokeWidth
  export let strokeOpacity
  export let strokeLinecap
  export let strokeLinejoin
  export let strokeDasharray
  export let strokeDashoffset
  export let strokeMiterlimit
  export let fill = 'transparent'
  export let fillOpacity
  export let fillRule

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

<path
  d={line(data)}
  {fill}
  {stroke}
  stroke-width={strokeWidth}
  stroke-opacity={strokeOpacity}
  stroke-linecap={strokeLinecap}
  stroke-linejoin={strokeLinejoin}
  stroke-dasharray={strokeDasharray}
  stroke-dashoffset={strokeDashoffset}
  stroke-miterlimit={strokeMiterlimit}
  fill-opacity={fillOpacity}
  fill-rule={fillRule}
  on:click
  on:mouseenter
  on:mouseleave
/>
